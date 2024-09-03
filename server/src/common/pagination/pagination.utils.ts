const DEFAULT_PAGE = 1;
const DEFAULT_TAKE = 10;
const TAKES_OPTIONS = new Array(10).fill(0).map((_, i) => (i + 1) * 10);

export const validatePage = (page: number): number => {
  const validations = [
    !Number.isNaN(page),
    Number.isInteger(page),
    Number.isSafeInteger(page),
    page > DEFAULT_PAGE,
  ];

  const isValid = validations.every((validation) => validation);

  if (!isValid) {
    return DEFAULT_PAGE;
  }

  return page;
};
export const validateTake = (take: number): number => {
  return TAKES_OPTIONS.includes(take) ? take : DEFAULT_TAKE;
};
export const calculateSkip = (page: number, take: number): number => {
  return (page - 1) * take;
};
