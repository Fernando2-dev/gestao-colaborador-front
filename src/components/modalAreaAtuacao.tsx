"use client"
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Loader, XCircle } from "lucide-react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { InputControl, InputLabel, InputRoot, InputRootInside } from "./input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { areaAtuacaoSchema } from "@/validacao/validacaoAreaAtuacao";
import { zodResolver } from "@hookform/resolvers/zod";


interface IAreaAtuacao {
    areaAtuacao: AreaAtuacao[]
}

export const ModalAreaAtuacao = ({ areaAtuacao }: IAreaAtuacao) => {


    type createNewAreaAtuacao = z.infer<typeof areaAtuacaoSchema>
    const { Sucesso, Error } = useContext(MensagemContext)
    const [areas, setAreas] = useState<AreaAtuacao[]>(areaAtuacao);


    const { handleSubmit, register, formState, reset } = useForm<createNewAreaAtuacao>({
        resolver: zodResolver(areaAtuacaoSchema)
    })

    const handleCadstroAtuacao = async (data: createNewAreaAtuacao) => {
        try {
            await colaboradorRequest.createAreaAtuacao({
                id: 0,
                area_atuacao: data.area_atuacao
            })
            Sucesso("Area de atuação cadastrada com sucesso !")
            reset()
        } catch (error) {
            Error("Area de Atuação não pode ser cadastrado !")
            console.log(error)
        }
    };


    const handleAreaAtuacaoDelete = async (id: number) => {
        try {
            Sucesso("Area Atuação deletado com sucesso !")
            await colaboradorRequest.deleteAreaAtuacao(id)
            setAreas(state => state.filter(stat => { return stat.id != id }))
        } catch (error) {
            Error("Erro ao Deletar Area Atuação")
            console.log(error)
        }

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-emerald-600  text-white" form="setting">Área Atuação</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Área Atuação</DialogTitle>
                    <DialogDescription>
                        informe o nome da área para poder ser cadastrada
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleCadstroAtuacao)} className="space-y-5">
                    <InputRoot className="w-full">
                        <InputLabel>
                            Area Atuação
                        </InputLabel>
                        <InputRootInside>
                            <InputControl type="text" {...register("area_atuacao")} />
                        </InputRootInside>
                    </InputRoot>

                    {formState.errors.area_atuacao && <span className="text-red-500 ml-5 mt-1 text-xs">
                        {formState.errors.area_atuacao.message}
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
                        {areas.map((area) => (
                            <tr className="hover:bg-gray-100" key={area.id}>
                                <td className="py-4 px-5 border-b text-black font-semibold">{area.area_atuacao}</td>
                                <td className="py-4 px-5 border-b text-black font-semibold">
                                    <XCircle className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleAreaAtuacaoDelete(area.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DialogContent>
        </Dialog>
    )
}