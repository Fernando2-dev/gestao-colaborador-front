import { z } from "zod";

const isNonEmptyString = (value: string | undefined) => value !== undefined && value.trim() !== '';

export const tecnologiaSchema = z.object({
    id: z.number().optional(),
    nome_tecnologia: z.string().refine(isNonEmptyString, {
        message: "O campo 'tecnologia' é obrigatório."
    })
 })