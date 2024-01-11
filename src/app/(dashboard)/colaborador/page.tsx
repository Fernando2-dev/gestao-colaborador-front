import { colaboradorRequest } from "@/service/Colaborador/colaborador"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { ModalAreaAtuacao } from "@/components/modalAreaAtuacao";
import { Colaborador } from "@/interface/colaborador";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { columns } from "./column";
import { DataTable } from "@/components/data-table";



export default async function Colaborador() {
  const session = await getServerSession(nextAuthOptions)
  const token: string | undefined = session?.user.token;

  const colaborador = (await colaboradorRequest.read(token)).sort((a: any, b: any) => a.id - b.id)
  const areaAtuacao = await colaboradorRequest.readArea(token)
  const profile = await colaboradorRequest.readProfile(token)

  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900">Colaborador</h1>
      <div className="mt-6 flex flex-col ">
        <div className="flex justify-between items-center pb-5 border-b border-zinc-300">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-zinc-700">Perfil de todos os colaboradores</h2>
            <span className="text-sm font-medium text-zinc-500">acompanhe mais informações nas tabelas seguintes</span>
          </div>
          {profile.user?.role === "GESTOR" ? (
            <div className="flex items-center gap-2">
              <ModalAreaAtuacao areaAtuacao={areaAtuacao} />
              <Link href="/colaborador/cadastroColaborador">
                <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white" form="setting">Cadastrar Colaborador</button>
              </Link>
            </div>
          ) : null}
        </div>
        <DataTable columns={columns} data={colaborador} />
        <ToastContainer autoClose={3000} />
      </div>
    </>
  )
}