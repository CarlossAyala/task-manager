import { BadRequestException } from "@nestjs/common";

export const validateEntityId = (id: string) => {
  const entityId = +id;

  if (Number.isNaN(entityId) || entityId <= 0 || !Number.isInteger(entityId)) {
    throw new BadRequestException("Invalid entity id");
  }

  return entityId;
};
