import api from "./api";

interface DirecaoDatabase {
    host: string,
    port: number,
    databaseName: string,
    username: string,
    password: string,
}

export interface Direcao {
    id: number;
    origem: DirecaoDatabase,
    destino: DirecaoDatabase,
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
