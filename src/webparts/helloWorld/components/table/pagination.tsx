import * as React from "react";
import { IPaginationProps } from "./pagination.props";

export class Pagination extends React.Component<IPaginationProps> {


  public constructor(props: IPaginationProps) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  public onPageChange(selectedPage: number): void {
    if (this.props.currentPage === selectedPage) return;
    this.props.onPageChange(selectedPage);
  }

  private _firstPage(): React.ReactElement {
    const { currentPage } = this.props;
    return (
      <button 
        style={{ marginRight: '2px', backgroundColor: currentPage === 1 ? '#888': '', color: currentPage === 1 ? '#FFF': '' }} 
        onClick={() => this.onPageChange(1)} 
      > First 
      </button>
    )
  }

  private _lastPage(): React.ReactElement {
    const { currentPage, totalPages } = this.props;
    return (
      <button 
        style={{ marginRight: '2px', backgroundColor: currentPage === totalPages ? '#888': '', color: currentPage === totalPages ? '#FFF': '' }} 
        onClick={() => this.onPageChange(this.props.totalPages)}
      > Last 
      </button>)
  }


  public render(): React.ReactElement<IPaginationProps> {
    const { currentPage, totalPages } = this.props;

    const pages: unknown[] = [];

    if (totalPages > 1) pages.push(this._firstPage());

    for (let i: number = 1 ; i <= totalPages ; i++) {
      pages.push(
        <button
          style={{ marginRight: '2px', backgroundColor: currentPage === i ? '#888': '', color: currentPage === i ? '#FFF': '' }}
          onClick={() => this.onPageChange(i)}> {i} 
        </button>
      )
    }
    
    if (totalPages > 1) pages.push(this._lastPage());


    return (
    <div className="table-pagination">
      { pages.length > 1 && pages }
    </div>);
  }

}