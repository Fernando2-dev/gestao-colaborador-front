
export interface Projeto {
    id: number,
    nome: string,
    prazo: string,
    descricao: string,
    ColaboradorProjeto?: [
        {
            colaborador_id: number,
            projeto_id: number,
            id_colaborador: {
                id: number,
                nome: string,
                email: string,
                idade: string,
                role: string,
                regime_contratacao: string
            }
        }
    ],
    projetoTecnologias?: [
        {
            tecnologia_id: number,
            projeto_id: number,
            id_tecnologia: {
                id: number,
                nome_tecnologia: string
            }
        }
    ]
}
export interface ProjetoUpdate {
    id: number,
    nome: string,
    prazo: string,
    descricao: string,
    ColaboradorProjeto?:
    {
        colaborador_id: number,
        projeto_id: number,

    }[]
    ,
    projetoTecnologias?:
    {
        tecnologia_id: number,
        projeto_id: number,

    }[]

}


export interface ProjetoColaborador {
    ColaboradorProjeto: {
        projeto_id: number,
        colaborador_id: number
    }[],

}
export interface ProjetoColaboradorDelete {
    vinculoProjeto: {
        projeto_id: number,
        colaborador_id: number
    }[],

}
export interface ProjetoTecnologia {
    projetoTecnologia: {
        projeto_id: number,
        tecnologia_id: number
    }[],

}
