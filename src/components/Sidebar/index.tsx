import { Search, SquareStack, Users } from "lucide-react"
import { Logo } from "./logo"
import { NaviItem } from "./naveItem"
import { InputControl, InputPrefix, InputRoot, InputRootInside } from "../input"
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { ButtonLogout } from "../buttonLogout";



export const Sidebar = async () => {
    const session = await getServerSession(nextAuthOptions)
    const token: string | undefined = session?.user.token;
    const profile = await colaboradorRequest.readProfile(token)
    return (
        <aside className='flex flex-col items-center border-r border-zinc-200 px-8 py-8'>
            <div className="flex flex-col flex-1 gap-6 ">
                <Logo />
                <InputRootInside className="gap-5">
                    <InputPrefix>
                        <Search className="h-5 w-5 text-zinc-500" />
                    </InputPrefix>
                    <InputControl
                        type="text"
                        placeholder="pesquise..."
                        className="bg-white rounded-md"
                    />
                </InputRootInside>
                <nav className="space-y-0.5">
                    <NaviItem icon={Users} title="Colaborador" path="/colaborador" />
                    <NaviItem icon={SquareStack} title="Projeto" path="/projeto" />
                </nav>

            </div>
            <div className="grid items-center gap-3 grid-cols-profile mb-1">
                <img
                    src="http://github.com/fernando2-dev.png"
                    className="h-10 w-10 rounded-full"
                    alt=""
                />
                <div className="flex flex-1 flex-col truncate">
                    <span className="text-sm font-semibold text-zinc-700">{profile?.user?.nome}</span>
                    <span className="truncate text-sm text-zinc-500 ">{profile?.user?.role}</span>
                    <span className="truncate text-sm text-zinc-500 ">{profile?.user?.email}</span>
                </div>
                <ButtonLogout />
            </div>
        </aside>
    )
}