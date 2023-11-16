import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Document } from "./classroom/document.entity";
import { Assignment } from "./classroom/assignment.entity";
import { Profile } from "./auth/profile.entity";

@Entity("file_upload")
export class FileUpload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Document, (document) => document.file_upload, {
    nullable: true,
  })
  document: Document;

  @ManyToOne(() => Assignment, (assignment) => assignment.file_upload, {
    nullable: true,
  })
  assignment: Assignment;

  @ManyToOne(() => Profile, (profile) => profile.file_upload, {
    nullable: true,
  })
  profile: Profile;
}
