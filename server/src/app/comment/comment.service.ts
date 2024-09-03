import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PaginationOptions } from "src/common/pagination/pagination.interface";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  create(
    userId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentRepository.save({
      ...createCommentDto,
      userId,
      cardId,
    });
  }

  findAll(
    cardId: number,
    { skip, take }: PaginationOptions,
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { cardId },
      order: { id: "DESC" },
      skip,
      take,
    });
  }

  findOne(cardId: number, id: number): Promise<Comment | null> {
    return this.findByCardIdAndId(cardId, id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<void> {
    await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async findByCardIdAndId(cardId: number, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({
      id,
      cardId,
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    return comment;
  }
}
