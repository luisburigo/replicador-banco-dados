import {Processo} from "../models/Processo";
import ReplicadorService from "./ReplicadorService";
import {rejects} from "assert";

class ProcessoScheduler {
    private active: boolean;
    private timeoutId: NodeJS.Timeout;

    constructor(
        private processo: Processo
    ) {
    }

    async run() {
        clearTimeout(this.timeoutId);
        if (this.active) {
            try {
                await this.runReplicador();
                this.timeoutId = setTimeout(() => this.run(), this.processo.tempoExecucao);
            } catch (e) {
                this.disable();
            }
        }
    }

    disable() {
        this.active = false;
    }

    private runReplicador() {
        return new Promise((async (resolve, reject) => {
            try {
                const replicadorService = new ReplicadorService(this.processo);
                await replicadorService.iniciarReplicao();
                resolve();
            } catch (e) {
                reject(e);
            }
        }))
    }
}

class ProcessoService {

    private processos: Map<number, ProcessoScheduler> = new Map();

    iniciarProcesso(processo: Processo) {
        this.processos.set(processo.id, new ProcessoScheduler(processo))
    }

    cancelarProcesso(processo: Processo) {
        const processoScheduler = this.processos.get(processo.id);
        processoScheduler.disable();
        this.processos.delete(processo.id);
    }

}

export default ProcessoService;
