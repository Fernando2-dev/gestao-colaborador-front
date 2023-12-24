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
}

export const MensagemContext = createContext({} as MensagemContextProps)

export const MensagemContextProvider = ({children} : MensagemContextProviderProps ) => {

  const Sucesso = (text: string) => {
    toast.success(text, {
      theme:"light",
      position: toast.POSITION.BOTTOM_LEFT
    })
  }

  const Error = (text:string) => {
    toast.error(text, {
      theme: "light",
      position: toast.POSITION.BOTTOM_LEFT
    })
  }

  
 return(
  <MensagemContext.Provider 
  value={{
    Sucesso,
    Error,  
    }}>
    {children}
  </MensagemContext.Provider>
 )
}