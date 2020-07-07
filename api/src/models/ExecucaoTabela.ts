import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

class ExecucaoTabela extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number', {name: 'code_execution'})
  codeExecution: number;

  @Column('datetime', {name: 'initial_date'})
  initialDate: Date;

  @Column('datetime', {name: 'final_date'})
  finalDate: Date;

  @Column('number', {name: 'lines'})
  lines: number;

  @Column('varchar2', {name: 'message'})
  message: string;

  @Column('boolean', {name: 'success'})
  success: boolean;

  @Column('boolean', {name: 'active'})
  active: boolean;
}

export {ExecucaoTabela};