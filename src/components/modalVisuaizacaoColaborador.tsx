"use client"
import { useContext, useEffect, useState, } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { ColaboradorSchema } from "@/validacao/validacaoColaborador";
import { Colaborador } from "@/interface/colaborador";
import { InputControl, InputLabel, InputPrefix, InputRoot, InputRootInside } from "./input";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Eye, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { PerfilContext } from "@/context/ContextPerfilProvider";

interface IModal {
    colaborador: Colaborador;
}

export const ModalVisualizacaoColaborador = ({ colaborador }: IModal) => {
    type Colaborador = z.infer<typeof ColaboradorSchema>
    const { register, setValue } = useForm<Colaborador>({
        resolver: zodResolver(ColaboradorSchema),
        defaultValues: {
            nome: "",
            email: "",
            idade: "",
            regime_contratacao: undefined,
            role: undefined

        }
    })
    useEffect(() => {
        setValue("nome", colaborador.nome);
        setValue("email", colaborador.email);
        setValue("idade", colaborador.idade);
        setValue("role", colaborador.role);
        setValue("regime_contratacao", colaborador.regime_contratacao);
    }, [colaborador, setValue]);
   const { profile } = useContext(PerfilContext)
    

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
                            <InputLabel>Email</InputLabel>
                            <InputRootInside>
                                <InputPrefix>
                                    <Mail className="h-6 w-6" />
                                </InputPrefix>
                                <InputControl
                                    type="text"
                                    {...register("email")}
                                    disabled
                                />
                            </InputRootInside>
                        </InputRoot>

                    </div>
                    <div className="flex">
                        <InputRoot>
                            <InputLabel>Idade</InputLabel>
                            <InputRootInside>
                                <InputControl
                                    type="text"
                                    {...register("idade")}
                                    disabled
                                />
                            </InputRootInside>
                        </InputRoot>

                        <InputRoot>
                            <InputLabel>Role</InputLabel>
                            <InputRootInside>
                                <InputControl
                                    type="text"
                                    {...register("role")}
                                    disabled
                                />
                            </InputRootInside>
                        </InputRoot>

                        <InputRoot>
                            <InputLabel>Regime Contratação</InputLabel>
                            <InputRootInside>
                                {profile.user?.role === "GESTOR" ? (<InputControl
                                    type="text"
                                    {...register("regime_contratacao")}
                                    disabled
                                />) : (<InputControl
                                    type="text"
                                    placeholder="..."
                                    disabled
                                />)}

                            </InputRootInside>
                        </InputRoot>
                    </div>
                    <div className="flex justify-around items-center">
                        <h2 className="font-semibold text-lg">Áreas de Atuação</h2>
                        <h2 className="font-semibold text-lg">Projetos</h2>
                    </div>
                    <div className="grid grid-cols-2">

                        <div className="flex gap-3 flex-wrap">
                            {colaborador.areasAtuacaoColaborador?.map(area => (
                                <div key={area.id_area_atuacao?.id}>
                                    <div className="p-3 border border-emerald-300 rounded-lg w-full flex justify-center items-center hover:bg-emerald-500 hover:text-white font-bold" >{area.id_area_atuacao?.area_atuacao}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            {colaborador.ColaboradorProjeto?.map(area => (
                                <div key={area.id_projeto?.id}>
                                    <div className="p-3 border border-emerald-300 rounded-lg w-full flex justify-center items-center hover:bg-emerald-500 hover:text-white font-bold">
                                        {area.id_projeto?.nome}
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