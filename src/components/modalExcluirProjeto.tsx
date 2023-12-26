"use client"
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { XCircle } from "lucide-react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { useRouter } from "next/navigation";
import { Projeto } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";

interface IModal {
    projeto: Projeto;
}

export const ModalExcluirProjeto = ({ projeto }: IModal) => {
    const { Sucesso, Error } = useContext(MensagemContext);
    const router = useRouter();

    const handleDeleteProjeto = async (id: number) => {
        try {
            await projetoRequest.delete(id);
            Sucesso("Projeto deletado com sucesso !");
            router.refresh();
        } catch (error) {
            Error("Projeto não pode ser deletado. pois existe relação com projeto");
            console.log(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <XCircle className="h-6 w-6 text-red-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="font-semibold">Tem certeza que deseja excluir esse Projeto ?</DialogHeader>
                <div className="flex gap-4 justify-end items-center">
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-red-600 text-white"
                            form="setting"
                            onClick={() => handleDeleteProjeto(projeto.id)}
                        >
                            Excluir
                        </button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        </Dialog>
    );
};
