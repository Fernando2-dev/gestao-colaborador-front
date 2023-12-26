import { Colaborador } from "@/interface/colaborador";
import { ModalVisualizacaoColaborador } from "./modalVisuaizacaoColaborador";
import { ModalEdicaoColaborador } from "./modalEdicaoColaborador";
import { ModalExcluirColaborador } from "./modalExcluirColaborador";


interface IModal {
    colaborador: Colaborador;
    index: number
}

export const ModaisColaborador = ({ colaborador, index }: IModal) => {
    return (
        <div className="flex gap-2 items-center"> 
            <ModalVisualizacaoColaborador colaborador={colaborador} index={index} key={colaborador.id}/>
            <ModalEdicaoColaborador colaborador={colaborador} index={index} key={colaborador.id}/>
            <ModalExcluirColaborador colaborador={colaborador} index={index} key={colaborador.id}/>
        </div>
    )
}