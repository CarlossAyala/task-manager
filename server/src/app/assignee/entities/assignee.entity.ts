import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from "src/app/card/entities/card.entity";
import { Member } from "src/app/member/entities/member.entity";

@Entity()
export class Assignee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.assignees)
  @JoinColumn({ name: "cardId" })
  card: Card;

  @Column({ nullable: false })
  cardId: number;

  @ManyToOne(() => Member, (member) => member.cards)
  @JoinColumn({ name: "memberId" })
  member: Member;

  @Column({ nullable: false })
  memberId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
