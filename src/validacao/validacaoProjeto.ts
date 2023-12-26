import { z } from "zod";

const isNonEmptyString = (value: string | undefined) => value !== undefined && value.trim() !== '';

export const ProjetoSchema = z.object({
    nome: z.string().refine(isNonEmptyString, {
        message: "O campo 'nome' é obrigatório e não pode estar vazio."
    }),
    prazo: z.string().refine(isNonEmptyString, {
        message: "O campo 'prazo' é obrigatório e não pode estar vazio."
    }),
    descricao: z.string().refine(isNonEmptyString, {
        message: "O campo 'descricao' é obrigatório e não pode estar vazio."
    }),
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
