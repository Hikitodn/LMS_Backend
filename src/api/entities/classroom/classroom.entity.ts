import {
  BaseEntity,
  BeforeInsert,
  Column,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Enrollment } from "./enrollment.entity";
import { ClassroomStatus } from "@utils/instance";
import { nanoid } from "nanoid";

export class Classroom extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ enum: ClassroomStatus, default: "open" })
  status: ClassroomStatus;

  @Column()
  isPublic: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
  public enrollment: Enrollment[];

  @BeforeInsert()
  generateCustomId() {
    this.id = nanoid(12);
  }
}
