export class PaginationResponse {
  constructor(pagination: PaginationResponse) {
    Object.assign(this, pagination);
  }

  public total: number = 0;

  public pageIndex: number = 1;

  public pageSize: number = 10;
}
