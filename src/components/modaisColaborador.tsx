import { Colaborador } from "@/interface/colaborador";
import { ModalVisualizacaoColaborador } from "./modalVisuaizacaoColaborador";
import { ModalEdicaoColaborador } from "./modalEdicaoColaborador";
import { ModalExcluirColaborador } from "./modalExcluirColaborador";


interface IModal {
    colaborador: Colaborador;
}

export const ModaisColaborador = ({ colaborador}: IModal) => {
    return (
        <div className="flex gap-2 items-center justify-center"> 
            <ModalVisualizacaoColaborador colaborador={colaborador} />
            <ModalEdicaoColaborador colaborador={colaborador} />
            <ModalExcluirColaborador colaborador={colaborador} />
        </div>
    )
}