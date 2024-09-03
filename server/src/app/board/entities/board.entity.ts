import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Member } from "../../member/entities/member.entity";
import { List } from "src/app/list/entities/list.entity";
import { BoardLabel } from "src/app/board-label/entities/board-label.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // TODO: Change to start date and end date
  @Column("timestamptz")
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => List, (list) => list.board)
  lists: List[];

  @OneToMany(() => Member, (member) => member.board, {
    cascade: true,
  })
  public members: Member[];

  @OneToMany(() => BoardLabel, (boardLabel) => boardLabel.board)
  public labels: BoardLabel[];
}
