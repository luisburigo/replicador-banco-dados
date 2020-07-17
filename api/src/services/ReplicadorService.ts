import {Processo} from "../models/Processo";
import {Connection} from "typeorm";
import {ConnectionFactory} from "../models/Direcao";
import {Tabela} from "../models/Tabela";

class ReplicadorService {

    private connectionFactory: ConnectionFactory;
    private connectionOrigem: Connection;
    private connectionDestino: Connection;

    constructor(
        private processo: Processo
    ) {
        this.connectionFactory = ConnectionFactory.create(this.processo.direcao);
    }

    async iniciarReplicao() {
        console.log('buscanco tabelas')
        const tabelas = await Tabela.find({
            where: {
                processo: this.processo
            },
            order: {
                ordem: "ASC"
            }
        });
        console.log('buscou tabelas')

        console.log('criando conexao')
        await this.createConnectionOrigem();
        await this.createConnectionDestino();
        console.log('criou tabelas')

        const tabela = tabelas[4];
        const queryRunnerOrigem = this.connectionOrigem.createQueryRunner();
        const querySelect = `SELECT * FROM ${tabela.nomeOrigem}`;

        const rows = await queryRunnerOrigem.query(querySelect);

        for (const row of rows) {
            console.log(row)
            const colunas = Object.keys(row);
            let values = Object.values(row);
            values = values.map((value) => {
                if (value instanceof Buffer) {
                    return value[0] == 1;
                }

                if (typeof value == 'string') {
                    return `'${value}'`;
                }

                if (value == null) {
                    return 'null';
                }

                return value
            })
            let queryInsert = `INSERT INTO ${tabela.nomeDestino} `;

            queryInsert += `(${colunas.join(',')}) `;
            queryInsert += `VALUES (${values.join(',')});`;

            const queryRunnerDestino = this.connectionDestino.createQueryRunner();
            await queryRunnerDestino.query(queryInsert);
        }
    }

    private async createConnectionOrigem() {
        this.connectionOrigem = await this.connectionFactory.createConnectionOrigem();
    }

    private async createConnectionDestino() {
        this.connectionDestino = await this.connectionFactory.createConnectionDestino();
    }

}

export default ReplicadorService;
