import {MigrationInterface, QueryRunner} from "typeorm";
import {Processo} from "../models/Processo";
import {Direcao} from "../models/Direcao";

export class Processo1594684451091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const direcao = await Direcao.findOne({where: {id: 1}});

        const processoMain = new Processo();
        processoMain.descricao = "Processo main"
        processoMain.direcao = direcao;
        processoMain.tempoExecucao = 15 * 60;
        await processoMain.save();

        const processoCopiarEndereco = new Processo();
        processoCopiarEndereco.descricao = "Copiar Endereços"
        processoCopiarEndereco.direcao = direcao;
        processoCopiarEndereco.tempoExecucao = 24 * 60 * 60;
        await processoCopiarEndereco.save();

        const processoCopiarPagamento = new Processo();
        processoCopiarPagamento.descricao = "Copiar Pagamentos"
        processoCopiarPagamento.direcao = direcao;
        processoCopiarPagamento.tempoExecucao = 1 * 60 * 60;
        await processoCopiarPagamento.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
