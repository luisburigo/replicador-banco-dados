import {createConnection} from "typeorm"
import {config} from "dotenv"
import {resolve} from "path"

class Bootstrap {

    static async init() {
        Bootstrap.initEnvVars();
        return  Bootstrap.initDb();
    }

    static initEnvVars() {
        config({
            path: resolve(__dirname, '..', '.env')
        });
    }

    static initDb() {
        return createConnection({
            type: "sqlite",
            database: __dirname + '/.data/database_dev.sqlite',
            entities: [
                __dirname + "/models/*{.ts,.js}"
            ],
            synchronize: true
        })
    }
}

export {
    Bootstrap
}
