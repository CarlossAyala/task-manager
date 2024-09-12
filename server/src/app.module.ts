import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouterModule } from "@nestjs/core";
import { BoardModule } from "./app/board/board.module";
import { UsersModule } from "./app/user/users.module";
import { CardModule } from "./app/card/card.module";
import { AuthModule } from "./app/auth/auth.module";
import { MemberModule } from "./app/member/member.module";
import { AssigneeModule } from "./app/assignee/assignee.module";
import { ListModule } from "./app/list/list.module";
import { CommentModule } from "./app/comment/comment.module";
import { ChecklistModule } from "./app/checklist/checklist.module";
import { BoardLabelModule } from "./app/board-label/board-label.module";
import { CardLabelModule } from "./app/card-label/card-label.module";
import { validate } from "./config/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `.env.${ENV}` : ".env",
      isGlobal: true,
      cache: true,
      expandVariables: false,
      validate,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "carlos",
      password: "carlos-123",
      database: "task-manager",
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      subscribers: [],
      migrations: [],
    }),
    UsersModule,
    AuthModule,
    BoardModule,
    ListModule,
    MemberModule,
    CardModule,
    AssigneeModule,
    CommentModule,
    ChecklistModule,
    BoardLabelModule,
    CardLabelModule,
    RouterModule.register([
      {
        path: "auth",
        module: AuthModule,
      },
      {
        path: "boards",
        module: BoardModule,
        children: [
          {
            path: ":boardId/lists",
            module: ListModule,
            children: [
              {
                path: ":listId/cards",
                module: CardModule,
                children: [
                  {
                    path: ":cardId/comments",
                    module: CommentModule,
                  },
                  {
                    path: ":cardId/checklists",
                    module: ChecklistModule,
                  },
                  {
                    path: ":cardId/assignees",
                    module: AssigneeModule,
                  },
                  {
                    path: ":cardId/labels",
                    module: CardLabelModule,
                  },
                ],
              },
            ],
          },
          {
            path: ":boardId/labels",
            module: BoardLabelModule,
          },
          {
            path: ":boardId/members",
            module: MemberModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
