import { Exclude, Expose } from "class-transformer";
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Member } from "src/app/member/entities/member.entity";
import { Comment } from "src/app/comment/entities/comment.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  get initials(): string {
    return this.fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .map((char) => char.toUpperCase())
      .join("");
  }

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Member, (member) => member.user)
  public boards: Member[];

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[];
}
