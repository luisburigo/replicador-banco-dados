import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import {Processo} from "./Processo";

export enum ColunaChaveTipoEnum {
    INT = "INT",
    STRING = "STRING",
    DATE = "DATE",
    DATETIME = "DATETIME",
    BOOLEAN = "BOOLEAN",
    UNDEFINED = "UNDEFINED"
}

interface ITabela {
    id?: number;

    nomeOrigem: string;

    nomeDestino: string;

    ordem: number;

    ativo: boolean;

    colunaChave: string;

    colunaChaveTipo: string;

    processo: Processo;
}

@Entity('tabelas')
class Tabela extends BaseEntity {

    constructor(tabela?: ITabela) {
        super();
        if (tabela) {
            Object.assign(this, tabela);
        }
    }

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

    @Column('varchar', {name: 'coluna_chave', nullable: true})
    colunaChave: string;

    @Column('varchar', {name: 'coluna_chave_tipo'})
    colunaChaveTipo: string;

    @JoinColumn({name: "fk_tabela_processo"})
    @ManyToOne(type => Processo, {eager: true})
    processo: Processo;

}

export {Tabela};
