"use client"
import { useContext, useEffect, useState } from "react";
import { Colaborador } from "@/interface/colaborador";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { XCircle } from "lucide-react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PerfilContext } from "@/context/ContextPerfilProvider";

interface IModal {
    colaborador: Colaborador;
}

export const ModalExcluirColaborador = ({ colaborador }: IModal) => {


    const { Sucesso, Error, Aviso } = useContext(MensagemContext)
    const { profile } = useContext(PerfilContext)
    const router = useRouter()

    const session = useSession()

    const handleDeleteClient = async (id: number) => {
        try {
            if ((colaborador.ColaboradorProjeto?.length ?? 0) > 0 || (colaborador.areasAtuacaoColaborador?.length ?? 0) > 0) {
                return Aviso("Colaborador não pode ser deletado. Existe relações com projeto ou área de atuação");
            }

            await colaboradorRequest.delete(id, session.data?.user.token);
            Sucesso("Colaborador deletado com sucesso !");
            router.refresh();
        } catch (error) {
            Error("Erro ao deletar colaborador");
            console.log(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger disabled={profile.user?.role === "GESTOR" ? false : true}>
                <XCircle className={`h-6 w-6 text-red-500 cursor-pointer ${profile.user?.role === "GESTOR" ? "" : "hover:cursor-not-allowed"}`}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="font-semibold">Tem certeza que deseja excluir esse colaborador ?</DialogHeader>
                <div className="flex gap-4 justify-end items-center">
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-black text-white" form="setting"
                        >
                            Não
                        </button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-red-600 text-white" form="setting"
                            onClick={() => handleDeleteClient(colaborador.id)}
                        >
                            Sim
                        </button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        </Dialog>
    )
}