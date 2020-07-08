import api from "./api";

export interface Direcao {
    id: number;
    hostOrigem: string;
    passwordOrigem: string;
    hostDestino: string;
    userDestino: string;
    passwordDestino: string;
    active: boolean;
    codeProccess: number;
}

export const DIRECAO_KEY = 'DIRECAO_KEY';

class DirecaoService {

    static getAll() {
        return api.get<Direcao[]>("direcao")
    }

    static setInLocalStorage(direcao: Direcao) {
        localStorage.setItem(DIRECAO_KEY, String(direcao.id));
    }

    static getDirecaoInLocalStorage() {
        return localStorage.getItem(DIRECAO_KEY);
    }

}

export default DirecaoService;
