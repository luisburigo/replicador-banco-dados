import {Processo} from "../models/Processo";
import ReplicadorService from "./ReplicadorService";
import SocketService from "./SocketService";

const resolveTimeout = () => new Promise(resolve => setTimeout(() => {
    resolve();
}, 5000))

class ProcessoScheduler {
    private active: boolean = true;
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
                console.log('[ProcessoScheduler] Processo esperando tempo de ', this.processo.tempoExecucao)
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
                console.log('[ProcessoScheduler] Processo inicado')
                const replicadorService = new ReplicadorService(this.processo);
                await replicadorService.iniciarReplicao();
                SocketService.emitAllSockets('processo:wait', `Aguardando o tempo de ${this.processo.tempoExecucao / 60 / 1000} minutos para executar novamente...`);         
                console.log('[ProcessoScheduler] Processo finalizou')
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
        const processoScheduler = new ProcessoScheduler(processo);
        this.processos.set(processo.id, processoScheduler);
        processoScheduler.run();
    }

    cancelarProcesso(processo: Processo) {
        const processoScheduler = this.processos.get(processo.id);
        processoScheduler.disable();
        this.processos.delete(processo.id);
    }

}

export default ProcessoService;
