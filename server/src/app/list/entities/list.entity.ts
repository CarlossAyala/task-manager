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
import { Card } from "src/app/card/entities/card.entity";
import { Board } from "src/app/board/entities/board.entity";
import { Colors } from "src/common/colors/colors.enum";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  order: number;

  @Column({
    type: "enum",
    enum: Colors,
  })
  color: string;

  @ManyToOne(() => Board, (board) => board.lists)
  @JoinColumn({ name: "boardId" })
  board: Board;

  @Column({ nullable: false })
  boardId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];
}
