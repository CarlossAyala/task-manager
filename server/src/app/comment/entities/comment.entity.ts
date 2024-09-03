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
import { User } from "src/app/user/entities/user.entity";
import { Expose } from "class-transformer";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Expose()
  get isEdited(): boolean {
    return this.updatedAt > this.createdAt;
  }

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => Card, (card) => card.comments)
  @JoinColumn({ name: "cardId" })
  card: Card;

  @Column({ nullable: false })
  cardId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
