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
import { Colors } from "src/common/colors/colors.enum";
import { Board } from "src/app/board/entities/board.entity";
import { CardLabel } from "src/app/card-label/entities/card-label.entity";

@Entity()
export class BoardLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Colors,
  })
  color: string;

  @ManyToOne(() => Board, (board) => board.labels)
  @JoinColumn({ name: "boardId" })
  board: Board;

  @Column({ nullable: false })
  boardId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CardLabel, (label) => label.label)
  public cards: CardLabel[];
}
