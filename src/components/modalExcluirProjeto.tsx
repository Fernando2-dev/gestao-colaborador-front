"use client"
import { useContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { XCircle } from "lucide-react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { useRouter } from "next/navigation";
import { Projeto } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";
import { useSession } from "next-auth/react";
import { PerfilContext } from "@/context/ContextPerfilProvider";

interface IModal {
    projeto: Projeto;
}

export const ModalExcluirProjeto = ({ projeto }: IModal) => {
    const { Sucesso, Error, Aviso } = useContext(MensagemContext);
    const { profile } = useContext(PerfilContext);
    const router = useRouter();
    const session = useSession()

    const handleDeleteProjeto = async (id: number) => {
        try {
            if ((projeto.ColaboradorProjeto?.length ?? 0) > 0 || (projeto.projetoTecnologias?.length ?? 0) > 0) {
                return Aviso("Projeto não pode ser deletado. Existe relações com colaborador ou tecnologia");
            }
            await projetoRequest.delete(id, session.data?.user.token);
            Sucesso("Projeto deletado com sucesso !");
            router.refresh();
        } catch (error) {
            Error("Projeto não pode ser deletado. pois existe relação com projeto");
            console.log(error);
        }
    };

    return (
        <Dialog>
            {profile.user?.role === "GESTOR" ? (
                <DialogTrigger asChild>
                    <XCircle className="h-6 w-6 text-red-500 cursor-pointer" />
                </DialogTrigger>
            ) : null}

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
