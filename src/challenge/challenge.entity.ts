import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class ChallengeEntity {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  title: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  img_path: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  langage: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  expected: string;

  @Column({
    type: "text",
    default: false,
  })
  description: string;
}
