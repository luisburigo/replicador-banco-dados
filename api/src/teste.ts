import {Bootstrap} from "./Bootstrap";
import {Processo} from "./models/Processo";
import ReplicadorService from "./services/ReplicadorService";

async function init() {
    await Bootstrap.init();

    const processo = await Processo.findOne({
        where: {
            id: 1
        }
    })

    const replicadorService = new ReplicadorService(processo);
    await replicadorService.iniciarReplicao();
}


init();
