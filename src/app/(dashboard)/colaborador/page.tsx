import { authService } from "@/service/Auth/authService";
import { tokenService } from "@/service/Auth/tokenService";
import { colaboradorRequest } from "@/service/Colaborador/colaborador"
import Link from "next/link";

export default async function Colaborador() {
  const colaborador = await colaboradorRequest.read();
  const token = tokenService.get()

  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900">Colaborador</h1>
      <div className="mt-6 flex flex-col ">
        <div className="flex justify-between items-center pb-5 border-b border-zinc-300">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-zinc-700">Perfil de todos os colaboradores</h2>
            <span className="text-sm font-medium text-zinc-500">acompanhe mais informações nas tabelas seguintes</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/colaborador/created">
              <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white" form="setting">Cadastrar</button>
            </Link>
          </div>
        </div>
        <div className="shadow-md p-12 mt-4">
          <table className="w-full border-zinc-100 rounded-lg bg-white">
            <thead className="bg-violet-200">
              <tr className="">
                <th className="text-left py-4 px-5 border-b text-black">Nome</th>
                <th className="text-left py-4 px-5 border-b text-black">Email</th>
                <th className="text-left py-4 px-5 border-b text-black">Regime Contratação</th>
                <th className="text-left py-4 px-5 border-b text-black">Role</th>
                <th className="text-left py-4 px-5 border-b text-black">Area</th>
                <th className="text-left py-4 px-5 border-b text-black">Projeto</th>
                <th className="text-left py-4 px-5 border-b text-black">Ação</th>
              </tr>
            </thead>
            <tbody>
              {colaborador.map((colaborado, index) => (
                <tr className="hover:bg-gray-100" key={colaborado.id}>
                  <td className="py-4 px-5 border-b text-black font-semibold">{colaborado.nome}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">{colaborado.email}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">{colaborado.regime_contratacao}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">{colaborado.role}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    {colaborado.areasAtuacaoColaborador?.[index]?.id_area_atuacao.area_atuacao}
                  </td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    {colaborado.ColaboradorProjeto?.[index]?.id_projeto.nome}
                  </td>
                  <td className="py-4 px-5 border-b text-zinc-500">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  )
}