'use client'
import { colaboradorRequest } from "@/service/Colaborador/colaborador";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

interface PerfilContextProviderProps {
    children: ReactNode;
}

interface PerfilContextProps {
    profile: Perfil | undefined;
}

export const PerfilContext = createContext({} as PerfilContextProps);

const PerfilContextProvider = ({ children }: PerfilContextProviderProps) => {
    const [profile, setProfile] = useState<Perfil | undefined>(undefined);
    const session = useSession()

    useEffect(() => {
        const read = async () => {
            const profile = await colaboradorRequest.readProfile(session.data?.user.token);
            setProfile(profile);
        };
        read();
    }, [session.data?.user.token]);

    const perfil: PerfilContextProps = { profile };

    return (
        <PerfilContext.Provider value={perfil}>
            {children}
        </PerfilContext.Provider>
    );
};

export default PerfilContextProvider;
