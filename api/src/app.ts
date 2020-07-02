import {Request, Response} from "express";

const bodyParser = require("body-parser");
const cors = require("cors");

import * as express from "express"
import {Bootstrap} from "./Bootstrap";
import {ModelTeste} from "./models/ModelTeste";

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

        this.express.listen(process.env.APP_PORT || 8000, () => console.log('Listening'))
    }

    private initRoutes() {
        this.express.get('/', async (_, res) => {

            console.log('asd')

            let modelTeste = new ModelTeste;
            modelTeste.nome = 'testando';
            await modelTeste.save();

            modelTeste = new ModelTeste;
            modelTeste.nome = 'teste 2';
            await modelTeste.save();

            let examples = await ModelTeste.find();

            res.json(examples);

        });
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
