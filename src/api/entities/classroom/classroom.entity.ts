import { BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Enrollment } from "./enrollment.entity";

export class Classroom extends BaseEntity {
  @PrimaryColumn()
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

  @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
  public enrollment: Enrollment[];
}
