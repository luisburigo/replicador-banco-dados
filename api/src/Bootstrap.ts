import {createConnection, getConnection} from "typeorm"
import {config} from "dotenv"
import {resolve} from "path"

class Bootstrap {

    static async init() {
        Bootstrap.initEnvVars();
        await Bootstrap.initDb();
        return await Bootstrap.initMigration();
    }

    static initEnvVars() {
        config({
            path: resolve(__dirname, '..', '.env')
        });
    }

    static initDb() {
        return createConnection({
            type: "sqlite",
            database: __dirname + '/../.data/database_dev.sqlite',
            entities: [
                __dirname + "/models/*{.ts,.js}"
            ],
            migrations: [__dirname + '/migrations/*.js'],
            synchronize: true
        })
    }

    static async initMigration() {
        console.log('[Migrations] Init')
        const connection = getConnection();
        await connection.runMigrations();
    }
}

export {
    Bootstrap
}
