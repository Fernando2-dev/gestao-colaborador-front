"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { Loader} from "lucide-react";
import { InputControl, InputRoot, InputRootInside} from "@/components/input";
import Link from "next/link";
import { ProjetoSchema } from "@/validacao/validacaoProjeto";
import { projetoRequest } from "@/service/Projeto/projeto";


const Created = () => {
    type createNewProjetodata = z.infer<typeof ProjetoSchema>

    const { register, reset, handleSubmit, formState } = useForm<createNewProjetodata>({
        resolver: zodResolver(ProjetoSchema)
    })

    const router = useRouter();
    const { Sucesso, Error } = useContext(MensagemContext)

    const handleCreateProjeto = async (data: createNewProjetodata) => {
        try {
            await projetoRequest.create({
                id: 0,
                nome: data.nome,
                prazo: data.prazo,
                descricao: data.descricao
            })
            Sucesso("Projeto cadastrado com sucesso")
            router.push("/projeto");
            reset()
        } catch (error) {
            Error("Erro ao cadastrar o projeto")
            console.log(error)
        }
    }
    console.log(formState.errors)
    return (

        <div>
            <form action="" id="setting" className="mt-6 flex flex-col w-full gap-5 divide-y divide-zinc-300" onSubmit={handleSubmit(handleCreateProjeto)}>
                <div className="grid gap-3 grid-cols-form">
                    <label className="text-sm font-medium text-zinc-700">Nome</label>
                    <div className="grid gap-6 grid-cols-1">
                        <InputRoot>
                            <InputRootInside className="gap-5">
                                <InputControl
                                    type="text"
                                    placeholder="digite seu nome"
                                    {...register("nome")}
                                    className="bg-white  rounded-md"
                                />
                            </InputRootInside>
                        </InputRoot>
                    </div>
                </div>

                {formState.errors.nome && <span className="text-red-500 ml-5 mt-1 text-xs">
                    {formState.errors.nome.message}
                </span>}

                <div className="grid gap-3 grid-cols-form pt-5">
                    <label className="text-sm font-medium text-zinc-700"> Prazo </label>
                    <div className="grid gap-6 grid-cols-1">
                        <InputRoot>
                            <InputRootInside className="gap-5">
                                <InputControl
                                    type="date"
                                    placeholder="digite o prazo do projeto"
                                    {...register("prazo")}
                                    className="bg-white  rounded-md"
                                />
                            </InputRootInside>
                        </InputRoot>
                    </div>
                </div>

                {formState.errors.prazo && <span className="text-red-500 ml-5 mt-1 text-xs">
                    {formState.errors.prazo.message}
                </span>}

                <div className="grid gap-3 grid-cols-form pt-5">
                    <label className="text-sm font-medium text-zinc-700"> Descrição </label>
                    <div className="grid gap-6 grid-cols-1">
                        <InputRoot>
                            <InputRootInside className="gap-5">
                                <textarea
                                    className="w-full disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none"
                                    {...register("descricao")}
                                />
                            </InputRootInside>
                        </InputRoot>
                    </div>
                </div>

                {formState.errors.descricao &&
                    <span className="text-red-500 ml-5 mt-1 text-xs">
                        {formState.errors.descricao.message}
                    </span>}

                <div className="flex justify-end gap-2 pt-4">
                    <Link href="/projeto">
                        <button
                            type="button"
                            className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                            voltar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white"
                        disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? (
                            <Loader type="TailSpin" color="white" height={27} width={27} className="cursor-not-allowed animate-spin" />
                        ) : (
                            "Salvar"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Created
