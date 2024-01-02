'use client'
import { ReactNode, createContext } from "react";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface MensagemContextProviderProps{
 children : ReactNode
}

interface MensagemContextProps {
  Sucesso: (text: string) => void
  Error: (text: string) => void
  Aviso: (text: string) => void
}

export const MensagemContext = createContext({} as MensagemContextProps)

export const MensagemContextProvider = ({children} : MensagemContextProviderProps ) => {

  const Sucesso = (text: string) => {
    toast.success(text, {
      theme:"light",
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  const Error = (text:string) => {
    toast.error(text, {
      theme: "light",
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
  const Aviso = (text:string) => {
    toast.warning(text, {
      theme: "light",
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  
 return(
  <MensagemContext.Provider 
  value={{
    Sucesso,
    Error,  
    Aviso
    }}>
    {children}
  </MensagemContext.Provider>
 )
}