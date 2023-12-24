import { AreaAtuacao, Projeto } from "@/validacao/validacaoColaborador"

export interface Colaborador {
    id: number,
    nome: string,
    email: string
    senha: string
    idade: string
    role: string
    regime_contratacao: string
    areasAtuacaoColaborador?: {
        colaborador_id: number;
        areaAtuacao_id: number;
        id_area_atuacao: AreaAtuacao;
    }[],
    ColaboradorProjeto?: {
        colaborador_id: number;
        projeto_id: number;
        id_projeto: Projeto;
    }[]
}
export interface ColaboradorCreateInput {
    nome: string,
    email: string
    senha: string
    idade: string
    role: string
    regime_contratacao: string
    areasAtuacaoColaborador?: {
        colaborador_id: number;
        areaAtuacao_id: number;
        id_area_atuacao: AreaAtuacao;
    }[],
    ColaboradorProjeto?: {
        colaborador_id: number;
        projeto_id: number;
        id_projeto: Projeto;
    }[]
}