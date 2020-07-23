import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import {Tabela} from "./Tabela";
import {SaveOptions} from "typeorm/repository/SaveOptions";
import SocketService from "../services/SocketService";

export enum LogType {
    SUCCESS,
    INFO,
    ERROR,
    WARNING
}

@Entity('tabelas_log')
class TabelaLog extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'descricao'})
    descricao: string;

    @Column('datetime', {name: 'data', default: new Date().toISOString().substring(0, 10)})
    data: Date;

    @Column('simple-enum', {name: 'type'})
    type: LogType;

    @JoinColumn({name: "fk_tabelalog_tabela"})
    @ManyToOne(type => Tabela, {eager: true})
    tabela: Tabela;

    static async createSucces(tabela: Tabela, message: string) {
        const tabelaLog = new TabelaLog();
        tabelaLog.descricao = message;
        tabelaLog.type = LogType.SUCCESS;
        tabelaLog.tabela = tabela;
        return await tabelaLog.save();
    }

    static async createError(tabela: Tabela, message) {
        const tabelaLog = new TabelaLog();
        tabelaLog.descricao = message;
        tabelaLog.type = LogType.ERROR;
        tabelaLog.tabela = tabela;
        return await tabelaLog.save();
    }

    static async createInfo(tabela: Tabela, message) {
        const tabelaLog = new TabelaLog();
        tabelaLog.descricao = message;
        tabelaLog.type = LogType.INFO;
        tabelaLog.tabela = tabela;
        return await tabelaLog.save();
    }

    static async createWarning(tabela: Tabela, message) {
        const tabelaLog = new TabelaLog();
        tabelaLog.descricao = message;
        tabelaLog.type = LogType.WARNING;
        tabelaLog.tabela = tabela;
        return await tabelaLog.save();
    }

    async save(options?: SaveOptions) {
        const log = await super.save(options);
        SocketService.emitLogEvent(log);
        return log;
    };

}

export {TabelaLog};
