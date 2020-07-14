import {MigrationInterface, QueryRunner} from "typeorm";
import { Processo } from "../models/Processo";
import { Tabela } from "../models/Tabela";

export class Tabela1594741844394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const processoCopiarUsuarios = await Processo.findOne({where: {id: 1}});
        const processoCopiarEnderecos = await Processo.findOne({where: {id: 2}});
        const processoCopiarPagamentos = await Processo.findOne({where: {id: 3}});

        const tabelaUsuarios = new Tabela();
        tabelaUsuarios.processo = processoCopiarUsuarios;
        tabelaUsuarios.nomeOrigem = "users";
        tabelaUsuarios.nomeDestino = "users";
        tabelaUsuarios.ordem = 1;
        tabelaUsuarios.ativo = true;
        tabelaUsuarios.colunaChave = "id";
        tabelaUsuarios.colunaChaveTipo = "int";
        await tabelaUsuarios.save();

        const tabelaEnderecoStates = new Tabela();
        tabelaEnderecoStates.processo = processoCopiarEnderecos;
        tabelaEnderecoStates.nomeOrigem = "states";
        tabelaEnderecoStates.nomeDestino = "states";
        tabelaEnderecoStates.ordem = 1;
        tabelaEnderecoStates.ativo = true;
        tabelaEnderecoStates.colunaChave = "id";
        tabelaEnderecoStates.colunaChaveTipo = "int";
        await tabelaEnderecoStates.save();

        const tabelaEnderecoCities = new Tabela();
        tabelaEnderecoCities.processo = processoCopiarEnderecos;
        tabelaEnderecoCities.nomeOrigem = "cities";
        tabelaEnderecoCities.nomeDestino = "cities";
        tabelaEnderecoCities.ordem = 2;
        tabelaEnderecoCities.ativo = true;
        tabelaEnderecoCities.colunaChave = "id";
        tabelaEnderecoCities.colunaChaveTipo = "int";
        await tabelaEnderecoCities.save();

        const tabelaEnderecoPayments = new Tabela();
        tabelaEnderecoPayments.processo = processoCopiarPagamentos;
        tabelaEnderecoPayments.nomeOrigem = "payments";
        tabelaEnderecoPayments.nomeDestino = "payments";
        tabelaEnderecoPayments.ordem = 1;
        tabelaEnderecoPayments.ativo = true;
        tabelaEnderecoPayments.colunaChave = "id";
        tabelaEnderecoPayments.colunaChaveTipo = "int";
        await tabelaEnderecoPayments.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
