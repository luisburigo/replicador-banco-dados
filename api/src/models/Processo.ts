import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Direcao} from "./Direcao";

@Entity('processos')
class Processo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'descricao'})
    descricao: string;

    @Column('int', {name: 'tempo_execucao'})
    tempoExecucao: number;

    @Column('boolean', {name: 'ativo', default: true})
    ativo: boolean = true;

    @JoinColumn({name: "fk_processo_direcao"})
    @ManyToOne(type => Direcao, {eager: true})
    direcao: Direcao;

}

export {Processo};
