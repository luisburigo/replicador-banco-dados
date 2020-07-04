import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('direcao')
class Direcao extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'host_origem'})
    hostOrigem: string;

    @Column('varchar', {name: 'user_origem'})
    userOrigem: string;

    @Column('varchar', {name: 'password_origem'})
    passwordOrigem: string;

    @Column('varchar', {name: 'host_destino'})
    hostDestino: string;

    @Column('varchar', {name: 'user_destino'})
    userDestino: string;

    @Column('varchar', {name: 'password_destino'})
    passwordDestino: string;

    @Column('boolean', {name: 'active'})
    active: boolean;

    @Column('integer', {name: 'code_proccess'})
    codeProccess: number;

}

export {Direcao}

