import { GenderType } from "@utils/instance";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FileUpload } from "..";

@Entity("profile")
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "date" })
  date_of_birth: Date;

  @Column({ type: "enum", enum: GenderType })
  gender: GenderType;

  @Column({
    nullable: true,
  })
  bio: string;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => FileUpload, (file_upload) => file_upload.profile)
  photos: FileUpload[];
}
