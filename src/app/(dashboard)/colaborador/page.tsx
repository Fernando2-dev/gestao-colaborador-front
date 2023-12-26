import { ModaisColaborador } from "@/components/modaisColaborador";
import { ModalAreaAtuacao } from "@/components/modalAreaAtuacao";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { colaboradorRequest } from "@/service/Colaborador/colaborador"
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function Colaborador() {
  const colaborador = await colaboradorRequest.read();
  const areaAtuacao = await colaboradorRequest.readArea()

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
            <ModalAreaAtuacao areaAtuacao={areaAtuacao}/>
            <Link href="/colaborador/created">
              <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white" form="setting">Cadastrar Colaborador</button>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-violet-400 text-black" form="setting">Áreas</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Area de Atuação</DialogHeader>
                        {colaborado.areasAtuacaoColaborador?.map((area) => (
                          <div key={area.id_area_atuacao.id}>
                            <div className="p-3 border border-emerald-300 rounded-lg">{area.id_area_atuacao.area_atuacao}</div>
                          </div>
                        ))}
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-500 text-white" form="setting">Projetos</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Projetos</DialogHeader>
                        {colaborado.ColaboradorProjeto?.map((area) => (
                          <div key={area.id_projeto.id}>
                            <div className="p-3 border border-emerald-300 rounded-lg">
                              {area.id_projeto.nome}
                            </div>
                          </div>
                        ))}
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    <ModaisColaborador colaborador={colaborado} index={index} key={colaborado.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    </>
  )
}