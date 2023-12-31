'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader, LockKeyhole, MailIcon } from "lucide-react"
import { InputControl, InputLabel, InputPrefix, InputRoot, InputRootInside } from "@/components/input"
import { signIn } from "next-auth/react"

export default function Login() {
  const loginCreateNewSchema = z.object({
    email:
      z.string()
        .nonempty("O email é obrigatório")
        .toLowerCase(),
    senha:
      z.string()
        .nonempty("A senha é obrigatória")
  })

  type loginCreateNewData = z.infer<typeof loginCreateNewSchema>

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState } = useForm<loginCreateNewData>({
    resolver: zodResolver(loginCreateNewSchema)
  })

  async function handleLogin(data: loginCreateNewData) {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        senha: data.senha,
        redirect: false
      })
      if(result?.error){
        return
      }
      router.replace("/colaborador")
      router.refresh()
    } catch (e) {
      console.log("erro:", e)
      setErrorMessage("email ou senha inválidos")
    }
    setIsLoading(false)
  }

  return (
    <main className="flex h-screen w-full justify-center items-center">
      <form className="flex flex-col justify-center items-center min-w-[600px] min-h-[500px] bg-cyan-950 rounded-md space-y-5" onSubmit={handleSubmit(handleLogin)}>
         <InputRoot className="w-10/12">
          <InputLabel className="text-white font-semibold text-lg">Email</InputLabel>
          <InputRootInside className="gap-5">
            <InputPrefix>
              <MailIcon className="text-white h-8 w-8" />
            </InputPrefix>
            <InputControl
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="bg-white p-3 rounded-md"
            />
          </InputRootInside>
        </InputRoot>


         {formState.errors.email && <span className="text-red-600">{formState.errors.email.message}</span>}

        <InputRoot className="w-10/12">
          <InputLabel className="text-white font-semibold text-lg">Senha</InputLabel>
          <InputRootInside className="gap-5">
            <InputPrefix>
              <LockKeyhole className="text-white h-8 w-8" /></InputPrefix>
            <InputControl
              type="password"
              placeholder="Senha"
              className="bg-white p-3 rounded-md"
              {...register("senha")}
            />
          </InputRootInside>
        </InputRoot>

        {formState.errors.senha && <span className="text-red-600">{formState.errors.senha.message}</span>}
        {errorMessage && <span className="text-red-600">{errorMessage}</span>} 
     
        <button
          type="submit"
          className={`text-black font-bold ${isLoading
            ? "bg-white cursor-not-allowed active:bg-white"
            : "bg-white cursor-pointer"
            } w-1/4 rounded-md h-10 flex justify-center items-center`}
          disabled={isLoading}
        >
          {isLoading ? (
              <Loader type="TailSpin" color="black" height={27} width={27} className="cursor-not-allowed " />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </main>
  )
}