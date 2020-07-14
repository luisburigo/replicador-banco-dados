import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Tabela} from "./Tabela";

@Entity('tabelas_log')
class TabelaLog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'descricao'})
    descricao: string;

    @Column('datetime', {name: 'data'})
    data: Date;

    @JoinColumn({name: "fk_tabelalog_tabela"})
    @ManyToOne(type => Tabela)
    tabela: Tabela;

}

export {TabelaLog};
