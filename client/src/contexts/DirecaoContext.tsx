import React, {createContext, useEffect, useState} from "react";
import DirecaoService from "../services/DirecaoService";
import ProcessoService, {Processo} from "../services/ProcessoService";

interface IDirecaoContext {
    processos: Processo[];

    getProcessos(direcaoId: number): Promise<any>;
}

export const DirecaoContext = createContext<IDirecaoContext>({
    processos: [],
    async getProcessos(direcaoId: number) {
    }
});

export const DirecaoProvider: React.FC = ({children}) => {
    const [processos, setProcessos] = useState<Processo[]>([]);

    useEffect(() => {
        const direcaoId = DirecaoService.getDirecaoInLocalStorage();

        if (direcaoId) {
            getProcessos(Number(direcaoId))
        }
    }, []);

    async function getProcessos(direcaoId: number): Promise<any> {
        const {data} = await ProcessoService.getByDirecao(direcaoId);
        setProcessos(data);
    }

    return (
        <DirecaoContext.Provider value={{processos, getProcessos}}>
            {children}
        </DirecaoContext.Provider>
    )
}
