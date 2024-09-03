import { Card } from "src/app/card/entities/card.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: false,
  })
  isChecked: boolean;

  @Column()
  order: number;

  @ManyToOne(() => Card, (card) => card.checklists)
  @JoinColumn({ name: "cardId" })
  card: Card;

  @Column({ nullable: false })
  cardId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
