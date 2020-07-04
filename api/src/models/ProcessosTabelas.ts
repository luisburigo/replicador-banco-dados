import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

class ProcessosTabelas extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: Number;

  @Column('code_proccess')
  codeProccess: String;

  @Column('origin_table')
  originTable: String;

  @Column('destiny_table')
  destinyTable: String;

  @Column('order')
  order: Number;

  @Column()
  active: Boolean;

}

export {ProcessosTabelas}