import * as React from 'react'
import { TableProps } from './table.props';

export class Table extends React.Component<TableProps, {}> {

  public render(): React.ReactElement<TableProps> {
    const { columns, data, loading } = this.props;

    return (
      <section className="table">

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
              data.map( (item, i) => <tr key={i}>
                { 
                  columns.map( 
                    (c, j) => <td key={`${i}${j}`} >{item[c.accessor]}</td> 
                  ) 
                }
              </tr> )
            }
          </tbody>
        </table>

      </section>
    )
  }
}