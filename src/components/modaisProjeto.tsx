
import { Projeto } from "@/interface/projeto";
import { ModalVisualizacaoProjeto } from "./modalVisualizacaoProjeto";


interface IModal {
    projeto: Projeto;
    index: number
}

export const ModaisProjeto = ({ projeto, index }: IModal) => {
    return (
        <div className="flex gap-2 items-center"> 
            <ModalVisualizacaoProjeto projeto={projeto} index={index} key={projeto.id}/>
            {/* <ModalEdicaoProjeto projeto={projeto} index={index} key={projeto.id}/>
            <ModalExcluirProjeto projeto={projeto} index={index} key={projeto.id}/> */}
        </div>
    )
}