import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('processos')
class Processos extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: Number;

  @Column('proccess')
  processo: String;

  @Column('description')
  descricao: String;

  @Column()
  active: Boolean;
}

export {Processos}