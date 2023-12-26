
export interface Projeto {
    id: string,
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


