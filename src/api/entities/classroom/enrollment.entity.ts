import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom, User } from "..";

@Entity("enrollment")
export class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public student_id: string;

  @Column()
  public classroom_id: string;

  @Column({ default: false })
  isAccept: boolean;

  @ManyToOne(() => User)
  public user: User;

  @ManyToOne(() => Classroom)
  public classroom: Classroom;
}
