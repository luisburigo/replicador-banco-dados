import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import {Processo} from "./Processo";

@Entity('tabelas')
class Tabela extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'nome_origem'})
    nomeOrigem: string;

    @Column('varchar', {name: 'nome_destino'})
    nomeDestino: string;

    @Column('int', {name: 'ordem'})
    ordem: number;

    @Column('boolean', {name: 'ativo', default: true})
    ativo: boolean = true;

    @Column('varchar', {name: 'coluna_chave'})
    colunaChave: string;

    @Column('varchar', {name: 'coluna_chave_tipo'})
    colunaChaveTipo: string;

    @JoinColumn({name: "fk_tabela_processo"})
    @ManyToOne(type => Processo)
    processo: Processo;

}

export {Tabela};
