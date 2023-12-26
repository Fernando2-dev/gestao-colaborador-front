"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { Loader, LockKeyhole, MailIcon, User } from "lucide-react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { ColaboradorSchema } from "@/validacao/validacaoColaborador";
import { InputControl, InputRoot, InputRootInside, InputPrefix } from "@/components/input";
import Link from "next/link";


const Created = () => {
  type createNewColaboradordata = z.infer<typeof ColaboradorSchema>

  const { register, reset, handleSubmit, formState } = useForm<createNewColaboradordata>({
    resolver: zodResolver(ColaboradorSchema)
  })

  const router = useRouter();
  const { Sucesso, Error } = useContext(MensagemContext)

  const handleCreateColaborador = async (data: createNewColaboradordata) => {
    try {
      await colaboradorRequest.create({
        id: 0,
        nome: data.nome,
        email: data.email,
        idade: data.idade,
        role: data.role,
        senha: data.senha,
        regime_contratacao: data.regime_contratacao,

      })
      Sucesso("Colaborador cadastrado com sucesso")
      router.push("/colaborador");
      router.refresh()
      reset()
    } catch (error) {
      Error("Erro ao cadastrar o colaborador")
      console.log(error)
    }
  }
 console.log(formState.errors)
  return (

    <div>
      <form action="" id="setting" className="mt-6 flex flex-col w-full gap-5 divide-y divide-zinc-300" onSubmit={handleSubmit(handleCreateColaborador)}>
        <div className="grid gap-3 grid-cols-form">
          <label className="text-sm font-medium text-zinc-700">Name</label>
          <div className="grid gap-6 grid-cols-1">
            <InputRoot>
              <InputRootInside className="gap-5">
                <InputPrefix>
                  <User className="text-gray-400 h-6 w-6" />
                </InputPrefix>
                <InputControl
                  id="email"
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
          <label className="text-sm font-medium text-zinc-700"> Email </label>
          <div className="grid gap-6 grid-cols-1">
            <InputRoot>
              <InputRootInside className="gap-5">
                <InputPrefix>
                  <MailIcon className="text-gray-400 h-6 w-6" />
                </InputPrefix>
                <InputControl
                  id="email"
                  type="email"
                  placeholder="digite seu email"
                  {...register("email")}
                  className="bg-white  rounded-md"
                />
              </InputRootInside>
            </InputRoot>
          </div>
        </div>

        {formState.errors.email && <span className="text-red-500 ml-5 mt-1 text-xs">
          {formState.errors.email.message}
        </span>}

        <div className="grid gap-3 grid-cols-form pt-5">
          <label className="text-sm font-medium text-zinc-700"> Idade </label>
          <div className="grid gap-6 grid-cols-1">
            <InputRoot>
              <InputRootInside className="gap-5">
                <InputControl
                  type="number"
                  placeholder="digite a sua idade"
                  {...register("idade")}
                  className="bg-white  rounded-md"
                />
              </InputRootInside>
            </InputRoot>
          </div>
        </div>

        {formState.errors.idade &&
          <span className="text-red-500 ml-5 mt-1 text-xs">
            {formState.errors.idade.message}
          </span>}

        <div className="grid gap-3 grid-cols-form pt-5">
          <label className="text-sm font-medium text-zinc-700">
            Role
          </label>
          <div className="grid gap-6 grid-cols-1">
            <select
              className="flex w-full items-center gap-2 rounded-lg border border-lg-zinc-300 px-3 py-3 shadow-sm outline-none"
              {...register("role")}
              defaultValue=""
            >
              <option value="" disabled>
                selecione uma role
              </option>
              <option value="MEMBRO">MEMBRO</option>
              <option value="GESTOR">GESTOR</option>
            </select>
          </div>
        </div>

        {formState.errors.role &&
          <span className="text-red-500 ml-5 mt-1 text-xs">
            {formState.errors.role.message}
          </span>}

        <div className="grid gap-3 grid-cols-form pt-5">
          <label className="text-sm font-medium text-zinc-700">
            Regime Contratação
          </label>
          <div className="grid gap-6 grid-cols-1">
            <select
              className="flex w-full items-center gap-2 rounded-lg border border-lg-zinc-300 px-3 py-3 shadow-sm outline-none"
              {...register("regime_contratacao")}
              defaultValue=""
            >
              <option value="" disabled>
                selecione uma regime
              </option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
            </select>
          </div>
        </div>

        {formState.errors.regime_contratacao &&
          <span className="text-red-500 ml-5 mt-1 text-xs">
            {formState.errors.regime_contratacao.message}
          </span>}

        <div className="grid gap-3 grid-cols-form pt-5">
          <label htmlFor="senha" className="text-sm font-medium text-zinc-700">
            Senha
          </label>
          <div className="grid gap-6 grid-cols-1">
            <InputRoot >
              <InputRootInside className="gap-5">
                <InputPrefix>
                  <LockKeyhole className="text-gray-400 h-6 w-6" /></InputPrefix>
                <InputControl
                  type="text"
                  placeholder="digite sua senha"
                  className="bg-white rounded-md"
                  {...register("senha")}
                />
              </InputRootInside>
            </InputRoot>
          </div>
        </div>

        {formState.errors.senha &&
          <span className="text-red-500 ml-5 mt-1 text-xs">
            {formState.errors.senha.message}
          </span>}

        <div className="flex justify-end gap-2 pt-4">
          <Link href="/colaborador">
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
