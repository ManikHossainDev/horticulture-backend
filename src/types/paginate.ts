export interface PaginateOptions {
  limit?: number;
  page?: number;
  sortBy?: string;
  populate?: any; // Adjust if you need specific populate types
}

export interface PaginateResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
