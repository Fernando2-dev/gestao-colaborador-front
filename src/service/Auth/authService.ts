import { URL_API } from "@/utils/constante"
import axios from "axios"
import { tokenService } from "./tokenService"
import { Login } from "@/interface/login"

export const authService = {
 async login({ email, senha }: Login) {
    const resposta = await axios.post<Login>(`${URL_API}/auth`, {
      email: email,
      senha: senha
    })
    console.log(resposta.data)
   return tokenService.save(resposta.headers.authorization)
  }

}