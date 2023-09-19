import { UserRole } from "@utils/instance";
import env from "src/config/env";
import bcrypt from "bcryptjs";
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @UpdateDateColumn()
  updated_at: Date;

  @AfterLoad()
  async load() {}

  @BeforeInsert()
  async cryptPassword() {
    const saltRounds = env.nodeEnv === "development" ? 1 : 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }
}
