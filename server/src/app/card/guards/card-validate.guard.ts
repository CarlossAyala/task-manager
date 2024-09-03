import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CardService } from "../card.service";

@Injectable()
export class CardValidateGuard implements CanActivate {
  constructor(private readonly cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const listId = request.list.id;
    const cardId = request.params.cardId;

    const card = await this.cardService.findByListIdAndId(listId, cardId);

    request.card = card;

    return true;
  }
}
