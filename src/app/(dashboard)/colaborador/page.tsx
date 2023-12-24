export default function Colaborador() {
  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900">Colaborador</h1>
      <div className="mt-6 flex flex-col ">
        <div className="flex justify-between items-center pb-5 border-b border-zinc-300">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-zinc-700">Perfil de todos os colaboradores</h2>
            <span className="text-sm font-medium text-zinc-500">acompanhe mais informações nas tabelas seguintes</span>
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
        {/* <form action="" id="setting" className="mt-6 flex flex-col w-full gap-5 divide-y divide-zinc-300">

          <div className="grid gap-3 grid-cols-form">
            <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">Name</label>
            <div className="grid gap-6 grid-cols-2">
              <InputRoot>
                <InputControl
                  defaultValue="diego"
                  id="firstName"
                />
              </InputRoot>
              <InputRoot>
                <InputControl
                  defaultValue="fernando"
                  id=""
                />
              </InputRoot>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">
              Email Eddress
            </label>
            <div>
              <InputRoot>
                <InputPrefix>
                  <Mail className="w-5 h-5 text-zinc-500" />
                </InputPrefix>
                <InputControl
                  type="email"
                  defaultValue="fernando@gmail.com"
                  id="firstName"
                />
              </InputRoot>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 ">
              Your Photo
              <span className="mt-0.5 text-sm font-normal text-zinc-500 block">This will be displayed on your profile.</span>
            </label>
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-200">
                <User className="w-8 h-8 text-violet-500 " />
              </div>
              <label
                htmlFor="photo"
                className="text-zinc-500 flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center shadow-sm">
                Selecionar arquivo
                <div className="rounded-full border-6 border-zinc-50 bg-zinc-100 p-2">
                  <UploadCloud className="h-5 w-5 text-zinc-600" />
                </div>
              </label>
              <input type="file" className="sr-only" id="photo" />
            </div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="role" className="text-sm font-medium text-zinc-700">
              Role
            </label>
            <div>
              <InputRoot>
                <InputControl
                  type="email"
                  defaultValue="CTO"
                  id="role"
                />
              </InputRoot>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="country" className="text-sm font-medium text-zinc-700">
              Country
            </label>
            <div>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="timezone" className="text-sm font-medium text-zinc-700">
              Timezone
            </label>
            <div>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="bio" className="text-sm font-medium text-zinc-700 ">
              bio
              <span className="mt-0.5 text-sm font-normal text-zinc-500 block">
                Brite a short introdution
              </span>
            </label>
            <div></div>
          </div>

          <div className="grid gap-3 grid-cols-form pt-5">
            <label htmlFor="project" className="text-sm font-medium text-zinc-700 ">
              Portifolio project
              <span className="mt-0.5 text-sm font-normal text-zinc-500 block">
                Brite a short introdution
              </span>
            </label>
            <div></div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-zinc-300 text-zinc-700 hover:bg-zinc-50">Cancel</button>
            <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-700 text-white">Submit</button>
          </div>
        </form> */}
      </div>
    </>
  )
}