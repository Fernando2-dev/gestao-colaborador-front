"use client"
import { Colaborador } from "@/interface/colaborador";
import { InputControl, InputLabel, InputPrefix, InputRoot, InputRootInside } from "./input";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Loader, Mail, PlusCircle, User } from "lucide-react";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import Select, { ActionMeta, MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { Projeto, ProjetoColaborador, ProjetoColaboradorDelete, ProjetoTecnologia, ProjetoTecnologiaDelete } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";
import { ProjetoSchema, ProjetoSchemaUpdate } from "@/validacao/validacaoProjeto";
import { Tecnologia } from "@/interface/tecnologia";
import { useSession } from "next-auth/react";


interface IModal {
    projeto: Projeto;
}

interface IMultiValue {
    value: string
    label: string
}

export const ModalEdicaoProjeto = ({ projeto }: IModal) => {

    type projetoSchemaUpdate = z.infer<typeof ProjetoSchemaUpdate>

    const { register, handleSubmit, reset, formState, setValue } = useForm<projetoSchemaUpdate>({
        resolver: zodResolver(ProjetoSchema),
        defaultValues: {
            nome: "",
            prazo: "",
            descricao: "",
            ColaboradorProjeto: [],
            projetoTecnologias: [],
        }
    })

    const { Sucesso, Error } = useContext(MensagemContext)

    const [tecnologia, setTecnologia] = useState<Tecnologia[]>([])
    const [colaborador, setColaborador] = useState<Colaborador[]>([])
    const [tecnologiaProjeto, setTecnologiaProjeto] = useState<IMultiValue[]>([]);
    const [colaboradorProjeto, setColaboradorProjeto] = useState<IMultiValue[]>([])
    const makeComponent = makeAnimated()
    const session = useSession()

    useEffect(() => {

        const readArea = async () => {
            const resposta = await colaboradorRequest.read(session.data?.user.token)
            setColaborador(resposta)

            const projetoRes = await projetoRequest.readTecnologia(session.data?.user.token)
            setTecnologia(projetoRes)
        }
        readArea()
    }, [session])


    const novasTecnologias = tecnologia.map(lista => ({ value: lista.id.toString(), label: lista.nome_tecnologia }));
    const novosColaboradores = colaborador.map(lista => ({ value: lista.id.toString(), label: lista.nome }));
    const tecnologiaSelecionada = projeto.projetoTecnologias?.map(lista => ({ value: String(lista.tecnologia_id), label: lista.id_tecnologia.nome_tecnologia }));
    const colaboradorSelecionado = projeto.ColaboradorProjeto?.map(lista => ({ value: String(lista.colaborador_id), label: lista.id_colaborador.nome }));

    useEffect(() => {
        setValue("nome", projeto.nome);
        setValue("prazo", projeto.prazo);
        setValue("descricao", projeto.descricao);
    }, [projeto, setValue]);

    const router = useRouter()
    const handleSubmitProjeto = async (data: projetoSchemaUpdate) => {
        try {
            const vinculoTecnologia = projeto.projetoTecnologias?.map(vinculo => ({
                projeto_id: projeto.id,
                tecnologia_id: vinculo.id_tecnologia.id,
            })) ?? [];

            const vinculoProjeto = projeto.ColaboradorProjeto?.map(vinculo => ({
                projeto_id: projeto.id,
                colaborador_id: vinculo.id_colaborador.id,
            })) ?? [];


            const vinc: ProjetoTecnologiaDelete = {
                vinculoTecnologia: vinculoTecnologia
            }
            const vincColaborador: ProjetoColaboradorDelete = {
                vinculoProjeto: vinculoProjeto
            }

            await projetoRequest.deleteTecnologiaProjeto(vinc, session.data?.user.token)
            await projetoRequest.deleteColaboradorProjeto(vincColaborador, session.data?.user.token)

            await projetoRequest.update({
                id: projeto.id,
                nome: data.nome,
                prazo: data.prazo,
                descricao: data.descricao,
            }, session.data?.user.token);

            const projetoTecnologia = tecnologiaProjeto.map(area => ({
                projeto_id: projeto.id,
                tecnologia_id: parseInt(area.value),
            }));

            const ColaboradorProjeto = colaboradorProjeto.map(colaborador => ({
                colaborador_id: parseInt(colaborador.value),
                projeto_id: projeto.id,
            }));

            const tecno: ProjetoTecnologia = {
                projetoTecnologia: projetoTecnologia
            }

            const colaborador: ProjetoColaborador = {
                ColaboradorProjeto: ColaboradorProjeto
            }

            await projetoRequest.createProjetoTecnologia(tecno, session.data?.user.token)
            await projetoRequest.createProjetoColaborador(colaborador, session.data?.user.token)
            router.refresh();
            Sucesso("Projeto editado com sucesso !")
            reset()
        } catch (error) {
            Error("Erro ao editar projeto")
            console.log(error)
        }
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <PlusCircle className="h-6 w-6 cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
                <form className="flex flex-col space-y-5 m-16" onSubmit={handleSubmit(handleSubmitProjeto)}>
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
                            <InputLabel>Prazo</InputLabel>
                            <InputRootInside>
                                <InputPrefix>
                                    <Mail className="h-6 w-6" />
                                </InputPrefix>
                                <InputControl
                                    type="date"
                                    {...register("prazo")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.prazo &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.prazo.message}
                            </span>
                        }
                    </div>
                    <div className="flex">
                        <InputRoot>
                            <InputLabel>Descrição</InputLabel>
                            <InputRootInside>
                                <textarea
                                    className="w-full disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none"
                                    {...register("descricao")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.nome &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.nome.message}
                            </span>
                        }
                    </div>

                    <div className="">
                        <div className="flex justify-between p-3">
                            <InputRoot>
                                <InputLabel className="text-sm font-medium text-zinc-700">Colaborador</InputLabel>
                                <Select
                                    isMulti
                                    defaultValue={colaboradorSelecionado}
                                    onChange={(newValue: MultiValue<IMultiValue>, actionMeta: ActionMeta<IMultiValue>) => {
                                        if (newValue) {
                                            setColaboradorProjeto(newValue.map(item => ({ value: item.value, label: item.label })));
                                        } else {
                                            setColaboradorProjeto([]);
                                        }
                                    }}
                                    options={novosColaboradores}
                                    className="w-full border-white"
                                    components={makeComponent}
                                />
                            </InputRoot>
                            <InputRoot>
                                <InputLabel className="text-sm font-medium text-zinc-700">Tecnologia</InputLabel>
                                <Select
                                    isMulti
                                    defaultValue={tecnologiaSelecionada}
                                    onChange={(newValue: MultiValue<IMultiValue>, actionMeta: ActionMeta<IMultiValue>) => {
                                        if (newValue) {
                                            setTecnologiaProjeto(newValue.map(item => ({ value: item.value, label: item.label })));
                                        } else {
                                            setTecnologiaProjeto([]);
                                        }
                                    }}
                                    options={novasTecnologias}
                                    components={makeComponent}
                                    className="w-full border-white"
                                />
                            </InputRoot>
                        </div>
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










