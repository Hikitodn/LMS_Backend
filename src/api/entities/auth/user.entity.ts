import { UserRole } from "@utils/instance";
import env from "src/config/env";
import bcrypt from "bcryptjs";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./profile.entity";
import { Enrollment } from "..";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: ["insert"] })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  public enrollment: Enrollment[];

  @BeforeInsert()
  async cryptPassword() {
    const saltRounds = env.nodeEnv === "development" ? 1 : 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }
}
