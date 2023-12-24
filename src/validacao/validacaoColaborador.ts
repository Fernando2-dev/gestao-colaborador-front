import { z } from "zod"

const ProjetoSchema = z.object({
    id: z.number(),
    nome: z.string(),
    prazo: z.string(),
    descricao: z.string(),
});

const AreaAtuacaoSchema = z.object({
    id: z.number(),
    area_atuacao: z.string(),
});

export type AreaAtuacao = z.infer<typeof AreaAtuacaoSchema>;
export type Projeto = z.infer<typeof ProjetoSchema>;

export const ColaboradorSchema = z.object({
    nome:
        z.string()
            .transform(nome => {
                return nome.trim().split(' ')
                    .map(palavra => {
                        const primeiraLetra = palavra[0].toLocaleUpperCase();
                        const outrasLetras = palavra.substring(1).toLocaleLowerCase();
                        return primeiraLetra + outrasLetras;
                    }).join(' ')
            })
    ,
    email: z.string(),
    idade: z.string(),
    senha: z.string(),
    regime_contratacao: z.enum(['CLT', 'PJ']),
    role:
        z.enum(['MEMBRO', 'GESTOR']),

    areaColaborador:
        z.array(
            z.object({
                colaborador_id: z.number(),
                areaAtuacao_id: z.number(),
                id_area_atuacao: AreaAtuacaoSchema
            })
        ).optional(),
    projetoColaborador:
        z.array(
            z.object({
                colaborador_id: z.number(),
                projeto_id: z.number(),
                id_projeto: ProjetoSchema
            })
        ).optional(),
})