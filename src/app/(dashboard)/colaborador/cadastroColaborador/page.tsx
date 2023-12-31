"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react";
import { MensagemContext } from "@/context/ContextMensagemProvider";
import { Loader, LockKeyhole, MailIcon, User } from "lucide-react";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { ColaboradorSchema } from "@/validacao/validacaoColaborador";
import { InputControl, InputRoot, InputRootInside, InputPrefix, InputLabel } from "@/components/input";
import Link from "next/link";
import { Projeto, ProjetoColaborador } from "@/interface/projeto";
import { projetoRequest } from "@/service/Projeto/projeto";
import Select, { ActionMeta, MultiValue } from "react-select"
import makeAnimated from "react-select/animated"
import { ColaboradorAreaAtuacao } from "@/interface/colaborador";
import { useSession } from "next-auth/react";

interface IMultiValue {
  value: string
  label: string
}

const CadastroColaborador = () => {
  type createNewColaboradordata = z.infer<typeof ColaboradorSchema>

  const { register, reset, handleSubmit, formState } = useForm<createNewColaboradordata>({
    resolver: zodResolver(ColaboradorSchema)
  })

  const router = useRouter();
  const { Sucesso, Error } = useContext(MensagemContext)
  const [areaAtuacao, setAreaAtuacao] = useState<AreaAtuacao[]>([])
  const [projeto, setProjeto] = useState<Projeto[]>([])
  const [areaColaborador, setAreaColaborador] = useState<IMultiValue[]>([]);
  const [projetoColaborador, setProjetoColaborador] = useState<IMultiValue[]>([])
  const session = useSession()

  useEffect(() => {

    const readArea = async () => {
      const resposta = await colaboradorRequest.readArea(session.data?.user.token)
      setAreaAtuacao(resposta)

      const projetoRes = await projetoRequest.read(session.data?.user.token)
      setProjeto(projetoRes)
    }
    readArea()
  }, [session])

  const novasAreas = areaAtuacao.map(lista => ({ value: lista.id.toString(), label: lista.area_atuacao }));
  const novasProjeto = projeto.map(lista => ({ value: lista.id.toString(), label: lista.nome }));
  const makeComponent = makeAnimated()


  const handleCreateColaborador = async (data: createNewColaboradordata) => {
    try {
      const colaboradorData = {
        id: 0,
        nome: data.nome,
        email: data.email,
        idade: data.idade,
        role: data.role,
        senha: data.senha,
        regime_contratacao: data.regime_contratacao,
      };
      const { dados } = await colaboradorRequest.create(colaboradorData, session.data?.user.token);    
     
      const areasAtuacaoColaborador = areaColaborador.map(area => ({
        colaborador_id: dados.colaborador.id,
        areaAtuacao_id: parseInt(area.value),
      }));

      const colaboradorProjetoData = projetoColaborador.map(projeto => ({
        colaborador_id: dados.colaborador.id,
        projeto_id: parseInt(projeto.value),
      }));

      const area: ColaboradorAreaAtuacao = {
        areasAtuacaoColaborador: areasAtuacaoColaborador
      }

      const projeto: ProjetoColaborador = {
        ColaboradorProjeto: colaboradorProjetoData
      }
      await colaboradorRequest.createColaboradorAreaAtuacao(area, session.data?.user.token)
      await projetoRequest.createProjetoColaborador(projeto, session.data?.user.token)

      Sucesso("Colaborador cadastrado com sucesso");
      router.push("/colaborador");
      router.refresh();
      reset();
    } catch (error) {
      Error("Erro ao cadastrar o colaborador");
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold">Cadastro colaborador</h2>
      <form className="mt-6 flex flex-col w-full gap-5 divide-y divide-zinc-300" onSubmit={handleSubmit(handleCreateColaborador)}>
        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="senha" className="text-sm font-medium text-zinc-700">
              Senha
            </label>
            <div className="grid gap-6 grid-cols-1">
              <InputRoot >
                <InputRootInside className="gap-5 ">
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
        </div>
        <div className="">
          <div className="flex justify-between p-3">
            <InputRoot>
              <InputLabel className="text-sm font-medium text-zinc-700">Área Atuação</InputLabel>
              <Select
                isMulti
                onChange={(newValue: MultiValue<IMultiValue>, actionMeta: ActionMeta<IMultiValue>) => {
                  if (newValue) {
                    setAreaColaborador(newValue.map(item => ({ value: item.value, label: item.label })));
                  } else {
                    setAreaColaborador([]);
                  }
                }}
                options={novasAreas}
                className="w-full border-white"
                components={makeComponent}
              />
            </InputRoot>
            <InputRoot>
              <InputLabel className="text-sm font-medium text-zinc-700">Projeto</InputLabel>
              <Select
                isMulti
                onChange={(newValue: MultiValue<IMultiValue>, actionMeta: ActionMeta<IMultiValue>) => {
                  if (newValue) {
                    setProjetoColaborador(newValue.map(item => ({ value: item.value, label: item.label })));
                  } else {
                    setProjetoColaborador([]);
                  }
                }}
                options={novasProjeto}
                components={makeComponent}
                className="w-full border-white"
              />
            </InputRoot>
          </div>
        </div>

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
export default CadastroColaborador