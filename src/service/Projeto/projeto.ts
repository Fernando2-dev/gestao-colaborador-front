import { URL_API } from "@/utils/constante";
import { tokenService } from "../Auth/tokenService";
import axios from "axios";
import { Projeto } from "@/interface/projeto";

const token = tokenService.get()

export const projetoRequest = {
  async read(): Promise<Projeto[]> {
    const resposta = await fetch(`${URL_API}/projeto`, {
      headers: {
        "Authorization": `${token}`
      },
      cache: "no-store"
    })
    const projeto = resposta.json()
    return projeto;
  },

  async readId(id : string): Promise<Projeto> {
    const resposta = await axios.get(`${URL_API}/projeto/${id}`, {
      headers: {
        "Authorization": `${token}`
      }
    })
    return resposta.data;
  },

  async create(dados: Projeto) {
    const resposta = await fetch(`${URL_API}/projeto`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta
  },
  async upgrade(dados: Projeto) {
    const resposta = await fetch(`${URL_API}/projeto/${dados.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta
  },

  async delete(id: number): Promise<void> {
    await fetch(`${URL_API}/projeto/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      }
    })
  }
}