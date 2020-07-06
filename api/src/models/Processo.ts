import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('processos')
class Processo extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar2', {name: 'code_proccess'})
  codeProccess: string;

  @Column('varchar2', {name: 'description'})
  descricao: string;

  @Column('boolean', {name: 'active'})
  active: boolean;
}

export {Processo}