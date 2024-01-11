"use client"
import { Colaborador, ColaboradorAreaAtuacao, ColaboradorAreaAtuacaoDelete } from "@/interface/colaborador";
import { InputControl, InputLabel, InputPrefix, InputRoot, InputRootInside } from "./input";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Loader, Mail, PlusCircle, User } from "lucide-react";
import { z } from "zod";
import { ColaboradorSchema, ColaboradorSchemaUpgrade } from "@/validacao/validacaoColaborador";
import { useContext, useEffect, useState } from "react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import Select, { ActionMeta, MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { Projeto, ProjetoColaborador, ProjetoColaboradorDelete } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";
import { useSession } from "next-auth/react";
import { PerfilContext } from "@/context/ContextPerfilProvider";


interface IModal {
    colaborador: Colaborador;
}

interface IMultiValue {
    value: string;
    label: string | undefined
}


export const ModalEdicaoColaborador = ({ colaborador }: IModal) => {

    type colaboradorSchemaUpgrade = z.infer<typeof ColaboradorSchemaUpgrade>

    const { register, handleSubmit, reset, formState, setValue } = useForm<colaboradorSchemaUpgrade>({
        resolver: zodResolver(ColaboradorSchema),
        defaultValues: {
            nome: "",
            email: "",
            idade: "",
            senha: "",
            role: undefined,
            regime_contratacao: undefined,
        }
    })

    const { Sucesso, Error } = useContext(MensagemContext)
    const { profile } = useContext(PerfilContext)


    const [areaAtuacao, setAreaAtuacao] = useState<AreaAtuacao[]>([])
    const [projeto, setProjeto] = useState<Projeto[]>([])
    const [areaColaborador, setAreaColaborador] = useState<IMultiValue[]>([]);
    const [projetoColaborador, setProjetoColaborador] = useState<IMultiValue[]>([])
    const makeComponent = makeAnimated()
    const session = useSession()


    useEffect(() => {

        const readArea = async () => {
            const resposta = await colaboradorRequest.readArea(session.data?.user.token)
            setAreaAtuacao(resposta)

            const projetoRes = await projetoRequest.read(session.data?.user.token)
            setProjeto(projetoRes)
        }
        readArea()
    }, [session.data?.user.token])


    const novasAreas = areaAtuacao.map(lista => ({ value: lista.id.toString(), label: lista.area_atuacao }));
    const novasProjeto = projeto.map(lista => ({ value: lista.id.toString(), label: lista.nome }));
    const areaSelecionada = colaborador.areasAtuacaoColaborador?.map(lista => ({ value: String(lista.id_area_atuacao?.id), label: lista.id_area_atuacao?.area_atuacao }));
    const projetoSelecionado = colaborador.ColaboradorProjeto?.map(lista => ({ value: String(lista.id_projeto?.id), label: lista.id_projeto?.nome }));

    useEffect(() => {
        setValue("nome", colaborador.nome);
        setValue("email", colaborador.email);
        setValue("idade", colaborador.idade);
        setValue("role", colaborador.role);
        setValue("senha", colaborador.senha || "")
        setValue("regime_contratacao", colaborador.regime_contratacao);
    }, [colaborador, setValue]);

    const router = useRouter()

    const handleSubmitColaborador = async (data: colaboradorSchemaUpgrade) => {
        try {
            const vinculos = colaborador.areasAtuacaoColaborador?.map(vinculo => ({
                colaborador_id: colaborador.id,
                areaAtuacao_id: vinculo.id_area_atuacao?.id || 0,
            })) ?? [];

            const vinculoProjeto = colaborador.ColaboradorProjeto?.map(vinculo => ({
                colaborador_id: colaborador.id,
                projeto_id: vinculo.id_projeto?.id || 0,
            })) ?? [];

            const vinc: ColaboradorAreaAtuacaoDelete = {
                vinculos: vinculos
            }
            const vincprojeto: ProjetoColaboradorDelete = {
                vinculoProjeto: vinculoProjeto
            }
            await colaboradorRequest.deleteColaboradorAreaAtuacao(vinc, session.data?.user.token)
            await projetoRequest.deleteColaboradorProjeto(vincprojeto, session.data?.user.token)

            await colaboradorRequest.update({
                id: colaborador.id,
                nome: data.nome,
                email: data.email,
                idade: data.idade,
                senha: data.senha,
                regime_contratacao: data.regime_contratacao,
                role: data.role,
            }, session.data?.user.token)

            const areasAtuacaoColaborador = areaColaborador.map(area => ({
                colaborador_id: colaborador.id,
                areaAtuacao_id: parseInt(area.value),
            }));

            const colaboradorProjetoData = projetoColaborador.map(projeto => ({
                colaborador_id: colaborador.id,
                projeto_id: parseInt(projeto.value),
            }));

            const area: ColaboradorAreaAtuacao = {
                areasAtuacaoColaborador: areasAtuacaoColaborador
            }

            const projeto: ProjetoColaborador = {
                ColaboradorProjeto: colaboradorProjetoData
            }

            await colaboradorRequest.createColaboradorAreaAtuacao(area, session.data?.user.token)
            await projetoRequest.createProjetoColaborador(projeto, session.data?.user.token)

            router.refresh()
            Sucesso("Colaborador editado com sucesso !")
        } catch (error) {
            Error("Erro ao editar colaborador")
            console.log(error)
        }
    }
    return (
        <Drawer>
            <DrawerTrigger disabled={profile?.user.role === "MEMBRO"}>
                <PlusCircle className={`h-6 w-6 cursor-pointer ${profile?.user.role === "GESTOR" ? "" : "hover:cursor-not-allowed"}`} />
            </DrawerTrigger>
            <DrawerContent>
                <form className="flex flex-col space-y-5 m-16" onSubmit={handleSubmit(handleSubmitColaborador)}>
                    <div className="flex">
                        <InputRoot>
                            <InputLabel>Nome</InputLabel>
                            <InputRootInside>
                                <InputPrefix>
                                    <User className="h-6 w-6" />
                                </InputPrefix>
                                <InputControl
                                    type="text"
                                    {...register("nome")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.nome &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.nome.message}
                            </span>
                        }

                        <InputRoot>
                            <InputLabel>Email</InputLabel>
                            <InputRootInside>
                                <InputPrefix>
                                    <Mail className="h-6 w-6" />
                                </InputPrefix>
                                <InputControl
                                    type="text"
                                    {...register("email")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.email &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.email.message}
                            </span>
                        }
                    </div>
                    <div className="">
                        <div className="flex justify-between p-3">
                            <InputRoot>
                                <InputLabel className="text-sm font-medium text-zinc-700">Área Atuação</InputLabel>
                                <Select
                                    isMulti
                                    defaultValue={areaSelecionada}
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
                                    defaultValue={projetoSelecionado}
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
                    <div className="flex">
                        <InputRoot>
                            <InputLabel>Idade</InputLabel>
                            <InputRootInside>
                                <InputControl
                                    type="text"
                                    {...register("idade")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.idade &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.idade.message}
                            </span>
                        }

                        <InputRoot>
                            <InputLabel>Regime Contratação</InputLabel>
                            <InputRootInside>
                                <select
                                    className="flex w-full items-center gap-2 rounded-lg outline-none"
                                    {...register("regime_contratacao")}>
                                    <option value="CLT">CLT</option>
                                    <option value="PJ">PJ</option>
                                </select>
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.role &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.role.message}
                            </span>
                        }

                        <InputRoot>
                            <InputLabel>Role</InputLabel>
                            <InputRootInside>
                                <select
                                    className="flex w-full items-center gap-2 outline-none"
                                    {...register("role")}>
                                    <option value="MEMBRO">MEMBRO</option>
                                    <option value="GESTOR">GESTOR</option>
                                </select>
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.regime_contratacao &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.regime_contratacao.message}
                            </span>
                        }
                    </div>



                    <div className="flex justify-center items-center pb-1">
                        <DrawerTrigger>
                            <button
                                type="submit"
                                className={`text-black font-bold ${formState.isSubmitting
                                    ? "cursor-not-allowed bg-cyan-950 text-white"
                                    : "bg-cyan-950 cursor-pointer text-white"
                                    } w-[100px] rounded-md h-10 flex justify-center items-center`}
                                disabled={formState.isSubmitting}
                            >
                                {formState.isSubmitting ? (
                                    <Loader type="TailSpin" color="white" height={27} width={27} className="cursor-not-allowed " />
                                ) : (
                                    "Salvar"
                                )}
                            </button>
                        </DrawerTrigger>
                    </div>
                </form>
            </DrawerContent>
        </Drawer>
    )
}










