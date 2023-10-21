import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./classroom.entity";

@Entity("assignment")
export class Assignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.assignments)
  classroom: Classroom;
}
