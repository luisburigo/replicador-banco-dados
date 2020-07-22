import {MigrationInterface, QueryRunner} from "typeorm";
import {Processo} from "../models/Processo";
import {Tabela, ColunaChaveTipoEnum} from "../models/Tabela";

/*
* - States
* - Cities
* - Graduation
* - Modalities
* - User
* - Periods
* - Student
* - Modalities Periods
* - Modality Users
* - Modality Students
* - Payment
* */


export class Tabela1594741844394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const processoMain = await Processo.findOne({where: {id: 1}});

        const tabelas = [
            new Tabela({
                processo: processoMain,
                nomeOrigem: "states",
                nomeDestino: "states",
                ordem: 1,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "cities",
                nomeDestino: "cities",
                ordem: 2,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "modalities",
                nomeDestino: "modalities",
                ordem: 3,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),

            new Tabela({
                processo: processoMain,
                nomeOrigem: "graduations",
                nomeDestino: "graduations",
                ordem: 4,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "users",
                nomeDestino: "users",
                ordem: 5,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "periods",
                nomeDestino: "periods",
                ordem: 6,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "students",
                nomeDestino: "students",
                ordem: 7,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "modalities_periods",
                nomeDestino: "modalities_periods",
                ordem: 8,
                ativo: true,
                colunaChave: "period_id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "modality_users",
                nomeDestino: "modality_users",
                ordem: 9,
                ativo: true,
                colunaChave: null,
                colunaChaveTipo: ColunaChaveTipoEnum.UNDEFINED,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "modality_students",
                nomeDestino: "modality_students",
                ordem: 10,
                ativo: true,
                colunaChave: null,
                colunaChaveTipo: ColunaChaveTipoEnum.UNDEFINED,
            }),
            new Tabela({
                processo: processoMain,
                nomeOrigem: "payments",
                nomeDestino: "payments",
                ordem: 11,
                ativo: true,
                colunaChave: "id",
                colunaChaveTipo: ColunaChaveTipoEnum.INT,
            }),
        ]

        for (let tabela of tabelas) {
            await tabela.save();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
