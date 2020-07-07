import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

class Execucao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar2', {name: 'code_proccess'})
  codeProccess: string;

  @Column('datetime', {name: 'initial_date'})
  initialDate: Date;

  @Column('datetime', {name: 'final_date'})
  finalDate: Date;

  @Column('varchar2', {name: 'origin'})
  origin: string;

  @Column('varchar2', {name: 'destiny'})
  destiny: string;

  @Column('boolean', {name: 'success'})
  success: boolean;

  @Column('boolean', {name: 'active'})
  active: boolean;
}

export {Execucao}