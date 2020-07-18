import {Bootstrap} from "./Bootstrap";
import {Processo} from "./models/Processo";
import ReplicadorService from "./services/ReplicadorService";
import ProcessoService from "./services/ProcessoService";

async function init() {
    await Bootstrap.init();

    const processo = await Processo.findOne({
        where: {
            id: 400
        }
    })

    console.log(processo)

  /*  const processoService = new ProcessoService();
    processoService.iniciarProcesso(processo);*/
}


init();
