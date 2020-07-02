import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('direcao')
class Direcao extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column('host_origem')
    hostOrigem: string;

    @Column('user_origem')
    userOrigem: string;

    @Column('password_origem')
    passwordOrigem: string;

    @Column('host_origem')
    hostDestino: string;

    @Column('user_origem')
    userDestino: string;

    @Column('password_origem')
    passwordDestino: string;

    @Column()
    active: Boolean;

    @Column('code_proccess')
    codeProccess: Number

}

export {Direcao}
