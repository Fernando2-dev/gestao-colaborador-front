import { URL_API } from "@/utils/constante"
import { tokenService } from "../Auth/tokenService"
import axios from "axios"
import { Colaborador, ColaboradorUpgrade } from "@/interface/colaborador"

const token = tokenService.get();
export const colaboradorRequest = {
  async read(): Promise<Colaborador[]> {

    const resposta = await fetch(`${URL_API}/colaborador`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    });

    const colaborador = await resposta.json();
    console.log(token)
    return colaborador;
  },

  async readArea(): Promise<AreaAtuacao[]> {
    const resposta = await fetch(`${URL_API}/colaborador/areaAtuacao`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    });
    const area = await resposta.json();
    return area;
  },

  async readId(id: number): Promise<Colaborador> {
    try {
      const response = await axios.get<Colaborador>(`${URL_API}/colaborador/${id}`, {
        headers: {
          "Authorization": `${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(dados: Colaborador) {
    const resposta = await fetch(`${URL_API}/colaborador`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },

  async upgrade(dados: ColaboradorUpgrade) {
    const resposta = await fetch(`${URL_API}/colaborador/${dados.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },

  async delete(id: number) {
    await fetch(`${URL_API}/colaborador/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      },
      cache: "no-store"
    },)
  },


}