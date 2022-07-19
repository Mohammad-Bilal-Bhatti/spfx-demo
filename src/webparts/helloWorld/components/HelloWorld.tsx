import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps, IHelloWorldState } from './IHelloWorldInterface';
import { escape } from '@microsoft/sp-lodash-subset';
import { Table } from './table/table';
import ToolService from '../services/lists/tools/Tool.service';
import { getSP } from '../pnpConfig';
import { ITool } from '../services/lists/tools/ITool';


const columns = [
  { label: 'Id', accessor: 'Id' },
  { label: 'Title', accessor: 'Title' },
  { label: 'Description', accessor: 'Description' },
]

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

  private _toolServie: ToolService;

  public constructor(props: IHelloWorldProps) {
    super(props);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.state = {
      data: [],
      loading: false,
      error: undefined,
      selectedItem: undefined,
    };
    this._toolServie = new ToolService(getSP());
  }
  
  public componentDidMount(): void {
    this._fetchData();
  }

  public onItemSelected(item: ITool): void {
    console.log('[HelloWorld] onItemSelected was called with data: ', item);
    this.setState({ selectedItem: item })
  }

  private _fetchData(): void {
    console.log('[HelloWorld] _fetchData was called');

    this._toolServie.getAll()
      .then(data => { 
        this.setState({ data: data, loading: false }) 
      })
      .catch(error => {
        this.setState({ error: error, loading: false });
        console.error('error in _fetchData of HelloWorld Component', error)
      });
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const { data, loading, selectedItem } = this.state;

    return (
      <div className="container">
        <Table
          loading={loading}
          columns={columns}
          data={data}
          onItemSelectedCB={this.onItemSelected}
        />
        { 
          selectedItem && 
          <div style={{ marginTop: '1em', color: 'tomato' }}> Selected: {selectedItem.Title} </div> 
        }
      </div>
    );
  }
}
