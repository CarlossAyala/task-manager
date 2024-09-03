import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "src/app/user/entities/user.entity";
import { Board } from "../../board/entities/board.entity";
import { MemberRole } from "../enums/member.enum";
import { Assignee } from "src/app/assignee/entities/assignee.entity";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.members)
  @JoinColumn({ name: "boardId" })
  board: Board;

  @Column({ nullable: false })
  boardId: number;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column({
    type: "enum",
    enum: MemberRole,
    default: MemberRole.Member,
  })
  role: MemberRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Assignee, (assignee) => assignee.member)
  public cards: Assignee[];
}
