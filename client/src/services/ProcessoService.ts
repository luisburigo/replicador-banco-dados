import api from "./api";

export interface Processo {
    id: number;
    descricao: string
}

class ProcessoService {
    static getByDirecao(direcaoId: number) {
        return api.get<Processo[]>("processos", {
            headers: {
                DIRECAO_ID: direcaoId
            }
        })
    }
}

export default ProcessoService;
