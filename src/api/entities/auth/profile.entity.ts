import { GenderType } from "@utils/instance";
import {
  BaseEntity,
  // BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("profile")
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  photo_path: string;

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

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
