
import { Projeto } from "@/interface/projeto";
import { ModalVisualizacaoProjeto } from "./modalVisualizacaoProjeto";
import { ModalExcluirProjeto } from "./modalExcluirProjeto";
import { ModalEdicaoProjeto } from "./modalEdicaoProjeto";


interface IModal {
    projeto: Projeto;
}

export const ModaisProjeto = ({ projeto }: IModal) => {
    return (
        <div className="flex gap-2 items-center justify-center"> 
            <ModalVisualizacaoProjeto projeto={projeto} />
            <ModalEdicaoProjeto projeto={projeto}  />
            <ModalExcluirProjeto  projeto={projeto} /> 
        </div>
    )
}