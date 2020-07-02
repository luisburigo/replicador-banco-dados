import {Request, Response} from "express";
import {Direcao} from "../models/Direcao";
import {getRepository, Repository} from "typeorm";

class DirecaoController {

    async create(req: Request, res: Response) {
        const repository = getRepository(Direcao);
        let direcao = req.body as Direcao;
        direcao = await repository.save(direcao);

        return res.status(200)
            .json({
                message: 'Cadastrado com sucesso!',
                content: direcao
            })
    }

    async getAll(req: Request, res: Response) {
        const repository = getRepository(Direcao);
        return res.status(200)
            .json(await repository.find())
    }

}

export default new DirecaoController;
