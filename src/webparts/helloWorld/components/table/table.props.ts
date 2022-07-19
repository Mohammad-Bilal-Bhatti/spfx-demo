
export interface Column {
  label: string,
  accessor: string,
}


export interface TableProps {
  columns: Column[],
  data: unknown[],
  loading: boolean,
}
