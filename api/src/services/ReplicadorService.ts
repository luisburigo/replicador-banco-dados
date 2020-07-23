import {Processo} from "../models/Processo";
import {Connection} from "typeorm";
import {ConnectionFactory} from "../models/Direcao";
import {Tabela, ColunaChaveTipoEnum} from "../models/Tabela";

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
        console.log('buscando tabelas');
        const tabelas = await Tabela.find({
            where: {
                processo: this.processo
            },
            order: {
                ordem: "ASC"
            }
        });
        console.log('buscou tabelas');

        console.log('criando conexao');
        await this.createConnectionOrigem();
        await this.createConnectionDestino();
        console.log('criou tabelas');

        const queryRunnerOrigem = this.connectionOrigem.createQueryRunner();
        const queryRunnerDestino = this.connectionDestino.createQueryRunner();
        
        console.log('Iniciando replicação...');        

        for (const tabela of tabelas) {
            let colunaChave = tabela.colunaChave;
            let colunaChaveTipo = tabela.colunaChaveTipo;
            let querySelectOrigem = `SELECT * FROM ${tabela.nomeOrigem}`;
            
            console.log(`Inserindo dados na tabela ${tabela.nomeOrigem}`);

            switch (colunaChaveTipo) {
                case ColunaChaveTipoEnum.INT:
                    let querySelectDestino = `SELECT MAX(${colunaChave}) FROM ${tabela.nomeDestino}`;
                    let rows  = await queryRunnerDestino.query(querySelectDestino);

                    let values = Object.values(rows[0]);
                    
                    if (values[0]) {
                        console.log("tabela já possuía registros.");                        
                        querySelectOrigem += ` WHERE ${tabela.colunaChave} > ${values[0]} `;
                    }
                    break;
                
                case ColunaChaveTipoEnum.UNDEFINED:
                    let queryDeleteDestino = `DELETE FROM ${tabela.nomeDestino}`;
                    await queryRunnerDestino.query(queryDeleteDestino);
                    break;
                
                default:
                    break;
            }
            let newRows = await queryRunnerOrigem.query(querySelectOrigem);

            for (const row of newRows) {
                
                let colunas = Object.keys(row);
                let values = Object.values(row);

                values = values.map((value) => {
                    if (value instanceof Buffer) {
                        return value[0] == 1;
                    }
    
                    if (typeof value == 'string') {
                        return `'${value}'`;
                    }

                    if (value instanceof Date){
                        return `'${value.toISOString().substring(0,10)}'`;
                    }
    
                    if (value == null) {
                        return 'null';
                    }
    
                    return value
                });
                let queryInsert = `INSERT INTO ${tabela.nomeDestino} `;
    
                queryInsert += `(${colunas.join(',')}) `;
                queryInsert += `VALUES (${values.join(',')});`;

                await queryRunnerDestino.query(queryInsert);
            }
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
