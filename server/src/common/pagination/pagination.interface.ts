export interface PaginationOptions {
  page: number;
  skip: number;
  take: number;
}

export interface PaginationResponse<T> {
  rows: T[];
  count: number;
  pages: number;
  nextPage: number;
  hasNextPage: boolean;
}
