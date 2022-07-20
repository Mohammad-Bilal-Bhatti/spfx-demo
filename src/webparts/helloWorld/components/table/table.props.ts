
export interface IColumn {
  label: string,
  accessor: string,
}


export interface ITableProps {
  columns: IColumn[],
  data: unknown[],
  loading: boolean,
  hasNextPage?: boolean,
  onNextPageCB?: () => void,
  showPagination?: boolean,
  totalPages?: number,
  currentPage?: number,
  onPageChangeCB?: (selectedPage: number) => void,
  onItemSelectedCB?: (item: unknown, index: number) => void,
  removeItemAt?: (i: number) => void,
}
