import { z } from "zod";

const isNonEmptyString = (value: string | undefined) => value !== undefined && value.trim() !== '';

export const areaAtuacaoSchema = z.object({
    id: z.number().optional(),
    area_atuacao: z.string().refine(isNonEmptyString, {
        message: "O campo 'area Atuação' é obrigatório."
    })
 })