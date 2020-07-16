import {Socket} from "socket.io";

export class ApplicationContext {
    static sockets: Socket[] = [];

    static setSocket(socket: Socket) {
        this.sockets.push(socket);
    }

    static removeSocket(socket: Socket) {
        this.sockets = this.sockets.filter(_socket => _socket.id == socket.id);
    }
}
