import { UserRole } from "@utils/instance";
import { IsEmail, Min, Max } from "class-validator";
import env from "src/config/env";
import bcrypt from "bcryptjs";
import {
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
  id: number;

  @Column({ unique: true })
  @Max(254)
  @IsEmail()
  email: string;

  @Column()
  @Min(8)
  @Max(20)
  password: string;

  @Column()
  @Min(5)
  @Max(20)
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

  @BeforeInsert()
  async cryptPassword() {
    const saltRounds = env.nodeEnv === "development" ? 1 : 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }
}
