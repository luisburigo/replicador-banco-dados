import {Processo} from "../models/Processo";
import {Connection} from "typeorm";
import {ConnectionFactory} from "../models/Direcao";
import {Tabela, ColunaChaveTipoEnum} from "../models/Tabela";
import { TabelaLog } from "../models/TabelaLog";

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

            await TabelaLog.createInfo(tabela, "Iniciando replicação...");
            console.log(`Inserindo dados na tabela ${tabela.nomeOrigem}.`);

            switch (colunaChaveTipo) {
                case ColunaChaveTipoEnum.INT:
                    let querySelectDestino = `SELECT MAX(${colunaChave}) FROM ${tabela.nomeDestino}`;
                    let rows  = await queryRunnerDestino.query(querySelectDestino);

                    let values = Object.values(rows[0]);
                    
                    if (values[0]) {
                        await TabelaLog.createInfo(tabela, `Inserindo dados na tabela de destino a partir do id ${values[0]}.` );

                        querySelectOrigem += ` WHERE ${tabela.colunaChave} > ${values[0]} `;
                    } else {
                        await TabelaLog.createInfo(tabela, "Primeira inserção na tabela." );
                    }
                    break;
                
                case ColunaChaveTipoEnum.UNDEFINED:
                    TabelaLog.createInfo(tabela, "Atualizando todos os registros.");

                    let queryDeleteDestino = `DELETE FROM ${tabela.nomeDestino}`;
                    
                    try {
                        await queryRunnerDestino.query(queryDeleteDestino);
                        await TabelaLog.createSucces(tabela, "Exclusão de registros na tabela de destino realizada com sucesso.")
                    }catch(e){
                        await await TabelaLog.createError(tabela, "Erro excluindo registros na tabela de destino.");
                    }

                    break;
                
                default:
                    break;
            }
            
            let newRows;
            
            try{
                newRows = await queryRunnerOrigem.query(querySelectOrigem);
                await TabelaLog.createSucces(tabela, "Busca de dados na tabela de origem realizada com sucesso.");
            }catch(e){
                await TabelaLog.createError(tabela, "Erro buscando dados na tabela de origem.");
            }
            
            if (!newRows.length){
                await TabelaLog.createSucces(tabela, "Não há dados para atualizar.");
            }

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

                await TabelaLog.createInfo(tabela, "Inserindo dados na tabela de origem.");
                try{
                    await queryRunnerDestino.query(queryInsert);
                    await TabelaLog.createSucces(tabela, "Sucesso ao inserir dados na tabela de destino.")
                }catch(e){
                    await TabelaLog.createError(tabela, "Erro inserindo dados na tabela de destino.");
                }
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
