import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum QsType {
  complaint = 'complaint',
  suggestion = 'suggestion',
}

@Entity()
export class QS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  desc: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ type: 'enum', enum: QsType })
  type: QsType;
}
