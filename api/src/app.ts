import {Request, Response} from "express";

const bodyParser = require("body-parser");
const cors = require("cors");

import * as http from "http";
import * as express from "express"
import * as socket from "socket.io";
import {Bootstrap} from "./Bootstrap";

import direcaoRoutes from "./routes/direcao.routes";
import processoRoutes from "./routes/processo.routes";
import {ApplicationContext} from "./ApplicationContext";

class App {

    private app: express.Application;
    private server: http.Server;
    private io: socket.Server;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    async init() {
        await Bootstrap.init();
        this.initSocket()
        this.initRoutes();
        this.initMiddlewares();

        const port = process.env.APP_PORT || 8000;
        this.server.listen(port, () => console.log(`Project running in: http://localhost:${port}`))
    }

    private initRoutes() {
        this.app.use('/direcao', direcaoRoutes);
        this.app.use('/processos', processoRoutes);
    }

    private initSocket() {
        this.server = http.createServer(this.app);
        this.io = socket(this.server);

        this.io.on('connection', (socket) => {
            ApplicationContext.setSocket(socket);
            console.log('[Socket] Socket connected: ' + socket.id);

            socket.on('disconnect', () => {
                ApplicationContext.removeSocket(socket);
                console.log('[Socket] Socket disconnected: ' + socket.id);
            });
        })

        setInterval(() => {

            ApplicationContext.sockets.forEach((socket) => {

                socket.emit('processo/1', "Processo 1 rodando")

            });

        }, 3000)
    }

    private initMiddlewares() {
        this.app.use((err, req: Request, res: Response, next) => {
            if (err) {
                return res.json({
                    message: err.message
                })
            }
        })
    }
}

export {App}
