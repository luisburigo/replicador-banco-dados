import {Request, Response} from "express";

const bodyParser = require("body-parser");
const cors = require("cors");

import * as express from "express"
import {todoRouter} from "./routes/TodoRoutes";
import {userRouter} from "./routes/UserRoutes";
import {Bootstrap} from "./Bootstrap";

class App {

    private express: express.Application;

    constructor() {
        this.express = express();

        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));
    }

    init() {
        Bootstrap.init();
        this.initRoutes();
        this.initMiddlewares();

        this.express.listen(process.env.APP_PORT || 8000, () => console.log('Listening'))
    }

    private initRoutes() {
        this.express.use('/todo', todoRouter);
        this.express.use('/user', userRouter);
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
