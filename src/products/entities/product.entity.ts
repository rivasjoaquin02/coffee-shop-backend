import { Report } from '../../reports/entities/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum ProductType {
  food = 'food',
  drink = 'drink',
  raw = 'raw',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'float', default: 0.0 })
  discount: number;

  @Column({ type: 'int', default: 0 })
  stars: number;

  @Column({ type: 'int', default: 0 })
  people: number;

  @Column('date', { name: 'created_at', default: new Date() })
  createdAt: number;

  @OneToMany(() => Report, (report) => report.product)
  report: Report[];
}
