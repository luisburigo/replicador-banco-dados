import {connect} from "mongoose"
import {config} from "dotenv"
import {resolve} from "path"

class Bootstrap {

    static init() {
        Bootstrap.initEnvVars();
        Bootstrap.initDb();
    }

    static initEnvVars() {
        config({
            path: resolve(__dirname, '..', '.env')
        });
    }

    static async initDb() {
        const {DB_USER, DB_PASS, DB_HOST} = process.env;
        let host = DB_HOST;

        host = host.replace('<dbuser>', DB_USER);
        host = host.replace('<dbpassword>', DB_PASS);

        try {
            await connect(host, {
                useNewUrlParser: false
            })
        } catch (e) {
            console.warn(e)
        }
    }
}

export {
    Bootstrap
}
