import { ModaisProjeto } from "@/components/modaisProjeto";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { projetoRequest } from "@/service/Projeto/projeto"
import Link from "next/link";

export default async function Projeto() {
  const projetos = await projetoRequest.read();

  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900">Projeto</h1>
      <div className="mt-6 flex flex-col ">
        <div className="flex justify-between items-center pb-5 border-b border-zinc-300">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-zinc-700">Dados dos projetos</h2>
            <span className="text-sm font-medium text-zinc-500">Acompanhe mais informações nas tabelas seguintes</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/projeto/created">
              <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white" form="setting">Cadastrar</button>
            </Link>
          </div>
        </div>
        <div className="shadow-md p-12 mt-4">
          <table className="w-full border-zinc-100 rounded-lg bg-white">
            <thead className="bg-violet-200">
              <tr className="">
                <th className="text-left py-4 px-5 border-b text-black">Nome</th>
                <th className="text-left py-4 px-5 border-b text-black">Prazo</th>
                <th className="text-left py-4 px-5 border-b text-black">Descrição</th>
                <th className="text-left py-4 px-5 border-b text-black">Tecnologia</th>
                <th className="text-left py-4 px-5 border-b text-black">Colaborador</th>
                <th className="text-left py-4 px-5 border-b text-black">Ação</th>
              </tr>
            </thead>
            <tbody>
              {projetos.map((projeto, index) => (
                <tr className="hover:bg-gray-100" key={projeto.id}>
                  <td className="py-4 px-5 border-b text-black font-semibold">{projeto.nome}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">{projeto.prazo}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">{projeto.descricao}</td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-violet-400 text-black" form="setting">Tecnologias</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Tecnologia</DialogHeader>
                        {projeto.projetoTecnologias?.map((tec) => (
                          <div key={tec.tecnologia_id}>
                            <div className="p-3 border border-emerald-300 rounded-lg">{tec.id_tecnologia.nome_tecnologia}</div>
                          </div>
                        ))}
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-500 text-white" form="setting">Colaborador</button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Colaborador</DialogHeader>
                        {projeto.ColaboradorProjeto?.map((colaborador) => (
                          <div key={colaborador.colaborador_id}>
                            <div className="p-3 border border-emerald-300 rounded-lg">
                              {colaborador.id_colaborador.nome}
                            </div>
                          </div>
                        ))}
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="py-4 px-5 border-b text-zinc-500">
                    <ModaisProjeto projeto={projeto} index={index} key={projeto.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )


}
