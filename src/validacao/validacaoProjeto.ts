import { z } from "zod";

export const ProjetoSchema = z.object({
    id: z.number(),
    nome: z.string(),
    prazo: z.string(),
    descricao: z.string(),
    ColaboradorProjeto: z.array(z.object({
        colaborador_id: z.number(),
        projeto_id: z.number(),
        id_colaborador: z.object({
            id: z.number(),
            nome: z.string()
        })
    })).optional(),
    projetoTecnologias: z.array(z.object({
        tecnologia_id: z.number(),
        projeto_id: z.number(),
        id_tecnologia: z.object({
            id: z.number(),
            nome_tecnologia: z.string()
        })
    })).optional()
});
