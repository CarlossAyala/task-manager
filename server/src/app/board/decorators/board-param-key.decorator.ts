import { Reflector } from "@nestjs/core";

export const BoardParamKey = Reflector.createDecorator<string>();
