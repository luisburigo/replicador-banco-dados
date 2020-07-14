import {Request, Response} from "express";
import {Direcao} from "../models/Direcao";
import {routeErrorHandler} from "../helpers/routeErrorHandler";
import {Processo} from "../models/Processo";

class ProcessoController {

    async getByDirecao(req: Request, res: Response) {
        const direcaoId = req.header('DIRECAO_ID');

        const direcao = await Direcao.findOne({where: {id: Number(direcaoId)}});

        if (!direcao) {
            return routeErrorHandler(res, "Direção invalida")
        }

        const processos = await Processo.find({where: {direcao}});

        return res.json(processos);
    }

}

export default new ProcessoController();
