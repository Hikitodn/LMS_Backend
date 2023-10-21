import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity("answer")
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
