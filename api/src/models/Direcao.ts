import {BaseEntity, Column, createConnection, Entity, PrimaryGeneratedColumn, getConnection, Connection} from "typeorm";

class ConnectionFactory {

    private direcao: Direcao;

    constructor(direcao: Direcao) {
        this.direcao = direcao;
    }

    static create(direcao: Direcao) {
        return new ConnectionFactory(direcao);
    }

    async createConnectionOrigem() {
        const databaseConfig = this.direcao.origem;
        return await this.getConnection(databaseConfig, 'origem');
    }

    async createConnectionDestino() {
        const databaseConfig = this.direcao.destino;
        return await this.getConnection(databaseConfig, 'destino');
    }

    private async getConnection(databaseConfig: DatabaseConfig, name: string) {
        let connection: Connection = null;

        try {
            connection = getConnection(name);
            console.log(`[ConnectionFactory] Get ${name}`);
        } catch(e) {
            // silent
        }

        if(!connection) {
            console.log(`[ConnectionFactory] Create ${name}`);
            connection = await createConnection({
                type: "mysql",
                host: databaseConfig.host,
                port: databaseConfig.port,
                username: databaseConfig.username,
                password: databaseConfig.password,
                database: databaseConfig.databaseName,
                name
            });
        }

        return connection;
    }

}

class DatabaseConfig {
    @Column('varchar', {name: 'host'})
    host: string;

    @Column('integer', {name: 'port'})
    port: number;

    @Column('varchar', {name: 'database_name'})
    databaseName: string;

    @Column('varchar', {name: 'user_name'})
    username: string;

    @Column('varchar', {name: 'password'})
    password: string;

    get hostFormated() {
        return `${this.host}:${this.port}/${this.databaseName}`
    }
}

@Entity('direcoes')
class Direcao extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(type => DatabaseConfig)
    origem: DatabaseConfig;

    @Column(type => DatabaseConfig)
    destino: DatabaseConfig;

    @Column('boolean', {name: 'ativo', default: true})
    ativo: boolean = true;

}

export {Direcao, DatabaseConfig, ConnectionFactory}

