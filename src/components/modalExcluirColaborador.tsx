"use client"
import { useContext } from "react";
import { Colaborador } from "@/interface/colaborador";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { XCircle } from "lucide-react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { useRouter } from "next/navigation";

interface IModal {
    colaborador: Colaborador;
    index: number
}

export const ModalExcluirColaborador = ({ colaborador }: IModal) => {


    const { Sucesso, Error } = useContext(MensagemContext)
    const router = useRouter()

    const handleDeleteClient = async (id: number) => {
        try {
            await colaboradorRequest.delete(id)
            Sucesso("Colaborador deletado com sucesso !")
            router.push("/colaborador")
        } catch (error) {
            Error("Colaborador não pode ser deletado. pois existe relação com projeto")
            console.log(error)
        }

    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <XCircle className="h-6 w-6 text-red-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="font-semibold">Tem certeza que deseja excluir esse colaborador ?</DialogHeader>
                <div className="flex gap-4 justify-end items-center">
                    <button
                        type="button"
                        className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-red-600 text-white" form="setting"
                        onClick={() => handleDeleteClient(colaborador.id)}
                    >
                        Excluir
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}