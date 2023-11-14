import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./classroom.entity";

@Entity("examine")
export class Examine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.examines)
  classroom: Classroom;
}
