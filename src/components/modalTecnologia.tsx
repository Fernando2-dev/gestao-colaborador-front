"use client"
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Loader, XCircle } from "lucide-react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { InputControl, InputLabel, InputRoot, InputRootInside } from "./input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { areaAtuacaoSchema } from "@/validacao/validacaoAreaAtuacao";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tecnologia } from "@/interface/tecnologia";
import { tecnologiaSchema } from "@/validacao/validacaoTecnologia";
import { projetoRequest } from "@/service/Projeto/projeto";
import { useSession } from "next-auth/react";


interface ITecnologia {
    tecnologia: Tecnologia[]
}

export const ModalTecnologia= ({ tecnologia }: ITecnologia) => {


    type createNewAreaTecnologia = z.infer<typeof tecnologiaSchema>
    const { Sucesso, Error } = useContext(MensagemContext)
    const [tec, setTec] = useState<Tecnologia[]>(tecnologia);
    const session = useSession()


    const { handleSubmit, register, formState, reset, watch } = useForm<createNewAreaTecnologia>({
        resolver: zodResolver(tecnologiaSchema)
    })

    const handleCadstroTecnologia = async (data: createNewAreaTecnologia) => {
        try {
            await projetoRequest.createTecnologia({
                id: 0,
                nome_tecnologia: data.nome_tecnologia
            }, session.data?.user.token)
            Sucesso("Tecnologia cadastrada com sucesso !")
            reset()
        } catch (error) {
            Error("Tecnologia não pode ser cadastrado !")
            console.log(error)
        }
    };


    const handleTecnologiaDelete = async (id: number) => {
        try {
            Sucesso("Tecnologia deletado com sucesso !")
            await projetoRequest.deleteTecnologia(id, session.data?.user.token)
            setTec(state => state.filter(stat => { return stat.id != id }))
        } catch (error) {
            Error("Erro ao Deletar Tecnologia")
            console.log(error)
        }

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-emerald-600  text-white" form="setting">Tecnologia</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Tecnologia</DialogTitle>
                    <DialogDescription>
                        informe o nome da tecnologia para poder ser cadastrada
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleCadstroTecnologia)} className="space-y-5">
                    <InputRoot className="w-full">
                        <InputLabel>
                           Tecnologia
                        </InputLabel>
                        <InputRootInside>
                            <InputControl type="text" {...register("nome_tecnologia")} />
                        </InputRootInside>
                    </InputRoot>

                    {formState.errors.nome_tecnologia && <span className="text-red-500 ml-5 mt-1 text-xs">
                        {formState.errors.nome_tecnologia.message}
                    </span>}

                    <DialogFooter>
                        <button
                            type="submit"
                            className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-emerald-600 text-white"
                            disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? (
                                <Loader type="TailSpin" color="white" height={27} width={27} className="cursor-not-allowed animate-spin" />
                            ) : (
                                "Salvar"
                            )}
                        </button>
                    </DialogFooter>
                </form>
                <table className="w-full border-zinc-100 rounded-lg bg-white">
                    <thead className="bg-violet-200">
                        <tr className="">
                            <th className="text-left py-4 px-5 border-b text-black">Nome</th>
                            <th className="text-left py-4 px-5 border-b text-black">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tec.map((te) => (
                            <tr className="hover:bg-gray-100" key={te.id}>
                                <td className="py-4 px-5 border-b text-black font-semibold">{te.nome_tecnologia}</td>
                                <td className="py-4 px-5 border-b text-black font-semibold">
                                    <XCircle className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleTecnologiaDelete(te.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DialogContent>
        </Dialog>
    )
}