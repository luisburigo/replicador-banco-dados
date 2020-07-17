import {Socket} from "socket.io";
import {TabelaLog} from "../models/TabelaLog";

export const PROCESSO_EVENT_NAME = 'processo';

class SocketService {
    private sockets: Socket[] = [];

    setSocket(socket: Socket) {
        console.log(`[SocketService] Connected ${socket.id}`);
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
