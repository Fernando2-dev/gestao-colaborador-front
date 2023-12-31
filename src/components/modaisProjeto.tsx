
import { Projeto } from "@/interface/projeto";
import { ModalVisualizacaoProjeto } from "./modalVisualizacaoProjeto";
import { ModalExcluirProjeto } from "./modalExcluirProjeto";
import { ModalEdicaoProjeto } from "./modalEdicaoProjeto";


interface IModal {
    projeto: Projeto;
    profile: Perfil
    index: number
}

export const ModaisProjeto = ({ projeto, index, profile }: IModal) => {
    return (
        <div className="flex gap-2 items-center"> 
            <ModalVisualizacaoProjeto projeto={projeto} index={index} />
            <ModalEdicaoProjeto projeto={projeto}  />
            <ModalExcluirProjeto  projeto={projeto} profile={profile}/> 
        </div>
    )
}