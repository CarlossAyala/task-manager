import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../user/users.module";
import { MemberService } from "./member.service";
import { MemberController } from "./member.controller";
import { Member } from "./entities/member.entity";
import { BoardModule } from "../board/board.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    UsersModule,
    forwardRef(() => BoardModule),
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
