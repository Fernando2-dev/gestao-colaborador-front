import {  URL_API_PRODUCAO } from "@/utils/constante"
import axios from "axios"
import { Colaborador, ColaboradorAreaAtuacao, ColaboradorAreaAtuacaoDelete, ColaboradorUpgrade } from "@/interface/colaborador"


export const colaboradorRequest = {
  async readProfile(token: string | undefined): Promise<Perfil> {
    const resposta = await fetch(`${URL_API_PRODUCAO}/colaborador/perfil`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    });
  
    const perfil = await resposta.json();
    return perfil;
  },
  
  async read(token: string | undefined): Promise<Colaborador[]> {
   
    const resposta = await fetch(`${URL_API_PRODUCAO}/colaborador`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    });

    const colaborador = await resposta.json();
    return colaborador;
  },

  async readArea(token: string | undefined): Promise<AreaAtuacao[]> {
    const resposta = await fetch(`${URL_API_PRODUCAO}/colaborador/areaAtuacao`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    const area = await resposta.json();
    return area;
  },

  async createAreaAtuacao(dados: AreaAtuacao, token: string | undefined) {
    const resposta = await fetch(`${URL_API_PRODUCAO}/colaborador/areaAtuacao`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados),
      cache: "no-store"
    })
    try {
      const corpoResposta = await resposta.json();
  
      return { dados: corpoResposta };
    } catch (error) {
      return { resposta };
    }
  },

  async create(dados: Colaborador, token: string | undefined) {
    const resposta = await fetch(`${URL_API_PRODUCAO}/colaborador`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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

  async createColaboradorAreaAtuacao(dados: ColaboradorAreaAtuacao, token: string | undefined) {
   
    try {
      const resposta = await axios.post<ColaboradorAreaAtuacao[]>(
        `${URL_API_PRODUCAO}/colaborador/areaAtuacaoColaborador`,
        dados, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  async deleteColaboradorAreaAtuacao(dados: ColaboradorAreaAtuacaoDelete, token: string | undefined) {
    try {
      const resposta = await axios.delete(
        `${URL_API_PRODUCAO}/colaborador/areaAtuacaoColaborador`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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


  async update(dados: ColaboradorUpgrade, token: string | undefined) {
    const resposta = await fetch(`${URL_API_PRODUCAO}/colaborador`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },

  async delete(id: number, token: string | undefined) {
    await fetch(`${URL_API_PRODUCAO}/colaborador/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    },)
  },
  async deleteAreaAtuacao(id: number, token: string | undefined) {
    await fetch(`${URL_API_PRODUCAO}/colaborador/areaAtuacao/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    },)
  },
}