import { Colaborador } from "@/interface/colaborador";
import { ModalVisualizacaoColaborador } from "./modalVisuaizacaoColaborador";
import { ModalEdicaoColaborador } from "./modalEdicaoColaborador";
import { ModalExcluirColaborador } from "./modalExcluirColaborador";


interface IModal {
    colaborador: Colaborador;
    profile: Perfil
    index: number
}

export const ModaisColaborador = ({ colaborador, index, profile }: IModal) => {
    return (
        <div className="flex gap-2 items-center"> 
            <ModalVisualizacaoColaborador colaborador={colaborador} index={index} profile={profile}/>
            <ModalEdicaoColaborador colaborador={colaborador} index={index} profile={profile}/>
            <ModalExcluirColaborador colaborador={colaborador} index={index} profile={profile}/>
        </div>
    )
}