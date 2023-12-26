import { z } from "zod";

export const ColaboradorSchema = z.object({
    nome: z.string(),
    email: z.string(),
    idade: z.string(),
    senha: z.string(),
    regime_contratacao: z.enum(['CLT', 'PJ']),
    role: z.enum(['MEMBRO', 'GESTOR']),
    areaColaborador: z.array(
        z.object({
            colaborador_id: z.number(),
            areaAtuacao_id: z.number(),
            id_area_atuacao:
                z.object({
                    id: z.number(),
                    area_atuacao: z.string()
                })
        })
    ).optional(),
    projetoColaborador: z.array(
        z.object({
            colaborador_id: z.number(),
            projeto_id: z.number(),
            id_projeto: z.object({
                id: z.number(),
                nome: z.string(),
                prazo: z.string(),
                descricao: z.string(),
            })
        })
    ).optional(),
});
export const ColaboradorSchemaUpgrade = z.object({
    nome: z.string(),
    email: z.string(),
    idade: z.string(),
    regime_contratacao: z.enum(['CLT', 'PJ']),
    role: z.enum(['MEMBRO', 'GESTOR']),
    areaColaborador: z.array(
        z.object({
            colaborador_id: z.number(),
            areaAtuacao_id: z.number(),
        })
    ),
    projetoColaborador: z.array(
        z.object({
            colaborador_id: z.number(),
            projeto_id: z.number(),
        })
    ),
});
