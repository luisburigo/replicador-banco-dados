import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import {Tabela} from "./Tabela";
import {SaveOptions} from "typeorm/repository/SaveOptions";
import SocketService from "../services/SocketService";

@Entity('tabelas_log')
class TabelaLog extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'descricao'})
    descricao: string;

    @Column('datetime', {name: 'data'})
    data: Date;

    @JoinColumn({name: "fk_tabelalog_tabela"})
    @ManyToOne(type => Tabela, {eager: true})
    tabela: Tabela;

    async save(options?: SaveOptions) {
        const log = await super.save(options);
        SocketService.emitLogEvent(log);
        return log;
    };

}

export {TabelaLog};
