import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./answer.entity";
import { Classroom } from "./classroom.entity";

@Entity("question")
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  point: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.questions)
  classroom: Classroom;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
