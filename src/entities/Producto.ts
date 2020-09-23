import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Producto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: number;

  @Column()
  sku: string;

  @Column()
  descripcion: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
