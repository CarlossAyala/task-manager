import { BG_COLORS, COLOR_NAMES, TEXT_COLORS } from "./tailwind.constants";

export const getBgColor = (
	name: keyof typeof COLOR_NAMES,
	tone: keyof (typeof BG_COLORS)[(typeof COLOR_NAMES)[keyof typeof COLOR_NAMES]] = "600",
) => {
	return BG_COLORS[name][tone];
};

export const getTextColor = (
	name: keyof typeof COLOR_NAMES,
	tone: keyof (typeof TEXT_COLORS)[(typeof COLOR_NAMES)[keyof typeof COLOR_NAMES]] = "900",
) => {
	return COLOR_NAMES[name][tone];
};
