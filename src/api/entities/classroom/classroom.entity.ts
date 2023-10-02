import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @Column()
  status: boolean;

  @Column()
  isPublic: boolean;
}
