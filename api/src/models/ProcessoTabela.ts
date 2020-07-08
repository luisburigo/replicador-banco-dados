import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

class ProcessoTabela extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {name: 'code_proccess'})
  codeProccess: string;

  @Column('varchar', {name: 'origin_table'})
  originTable: string;

  @Column('varchar', {name: 'destiny_table'})
  destinyTable: string;

  @Column('number', {name: 'order'})
  order: number;

  @Column('boolean', {name: 'active'})
  active: boolean;

}

export {ProcessoTabela}
