import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./classroom.entity";

@Entity("document")
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: string;

  @Column()
  size: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.documents)
  classroom: Classroom;
}
