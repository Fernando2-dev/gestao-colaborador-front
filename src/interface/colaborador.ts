export interface Colaborador {
    id: number,
    nome: string,
    email: string
    senha: string
    idade: string
    role: string
    regime_contratacao: string
    areasAtuacaoColaborador?: [
        {
            colaborador_id: number,
            areaAtuacao_id: number,
            id_area_atuacao: {
                id: number,
                area_atuacao: string
            }
        }
    ],
    ColaboradorProjeto?: [
        {
            colaborador_id: number,
            projeto_id: number,
            id_projeto: {
                id: number,
                nome: string,
                prazo: string,
                descricao: string
            }
        }
    ]
}