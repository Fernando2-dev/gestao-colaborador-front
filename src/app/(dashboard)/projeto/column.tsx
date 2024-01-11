'use client'
import { ModaisProjeto } from "@/components/modaisProjeto";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Projeto } from "@/interface/projeto";
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Projeto>[] = [
    {
        header: "Nome",
        accessorKey: "nome",

    },
    {
        header: "Prazo",
        accessorKey: "prazo"
    },
    {
        header: "Descrição",
        accessorKey: "descricao"
    },
    {
        header: "Tecnologia",
        accessorKey: "projetoTecnologias",
        cell: ({ row }) => {
            const projeto = row.original
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-500 text-white" form="setting">Projetos</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Projetos</DialogHeader>
                        {projeto.projetoTecnologias?.map((tec) => (
                            <div key={tec.id_tecnologia?.id}>
                                <div className="p-3 border border-emerald-300 rounded-lg">
                                    {tec.id_tecnologia?.nome_tecnologia}
                                </div>
                            </div>
                        ))}
                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        header: "Colaborador",
        accessorKey: "ColaboradorProjeto",
        cell: ({ row }) => {
            const projeto = row.original;
            return (
                <Dialog>
                    <DialogTrigger asChild >
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-violet-400 text-black" form="setting">Áreas</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Area de Atuação</DialogHeader>
                        {projeto.ColaboradorProjeto?.map((colaborador) => (
                            <div key={colaborador.id_colaborador?.id}>
                                <div className="p-3 border border-emerald-300 rounded-lg">{colaborador.id_colaborador.nome}</div>
                            </div>
                        ))}
                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        header: "Ação",
        cell: ({ row }) => {
            const projeto = row.original;
            return (
                    <ModaisProjeto projeto={projeto} />
            )
        }

    }

]