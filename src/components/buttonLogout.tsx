'use client'
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const ButtonLogout = () => {
    const router = useRouter()

    async function logout(){
        await signOut({
            redirect: false
        })
        router.replace('/')
    }

    return (<button type="button" className="group ml-auto p-2 hover:bg-zinc-500 rounded-md" onClick={() => logout()}>
        <LogOut className="h-5 w-5 text-zinc-500 group-hover:text-white" />
    </button>)
}