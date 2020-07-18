import {Socket} from "socket.io";
import {TabelaLog} from "../models/TabelaLog";
import {Processo} from "../models/Processo";
import ProcessoService from "./ProcessoService";

export const PROCESSO_EVENT_NAME = 'processo';

class SocketService {
    private sockets: Socket[] = [];
    private processoService: ProcessoService = new ProcessoService();

    registerSocket(socket: Socket) {
        console.log(`[SocketService] Connected ${socket.id}`);
        socket.on('processo:run', async (id: number) => {
            console.log(`[SocketService] Processo fired ${id}`);
            try {
                const processo = await Processo.findOne({where: {id}});

                console.log(processo)

                if (!processo) {
                    throw new Error("Processo não existe")
                }

                this.processoService.iniciarProcesso(processo);
            } catch (e) {
                socket.emit('processo:error', e)
            }
        })
        socket.on('processo:cancel', async (id: number) => {
            const processo = await Processo.findOne({where: {id}});
            this.processoService.cancelarProcesso(processo);
        })
        this.sockets.push(socket);
    }

    removeSocket(socket: Socket) {
        console.log(`[SocketService] Disconnected ${socket.id}`);
        this.sockets = this.sockets.filter(_socket => _socket.id == socket.id);
    }

    emitAllSockets(eventName: string, message: any) {
        this.sockets.forEach(socket => {
            socket.emit(eventName, message);
        })
    }

    emitLogEvent(log: TabelaLog) {
        const processo = log.tabela.processo;
        const eventName = `${PROCESSO_EVENT_NAME}/${processo.id}`;
        console.log(`[SocketService] Emitting ${eventName}`);
        this.emitAllSockets(eventName, log);
    }
}

export default new SocketService;
