import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { ModaisProjeto } from "@/components/modaisProjeto";
import { ModalTecnologia } from "@/components/modalTecnologia";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { projetoRequest } from "@/service/Projeto/projeto"
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { columns } from "./column";
import { DataTable } from "@/components/data-table";

export default async function Projeto() {
  const session = await getServerSession(nextAuthOptions)
  const token: string | undefined = session?.user.token;

  const projetos = (await projetoRequest.read(token)).sort((a: any, b: any) => a.id - b.id)
  const tecnologia = await projetoRequest.readTecnologia(token)
  const profile = await colaboradorRequest.readProfile(token)

  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900">Projeto</h1>
      <div className="mt-6 flex flex-col ">
        <div className="flex justify-between items-center pb-5 border-b border-zinc-300">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-zinc-700">Dados dos projetos</h2>
            <span className="text-sm font-medium text-zinc-500">Acompanhe mais informações nas tabelas seguintes</span>
          </div>
          {profile.user?.role === "GESTOR" ? (<div className="flex items-center gap-2">
            <ModalTecnologia tecnologia={tecnologia} />
            <Link href="/projeto/cadastro">
              <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white" form="setting">Cadastrar Projeto</button>
            </Link>
          </div>) : null}
        </div>
        <DataTable columns={columns} data={projetos}/>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  )


}
