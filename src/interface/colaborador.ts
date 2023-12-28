export interface Colaborador {
    id: number;
    nome: string;
    email: string;
    senha: string | null;
    idade: string;
    role: "MEMBRO" | "GESTOR";
    regime_contratacao: "CLT" | "PJ";
    areasAtuacaoColaborador?: Array<{
        colaborador_id: number;
        areaAtuacao_id: number;
        id_area_atuacao?: {
            id: number;
            area_atuacao: string;
        };
    }>;
    ColaboradorProjeto?: Array<{
        colaborador_id: number;
        projeto_id: number;
        id_projeto?: {
            id: number;
            nome: string;
            prazo: string;
            descricao: string;
        };
    }>;
}
export interface ColaboradorUpgrade {
    id: number;
    nome: string;
    email: string;
    idade: string;
    role: "MEMBRO" | "GESTOR";
    regime_contratacao: "CLT" | "PJ";
    areasAtuacaoColaborador?: Array<{
        colaborador_id: number;
        areaAtuacao_id: number;
    }>;
    ColaboradorProjeto?: Array<{
        colaborador_id: number;
        projeto_id: number;
    }>;
}

export interface ColaboradorAreaAtuacao {
    areasAtuacaoColaborador:
    {
        areaAtuacao_id: number,
        colaborador_id: number
    }[],

}
