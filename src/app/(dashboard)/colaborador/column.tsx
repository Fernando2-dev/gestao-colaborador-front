'use client'
import { ModaisColaborador } from "@/components/modaisColaborador";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Colaborador } from "@/interface/colaborador";
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Colaborador>[] = [
    {
        header: "Nome",
        accessorKey: "nome",

    },
    {
        header: "Email",
        accessorKey: "email"
    },
    {
        header: "Regime Contratação",
        accessorKey: "regime_contratacao"
    },
    {
        header: "Role",
        accessorKey: "role"
    },
    {
        header: "Area",
        accessorKey: "areasAtuacaoColaborador",
        cell: ({ row }) => {
            const colaborado = row.original;
            return (
                <Dialog>
                    <DialogTrigger asChild >
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border border-violet-400 text-black" form="setting">Áreas</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Area de Atuação</DialogHeader>
                        {colaborado.areasAtuacaoColaborador?.map((area) => (
                            <div key={area.id_area_atuacao?.id}>
                                <div className="p-3 border border-emerald-300 rounded-lg">{area.id_area_atuacao?.area_atuacao}</div>
                            </div>
                        ))}
                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        header: "Projeto",
        accessorKey: "ColaboradorProjeto",
        cell: ({ row }) => {
            const colaborado = row.original
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <button type="submit" className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm bg-violet-500 text-white" form="setting">Projetos</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-semibold">Projetos</DialogHeader>
                        {colaborado.ColaboradorProjeto?.map((area) => (
                            <div key={area.id_projeto?.id}>
                                <div className="p-3 border border-emerald-300 rounded-lg">
                                    {area.id_projeto?.nome}
                                </div>
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
            const colaborado = row.original;
            return (
                    <ModaisColaborador colaborador={colaborado} />
            )
        }

    }

]