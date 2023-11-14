import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./classroom.entity";
import { FileUpload } from "../file_upload.entity";

@Entity("document")
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => FileUpload, (file_upload) => file_upload.document, {
    nullable: true,
  })
  file_upload: FileUpload[];

  @ManyToOne(() => Classroom, (classroom) => classroom.documents)
  classroom: Classroom;
}
