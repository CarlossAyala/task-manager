import { BG_COLORS, COLORS_NAME, TEXT_COLORS } from "./tailwind.constants";

export const getBgColor = (
	name: keyof typeof COLORS_NAME,
	tone: keyof (typeof BG_COLORS)[(typeof COLORS_NAME)[keyof typeof COLORS_NAME]] = "600",
) => {
	return BG_COLORS[name][tone];
};

export const getTextColor = (
	name: keyof typeof COLORS_NAME,
	tone: keyof (typeof TEXT_COLORS)[(typeof COLORS_NAME)[keyof typeof COLORS_NAME]] = "900",
) => {
	return COLORS_NAME[name][tone];
};
