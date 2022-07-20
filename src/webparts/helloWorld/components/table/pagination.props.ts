
export interface IPaginationProps {
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}