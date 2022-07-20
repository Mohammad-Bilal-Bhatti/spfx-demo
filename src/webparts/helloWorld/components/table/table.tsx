import * as React from 'react'
import { Pagination } from './pagination';
import { ITableProps } from './table.props';

export class Table extends React.Component<ITableProps, {}> {

  public onItemSelected(item: unknown, index: number): void {
    if (this.props.onItemSelectedCB) this.props.onItemSelectedCB(item, index);
  }

  public render(): React.ReactElement<ITableProps> {
    const { columns, data, loading, showPagination, currentPage, totalPages, onPageChangeCB, hasNextPage, onNextPageCB } = this.props;

    return (
      <div className="table">

        <table>
          <thead>
            <tr>
              {
                columns.map(
                  (c, i) => <th key={i}>{c.label}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              loading ?
              <div>Loading...</div>
              :
              data.map( (item, i) => <tr key={i} onClick={() => this.onItemSelected(item, i)}>
                { 
                  columns.map( 
                    (c, j) => <td key={`${i}${j}`} >{item[c.accessor]}</td> 
                  ) 
                }
              </tr> )
            }
          </tbody>          
        </table>
        {
          hasNextPage &&
          <button 
            onClick={() => onNextPageCB()}
          >
            Show More
          </button>
        }
        {
          showPagination && 
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChangeCB}
          />
        }

      </div>
    )
  }
}