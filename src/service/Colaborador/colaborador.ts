import { URL_API } from "@/utils/constante"
import axios from "axios"
import { Colaborador, ColaboradorAreaAtuacao, ColaboradorAreaAtuacaoDelete, ColaboradorUpgrade } from "@/interface/colaborador"


export const colaboradorRequest = {
  async readProfile(token: string | undefined){
      const resposta = await axios.get<Perfil>(`${URL_API}/colaborador/perfil`,{
          headers: {
              authorization: `Bearer ${token}`
          }
      })
      return resposta.data  
  },
  async read(token: string | undefined): Promise<Colaborador[]> {
   
    const resposta = await fetch(`${URL_API}/colaborador`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    });

    const colaborador = await resposta.json();
    return colaborador;
  },

  async readArea(token: string | undefined): Promise<AreaAtuacao[]> {
    const resposta = await fetch(`${URL_API}/colaborador/areaAtuacao`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    const area = await resposta.json();
    return area;
  },

  async createAreaAtuacao(dados: AreaAtuacao, token: string | undefined) {
    const resposta = await fetch(`${URL_API}/colaborador/areaAtuacao`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados),
      cache: "no-store"
    })
    return resposta;
  },

  async readId(id: number, token: string | undefined): Promise<Colaborador> {
    
    try {
      const response = await axios.get<Colaborador>(`${URL_API}/colaborador/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(dados: Colaborador, token: string | undefined) {
    const resposta = await fetch(`${URL_API}/colaborador`, {
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
        `${URL_API}/colaborador/areaAtuacaoColaborador`,
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
        `${URL_API}/colaborador/areaAtuacaoColaborador`,
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
    const resposta = await fetch(`${URL_API}/colaborador`, {
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
    await fetch(`${URL_API}/colaborador/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    },)
  },
  async deleteAreaAtuacao(id: number, token: string | undefined) {
    await fetch(`${URL_API}/colaborador/areaAtuacao/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store"
    },)
  },
}