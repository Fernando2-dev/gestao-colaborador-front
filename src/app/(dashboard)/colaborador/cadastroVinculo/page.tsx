"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { Loader, } from "lucide-react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { InputRoot, InputLabel } from "@/components/input";
import Link from "next/link";
import { Projeto, ProjetoColaborador } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";
import Select, { ActionMeta, MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { Colaborador, ColaboradorAreaAtuacao } from "@/interface/colaborador";
import { useSession } from "next-auth/react";

interface IMultiValue {
    value: string
    label: string
}

const CadastroVinculo = () => {

    const router = useRouter();
    const { Sucesso, Error } = useContext(MensagemContext)

    const [areaAtuacao, setAreaAtuacao] = useState<AreaAtuacao[]>([])
    const [projeto, setProjeto] = useState<Projeto[]>([])
    const [areaColaborador, setAreaColaborador] = useState<IMultiValue[]>([]);
    const [projetoColaborador, setProjetoColaborador] = useState<IMultiValue[]>([])


    const [isSubmitting, setIsSubmitting] = useState(false)
    const [colaborador, setColaborador] = useState<Colaborador[]>([])
    const [colaboradorValue, setColaboradorValue] = useState("")
    const session = useSession()

    useEffect(() => {

        const readArea = async () => {
            const colaborador = await colaboradorRequest.read(session.data?.user.token)
            setColaborador(colaborador)

            const resposta = await colaboradorRequest.readArea(session.data?.user.token)
            setAreaAtuacao(resposta)

            const projetoRes = await projetoRequest.read(session.data?.user.token)
            setProjeto(projetoRes)
        }
        readArea()
    }, [session])

    const novasAreas = areaAtuacao.map(lista => ({ value: lista.id.toString(), label: lista.area_atuacao }));
    const novasProjeto = projeto.map(lista => ({ value: lista.id.toString(), label: lista.nome }));
    const makeComponent = makeAnimated()


    const handleCreateColaborador = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        try {
            const areasAtuacaoColaborador = areaColaborador.map(area => ({
                areaAtuacao_id: parseInt(area.value),
                colaborador_id: parseInt(colaboradorValue),
            }));

            const ColaboradorProjeto = projetoColaborador.map(projeto => ({
                colaborador_id: parseInt(colaboradorValue),
                projeto_id: parseInt(projeto.value),
            }));

            const area: ColaboradorAreaAtuacao = {
                areasAtuacaoColaborador: areasAtuacaoColaborador
            }
            const projeto: ProjetoColaborador = {
                ColaboradorProjeto: ColaboradorProjeto
            }
            
            await colaboradorRequest.createColaboradorAreaAtuacao(area, session.data?.user.token)
            await projetoRequest.createProjetoColaborador(projeto, session.data?.user.token)

            Sucesso("Vinculo do colaborador cadastrado com sucesso");
            router.push("/colaborador");
            router.refresh();
            setIsSubmitting(false)
        } catch (error) {
            Error("Erro ao vincular");
            console.log(error);
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold">Cadastrar o Vinculo do Colaborador</h2>
            <form className="mt-6 flex flex-col w-full gap-5 divide-y divide-zinc-300" onSubmit={(event: FormEvent<HTMLFormElement>) => handleCreateColaborador(event)}>
                <div className="grid gap-3 grid-cols-form pt-5">
                    <label className="text-sm font-medium text-zinc-700">
                        Colaborador
                    </label>
                    <div className="grid gap-6 grid-cols-1">
                        <select
                            className="flex w-full items-center gap-2 rounded-lg border border-lg-zinc-300 px-3 py-3 shadow-sm outline-none"
                            defaultValue=""
                            onChange={(event) => setColaboradorValue(event.target.value)}
                        >
                            <option value="" disabled>
                                Selecione um colaborador para cadastrar os vinculos
                            </option>
                            {colaborador.map(user => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}

                        </select>
                    </div>
                </div>
                <div className="">
                    <div className="flex justify-between p-3">
                        <InputRoot>
                            <InputLabel className="text-sm font-medium text-zinc-700">Área Atuação</InputLabel>
                            <Select
                                isMulti
                                onChange={(newValue: MultiValue<IMultiValue>, actionMeta: ActionMeta<IMultiValue>) => {
                                    if (newValue) {
                                        setAreaColaborador(newValue.map(item => ({ value: item.value, label: item.label })));
                                    } else {
                                        setAreaColaborador([]);
                                    }
                                }}
                                options={novasAreas}
                                className="w-full border-white"
                                components={makeComponent}
                            />
                        </InputRoot>
                        <InputRoot>
                            <InputLabel className="text-sm font-medium text-zinc-700">Projeto</InputLabel>
                            <Select
                                isMulti
                                onChange={(newValue: MultiValue<IMultiValue>, actionMeta: ActionMeta<IMultiValue>) => {
                                    if (newValue) {
                                        setProjetoColaborador(newValue.map(item => ({ value: item.value, label: item.label })));
                                    } else {
                                        setProjetoColaborador([]);
                                    }
                                }}
                                options={novasProjeto}
                                components={makeComponent}
                                className="w-full border-white"
                            />
                        </InputRoot>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Link href="/colaborador">
                        <button
                            type="button"
                            className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                            voltar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader type="TailSpin" color="white" height={27} width={27} className="cursor-not-allowed animate-spin" />
                        ) : (
                            "Salvar"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default CadastroVinculo