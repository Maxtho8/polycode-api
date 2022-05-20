import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column({
    type: "varchar",
    nullable: false,
    unique: true,
  })
  username: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  password: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  email: string;

  @Column({
    type: "boolean",
    default: false,
  })
  verified: boolean;
  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
