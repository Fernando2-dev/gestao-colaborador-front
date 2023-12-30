import { URL_API } from "@/utils/constante";
import { tokenService } from "../Auth/tokenService";
import axios from "axios";
import { Projeto, ProjetoColaborador, ProjetoColaboradorDelete, ProjetoTecnologia } from "@/interface/projeto";
import { Tecnologia } from "@/interface/tecnologia";
import { ProjetoUpdate } from "@/interface/projeto";

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

  async readTecnologia(): Promise<Tecnologia[]> {
    const resposta = await fetch(`${URL_API}/projeto/tecnologia`, {
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
    try {
      const resposta = await fetch(`${URL_API}/projeto`, {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });
  
      const corpoResposta = await resposta.json();
      return { dados: corpoResposta };
    } catch (error) {
      
      return { error }; 
    }
  },
  async createProjetoColaborador(dados: ProjetoColaborador) {
    const resposta = await fetch(`${URL_API}/projeto/colaborador`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },
  
  async deleteColaboradorProjeto(dados: ProjetoColaboradorDelete) {
    try {
      const resposta = await axios.delete(
        `${URL_API}/projeto/colaborador`,
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
  async createProjetoTecnologia(dados: ProjetoTecnologia) {
    const resposta = await fetch(`${URL_API}/projeto/projetoTecnologia`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },
  async createTecnologia(dados: Tecnologia) {
    const resposta = await fetch(`${URL_API}/projeto/tecnologia`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta
  },
  async update(dados: ProjetoUpdate) {
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
  },
  async deleteTecnologia(id: number): Promise<void> {
    await fetch(`${URL_API}/projeto/tecnologia/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      }
    })
  }
}