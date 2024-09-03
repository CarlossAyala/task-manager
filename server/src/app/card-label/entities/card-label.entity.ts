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
import { BoardLabel } from "src/app/board-label/entities/board-label.entity";

@Entity()
export class CardLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.labels)
  @JoinColumn({ name: "cardId" })
  card: Card;

  @Column({ nullable: false })
  cardId: number;

  @ManyToOne(() => BoardLabel, (boardLabel) => boardLabel.cards)
  @JoinColumn({ name: "labelId" })
  label: BoardLabel;

  @Column({ nullable: false })
  labelId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
