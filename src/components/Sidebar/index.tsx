import { BarChart, CheckSquare, Cog, Flag, Home, LifeBuoy, LogOut, Search, SquareStack, Users } from "lucide-react"
import { Logo } from "./logo"
import { NaviItem } from "./naveItem"
import { UsersSpace } from "./user"
import { InputControl, InputPrefix, InputRoot } from "../input"

export const Sidebar = () => {
    return (
        <aside className='flex flex-col items-center border-r border-zinc-200 px-8 py-8'>
            <div className="flex flex-col flex-1 gap-6 ">
                <Logo />
                <InputRoot>
                    <InputPrefix>
                        <Search className="h-5 w-5 text-zinc-500" />
                    </InputPrefix>
                    <InputControl placeholder="Seach" />
                </InputRoot>

                <nav className="space-y-0.5">
                    <NaviItem icon={Users} title="Colaborador" path="/" />
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
                    <span className="text-sm font-semibold text-zinc-700">Fernando Henrique</span>
                    <span className="truncate text-sm text-zinc-500 ">feroficialvolei@gmail.com</span>
                </div>
                <button type="button" className="group ml-auto p-2 hover:bg-zinc-500 rounded-md">
                    <LogOut className="h-5 w-5 text-zinc-500 group-hover:text-white" />
                </button>
            </div>
        </aside>
    )
}