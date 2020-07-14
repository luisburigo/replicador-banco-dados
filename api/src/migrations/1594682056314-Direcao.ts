import {MigrationInterface, QueryRunner} from "typeorm";
import {DatabaseConfig, Direcao} from "../models/Direcao";

export class Direcao1594682056314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const databaseConfigOrigem = new DatabaseConfig();
        databaseConfigOrigem.databaseName = 'academy';
        databaseConfigOrigem.password = '';
        databaseConfigOrigem.port = 3306;
        databaseConfigOrigem.host = 'localhost';
        databaseConfigOrigem.username = 'root'

        const databaseConfigDestino = new DatabaseConfig();
        databaseConfigDestino.databaseName = 'academy_replicacao';
        databaseConfigDestino.password = '';
        databaseConfigDestino.port = 3306;
        databaseConfigDestino.host = 'localhost';
        databaseConfigDestino.username = 'root'

        const direcao = new Direcao();
        direcao.origem = databaseConfigOrigem;
        direcao.destino = databaseConfigDestino;

        try {
            console.log('[Migration Direcao] Running')
            await direcao.save();
            console.log('[Migration Direcao] Success')
        } catch (e) {
            console.log('[Migration Direcao] Error')
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
