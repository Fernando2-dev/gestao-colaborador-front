import { z } from "zod";

const isNonEmptyString = (value: string | undefined) => value !== undefined && value.trim() !== '';

export const ColaboradorSchema = z.object({
    id: z.number().optional(),
    nome: z.string().refine(isNonEmptyString, {
        message: "O campo 'nome' é obrigatório."
    }),
    email: z.string().refine(isNonEmptyString, {
        message: "O campo 'email' é obrigatório."
    }),
    idade: z.string().refine(isNonEmptyString, {
        message: "O campo 'idade' é obrigatório."
    }),
    senha: z.string().refine(isNonEmptyString, {
        message: "O campo 'senha' é obrigatório."
    }),
    regime_contratacao: z.enum(['CLT', 'PJ']).refine((value) => value !== undefined, {
        message: "O campo 'regime_contratacao' é obrigatório."
    }),
    role: z.enum(['MEMBRO', 'GESTOR']).refine((value) => value !== undefined, {
        message: "O campo 'role' é obrigatório."
    })
});
export const ColaboradorSchemaUpgrade = z.object({
    nome: z.string(),
    email: z.string(),
    idade: z.string(),
    regime_contratacao: z.enum(['CLT', 'PJ']),
    senha: z.string(),
    role: z.enum(['MEMBRO', 'GESTOR']),
});
