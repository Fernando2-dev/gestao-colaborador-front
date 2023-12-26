"use client"
import { useEffect, } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { ColaboradorSchema } from "@/validacao/validacaoColaborador";
import { InputControl, InputLabel, InputPrefix, InputRoot, InputRootInside } from "./input";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Eye, Mail, User } from "lucide-react";
import { Projeto } from "@/interface/projeto";
import { ProjetoSchema } from "@/validacao/validacaoProjeto";

interface IModal {
    projeto: Projeto;
    index: number
}

export const ModalVisualizacaoProjeto = ({ projeto }: IModal) => {
    type Projetos = z.infer<typeof ProjetoSchema>
    const { register, setValue } = useForm<Projetos>({
        resolver: zodResolver(ColaboradorSchema),
        defaultValues: {
            nome: "",
            prazo: "",
            descricao: "",
            ColaboradorProjeto: [],
            projetoTecnologias: []
        }
    })
    useEffect(() => {
        setValue("nome", projeto.nome);
        setValue("prazo", projeto.prazo);
        setValue("descricao", projeto.descricao);
    }, [projeto, setValue]);


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Eye className="h-6 w-6 cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
                <div className="flex flex-col space-y-5 m-16">
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
                                    disabled
                                />
                            </InputRootInside>
                        </InputRoot>

                        <InputRoot>
                            <InputLabel>Prazo</InputLabel>
                            <InputRootInside>
                                <InputPrefix>
                                    <Mail className="h-6 w-6" />
                                </InputPrefix>
                                <InputControl
                                    type="text"
                                    {...register("prazo")}
                                    disabled
                                />
                            </InputRootInside>
                        </InputRoot>

                    </div>
                    <div className="flex">
                        <InputRoot>
                            <InputLabel>Descrição</InputLabel>
                            <InputRootInside>
                                <textarea
                                    className="w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    {...register("descricao")}
                                    disabled
                                />
                            </InputRootInside>
                        </InputRoot>
                    </div>
                    <div className="flex justify-around items-center">
                        <h2 className="font-semibold text-lg">Tecnologia</h2>
                        <h2 className="font-semibold text-lg">Colaborador</h2>
                    </div>
                    <div className="grid grid-cols-2">

                        <div className="flex gap-3 flex-wrap">
                            {projeto.projetoTecnologias?.map(tec => (
                                <div key={tec.tecnologia_id}>
                                    <div className="p-3 border border-emerald-300 rounded-lg w-full flex justify-center items-center hover:bg-emerald-500 hover:text-white font-bold" >{tec.id_tecnologia?.nome_tecnologia}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            {projeto.ColaboradorProjeto?.map(colaborador => (
                                <div key={colaborador.colaborador_id}>
                                    <div className="p-3 border border-emerald-300 rounded-lg w-full flex justify-center items-center hover:bg-emerald-500 hover:text-white font-bold">
                                        {colaborador.id_colaborador?.nome}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}