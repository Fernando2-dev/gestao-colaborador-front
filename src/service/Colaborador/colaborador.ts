import { URL_API } from "@/utils/constante"
import { tokenService } from "../Auth/tokenService"
import axios from "axios"
import { Colaborador, ColaboradorAreaAtuacao, ColaboradorAreaAtuacaoDelete, ColaboradorUpgrade } from "@/interface/colaborador"

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
    return colaborador;
  },

  async readArea(): Promise<AreaAtuacao[]> {
    const resposta = await fetch(`${URL_API}/colaborador/areaAtuacao`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    const area = await resposta.json();
    return area;
  },

  async createAreaAtuacao(dados: AreaAtuacao) {
    const resposta = await fetch(`${URL_API}/colaborador/areaAtuacao`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados),
      cache: "no-store"
    })
    return resposta;
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
    });
  
    try {
      const corpoResposta = await resposta.json();
  
      return { dados: corpoResposta };
    } catch (error) {
      return { resposta };
    }
  },

  async createColaboradorAreaAtuacao(dados: ColaboradorAreaAtuacao) {
    try {
      const resposta = await axios.post<ColaboradorAreaAtuacao[]>(
        `${URL_API}/colaborador/areaAtuacaoColaborador`,
        dados, 
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!resposta.status) {
        throw new Error(`Erro ao enviar dados: ${resposta.statusText}`);
      }
      return resposta;
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw error;
    }
  },

  async deleteColaboradorAreaAtuacao(dados: ColaboradorAreaAtuacaoDelete) {
    try {
      const resposta = await axios.delete(
        `${URL_API}/colaborador/areaAtuacaoColaborador`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          data: dados
        }
      );
      if (!resposta.status) {
        throw new Error(`Erro ao enviar dados: ${resposta.statusText}`);
      }
      return resposta;
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw error;
    }
  },

  async update(dados: ColaboradorUpgrade) {
    const resposta = await fetch(`${URL_API}/colaborador`, {
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
  async deleteAreaAtuacao(id: number) {
    await fetch(`${URL_API}/colaborador/areaAtuacao/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      },
      cache: "no-store"
    },)
  },



}