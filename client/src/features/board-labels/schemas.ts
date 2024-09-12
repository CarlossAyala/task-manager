import { z } from "zod";
import { COLORS_NAME } from "@/shared/tailwind";
import { getEnumValues } from "@/shared/utils";

export const BoardLabelSchema = z.object({
	name: z.string().min(1).max(255),
	color: z.enum(getEnumValues(COLORS_NAME)),
});
