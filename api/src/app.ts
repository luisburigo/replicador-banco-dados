import {Request, Response} from "express";

const bodyParser = require("body-parser");
const cors = require("cors");

import * as express from "express"
import {Bootstrap} from "./Bootstrap";
import direcaoRoutes from "./routes/direcao.routes";

class App {

    private express: express.Application;

    constructor() {
        this.express = express();

        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));
    }

    async init() {
        await Bootstrap.init();
        this.initRoutes();
        this.initMiddlewares();

        const port = process.env.APP_PORT || 8000;
        this.express.listen(port, () => console.log(`Project running in: http://localhost:${port}`))
    }

    private initRoutes() {
        this.express.use('/direcao', direcaoRoutes);
    }

    private initMiddlewares() {
        this.express.use((err, req: Request, res: Response, next) => {
            if (err) {
                return res.json({
                    message: err.message
                })
            }
        })
    }
}

export {App}
