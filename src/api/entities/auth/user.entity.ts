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
  PrimaryColumn,
} from "typeorm";
import { Profile } from "./profile.entity";
import { Enrollment } from "..";
import { nanoid } from "nanoid";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryColumn()
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
  public enrollments: Enrollment[];

  @BeforeInsert()
  async cryptPassword() {
    const saltRounds = env.nodeEnv === "development" ? 1 : 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }

  generateId() {
    this.id = nanoid();
  }
}
