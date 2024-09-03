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
import { Assignee } from "src/app/assignee/entities/assignee.entity";
import { List } from "src/app/list/entities/list.entity";
import { Comment } from "src/app/comment/entities/comment.entity";
import { Checklist } from "src/app/checklist/entities/checklist.entity";
import { CardLabel } from "src/app/card-label/entities/card-label.entity";

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  dueDate: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  reminderDate: Date;

  @ManyToOne(() => List, (list) => list.cards)
  @JoinColumn({ name: "listId" })
  list: List;

  @Column({ nullable: false })
  listId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Assignee, (assignee) => assignee.card)
  public assignees: Assignee[];

  @OneToMany(() => Comment, (comment) => comment.card)
  public comments: Comment[];

  @OneToMany(() => Checklist, (checklist) => checklist.card)
  public checklists: Checklist[];

  @OneToMany(() => CardLabel, (label) => label.card)
  public labels: CardLabel[];
}
