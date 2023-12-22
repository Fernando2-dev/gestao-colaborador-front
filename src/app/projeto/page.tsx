export default function Projeto() {
    return (
      <>
        <h1 className="text-3xl font-medium text-zinc-900">Projeto</h1>
        <div className="mt-6 flex flex-col ">
          <div className="flex justify-between items-center pb-5 border-b border-zinc-300">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-zinc-700">Dados dos projetos</h2>
              <span className="text-sm font-medium text-zinc-500">Acompanhe mais informações nas tabelas seguintes</span>
            </div>
          </div>
          <div className="shadow-md p-12 mt-4">
            <table className="w-full border-zinc-100 rounded-lg bg-white">
              <thead className="bg-violet-200">
                <tr className="">
                  <th className="text-left py-4 px-5 border-b text-black">Nome</th>
                  <th className="text-left py-4 px-5 border-b text-black">Email</th>
                  <th className="text-left py-4 px-5 border-b text-black">Idade</th>
                  <th className="text-left py-4 px-5 border-b text-black">Role</th>
                  <th className="text-left py-4 px-5 border-b text-black">Area</th>
                  <th className="text-left py-4 px-5 border-b text-black">Projeto</th>
                  <th className="text-left py-4 px-5 border-b text-black">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-4 px-5 border-b text-black font-semibold">Danilo Sousa</td>
                  <td className="py-4 px-5 border-b text-zinc-500">danilo@example.com</td>
                  <td className="py-4 px-5 border-b text-zinc-500">Developer</td>
                  <td className="py-4 px-5 border-b text-zinc-500">Developer</td>
                  <td className="py-4 px-5 border-b text-zinc-500">...</td>
                  <td className="py-4 px-5 border-b text-zinc-500">...</td>
                  <td className="py-4 px-5 border-b text-zinc-500">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
  