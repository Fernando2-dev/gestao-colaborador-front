"use client"
import { Colaborador } from "@/interface/colaborador";
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
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Projeto } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";


interface IModal {
    colaborador: Colaborador;
    index: number
}

interface IMultiValue {
    value: string
    label: string
}

export const ModalEdicaoColaborador = ({ colaborador }: IModal) => {

    type colaboradorSchemaUpgrade = z.infer<typeof ColaboradorSchemaUpgrade>

    const { register, handleSubmit, reset, formState, setValue } = useForm<colaboradorSchemaUpgrade>({
        resolver: zodResolver(ColaboradorSchema),
        defaultValues: {
            nome: "",
            email: "",
            idade: "",
            role: undefined,
            regime_contratacao: undefined,
        }
    })

    const { Sucesso, Error } = useContext(MensagemContext)


    const [areaAtuacao, setAreaAtuacao] = useState<AreaAtuacao[]>([])
    const [projeto, setProjeto] = useState<Projeto[]>([])
    const [areaColaborador, setAreaColaborador] = useState<IMultiValue[]>([]);
    const [projetoColaborador, setProjetoColaborador] = useState<IMultiValue[]>([])
    const makeComponent = makeAnimated()

    useEffect(() => {

        const readArea = async () => {
            const resposta = await colaboradorRequest.readArea()
            setAreaAtuacao(resposta)

            const projetoRes = await projetoRequest.read()
            setProjeto(projetoRes)
        }
        readArea()
    }, [])


    const novasAreas = areaAtuacao.map(lista => ({ value: lista.id.toString(), label: lista.area_atuacao }));
    const novasProjeto = projeto.map(lista => ({ value: lista.id.toString(), label: lista.nome }));
    const areaSelecionada = colaborador.areasAtuacaoColaborador?.map(lista => ({ value: String(lista.id_area_atuacao?.id), label: lista.id_area_atuacao?.area_atuacao }));
    const projetoSelecionada = colaborador.ColaboradorProjeto?.map(lista => ({ value: String(lista.id_projeto?.id), label: lista.id_projeto?.nome }));

    useEffect(() => {
        setValue("nome", colaborador.nome);
        setValue("email", colaborador.email);
        setValue("idade", colaborador.idade);
        setValue("role", colaborador.role);
        setValue("regime_contratacao", colaborador.regime_contratacao);
    }, [colaborador, setValue]);

    const router = useRouter()
    const handleSubmitColaborador = async (data: colaboradorSchemaUpgrade) => {
        try {
            await colaboradorRequest.upgrade({
                id: colaborador.id ,
                nome: data.nome,
                email: data.email,
                idade: data.idade,
                regime_contratacao: data.regime_contratacao,
                role: data.role,
                areasAtuacaoColaborador: areaColaborador.map((area) => ({
                    colaborador_id: colaborador.id,
                    areaAtuacao_id: Number(area.value),
                })),
                ColaboradorProjeto: projetoColaborador.map((pro) => ({
                    colaborador_id: colaborador.id,
                    projeto_id: Number(pro.value),
                }))
            })
            router.push("/colaborador");
            Sucesso("Colaborador editado com sucesso !")
            reset()
        } catch (error) {
            Error("Erro ao editar colaborador")
            console.log(error)
        }
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <PlusCircle className="h-6 w-6 cursor-pointer" />
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
                    {/* <div className="flex">
                        <InputRoot>
                            <InputLabel>Área Atuação</InputLabel>
                            <Select
                                isMulti
                                onChange={(item) => setAreaColaborador([...item])}
                                defaultValue={areaSelecionada}
                                options={novasAreas}
                                className="w-full border-white"
                                components={makeComponent}

                            />
                        </InputRoot>
                        <InputRoot>
                            <InputLabel>Projeto</InputLabel>
                            <Select
                                isMulti
                                defaultValue={projetoSelecionada}
                                onChange={(item) => setProjetoColaborador([...item])}
                                options={novasProjeto}
                                components={makeComponent}
                                className="w-full border-white"
                            />
                        </InputRoot>
                    </div> */}
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
                            <InputLabel>Role</InputLabel>
                            <InputRootInside>
                                <InputControl
                                    type="text"
                                    {...register("role")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.role &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.role.message}
                            </span>
                        }

                        <InputRoot>
                            <InputLabel>Regime Contratação</InputLabel>
                            <InputRootInside>
                                <InputControl
                                    type="text"
                                    {...register("regime_contratacao")}
                                />
                            </InputRootInside>
                        </InputRoot>

                        {formState.errors.regime_contratacao &&
                            <span className="text-red-500 ml-5 mt-1 text-xs">
                                {formState.errors.regime_contratacao.message}
                            </span>
                        }
                    </div>


                    <div className="flex justify-center items-center pb-1">
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
                    </div>
                </form>
            </DrawerContent>
        </Drawer>
    )
}










