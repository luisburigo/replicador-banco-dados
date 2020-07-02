import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('model_teste')
class ModelTeste extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    nome: string;

}

export {ModelTeste}
