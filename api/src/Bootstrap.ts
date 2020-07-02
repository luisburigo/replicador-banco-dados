import {createConnection} from "typeorm"
import {config} from "dotenv"
import {resolve} from "path"

class Bootstrap {

    static async init() {
        Bootstrap.initEnvVars();
        await Bootstrap.initDb();
    }

    static initEnvVars() {
        config({
            path: resolve(__dirname, '..', '.env')
        });
    }

    static async initDb() {
        return await createConnection({
            name: 'default',
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
