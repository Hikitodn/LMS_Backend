import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Enrollment } from "./enrollment.entity";
import { ClassroomStatus } from "@utils/instance";
import { nanoid } from "nanoid";
import { Document } from "./document.entity";
import { Examine } from "./examine.entity";
import { Assignment } from "./assignment.entity";
import { Question } from "./question.entity";
import { User } from "..";

@Entity("classroom")
export class Classroom extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  photo_path: string;

  @Column({ enum: ClassroomStatus, default: "opening" })
  status: ClassroomStatus;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
  public enrollments: Enrollment[];

  @ManyToOne(() => User, (user) => user.classrooms)
  user: User;

  @OneToMany(() => Document, (document) => document.classroom)
  documents: Document[];

  @OneToMany(() => Examine, (examine) => examine.classroom)
  examines: Examine[];

  @OneToMany(() => Assignment, (assignment) => assignment.classroom)
  assignments: Assignment[];

  @OneToMany(() => Question, (question) => question.classroom)
  questions: Question[];

  @BeforeInsert()
  generateId() {
    this.id = nanoid(7);
  }
}
