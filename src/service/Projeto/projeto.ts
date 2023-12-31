import { URL_API } from "@/utils/constante";
import axios from "axios";
import { Projeto, ProjetoColaborador, ProjetoColaboradorDelete, ProjetoTecnologia, ProjetoTecnologiaDelete } from "@/interface/projeto";
import { Tecnologia } from "@/interface/tecnologia";
import { ProjetoUpdate } from "@/interface/projeto";


export const projetoRequest = {
  async read(token: string | undefined): Promise<Projeto[]> {
    const resposta = await fetch(`${URL_API}/projeto`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    })
    const projeto = resposta.json()
    return projeto;
  },

  async readTecnologia(token: string | undefined): Promise<Tecnologia[]> {
    try {
      const resposta = await fetch(`${URL_API}/projeto/tecnologia`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        cache: "no-store"
      });
      const projeto = await resposta.json();
      return projeto;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  },
  

  async readId(id : string,token: string | undefined): Promise<Projeto> {
    const resposta = await axios.get(`${URL_API}/projeto/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    return resposta.data;
  },

  async create(dados: Projeto, token: string | undefined) {
    try {
      const resposta = await fetch(`${URL_API}/projeto`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
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
  async createProjetoColaborador(dados: ProjetoColaborador, token: string | undefined) {
    const resposta = await fetch(`${URL_API}/projeto/colaborador`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },
  
  async deleteColaboradorProjeto(dados: ProjetoColaboradorDelete, token: string | undefined) {
    try {
      const resposta = await axios.delete(
        `${URL_API}/projeto/colaborador`,
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
  async createProjetoTecnologia(dados: ProjetoTecnologia, token: string | undefined) {
    const resposta = await fetch(`${URL_API}/projeto/projetoTecnologia`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta;
  },
  async deleteTecnologiaProjeto(dados: ProjetoTecnologiaDelete, token: string | undefined ) {
    try {
      const resposta = await axios.delete(
        `${URL_API}/projeto/projetoTecnologia`,
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
  async createTecnologia(dados: Tecnologia, token: string | undefined) {
    const resposta = await fetch(`${URL_API}/projeto/tecnologia`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta
  },
  async update(dados: ProjetoUpdate, token: string | undefined) {
    const resposta = await fetch(`${URL_API}/projeto/${dados.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return resposta
  },

  async delete(id: number, token: string | undefined): Promise<void> {
    await fetch(`${URL_API}/projeto/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  },
  async deleteTecnologia(id: number, token: string | undefined): Promise<void> {
    await fetch(`${URL_API}/projeto/tecnologia/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
}