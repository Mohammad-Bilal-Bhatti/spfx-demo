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

  private _service: ToolService;

  public constructor(props: IHelloWorldProps) {
    super(props);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.insertItem = this.insertItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      data: [],
      loading: false,
      error: undefined,
      selected: {
        item: undefined,
        index: -1
      },
    };
    this._service = new ToolService(getSP());
  }
  
  public componentDidMount(): void {
    this._fetchData();
  }

  public onItemSelected(item: ITool, index: number): void {
    console.log('[HelloWorld] onItemSelected was called with data: ', item);
    this.setState({ selected: { item, index } });
  }

  public insertItem(): void {
    console.log('[HelloWorld] insertItem was called');

    const tool: ITool = {
      Title: 'New Tool',
      Description: 'New Description',
    };

    this._service.insert(tool)
      .then(mtool => { 
        const data: ITool[] = [...this.state.data, mtool];
        this.setState({ data });
      })
      .catch(error => console.error('error in insertItem: ', error))

  }

  public reload(): void {
    console.log('[HelloWorld] reload was called');
    this._fetchData();
  }

  public updateItem(): void {
    console.log('[HelloWorld] updateItem was called');

    const { selected } = this.state;

    if (!selected.item) return alert('Please select an item to update')

    const updatedItem: ITool = {
      ...selected.item,
      Description: '[UPDATED] ' + selected.item.Description,
    };

    this._service.update(updatedItem)
      .then(uitem => {
        const data: ITool[] = [...this.state.data.slice(0, selected.index), uitem, ...this.state.data.slice(selected.index + 1)]
        this.setState({ data, selected: { item: undefined, index: -1 } });    
      })
      .catch(error => console.error('error in update item: ', error))
  }

  public deleteItem(): void {
    console.log('[HelloWorld] deleteItem was called');

    const { selected } = this.state;

    if (!selected.item) return alert('Please select an item to delete');
    console.log(`[deleteItem] removing item on index: ${selected.index}`);

    this._service.delete(selected.item)
      .then(() => {
        const data: ITool[] = [...this.state.data.slice(0, selected.index), ...this.state.data.slice(selected.index + 1)] ;
        this.setState({ data, selected: { item: undefined, index: -1 } });    
      })
      .catch(error => console.log('error in deleteItem: ', error));
  }

  private _fetchData(): void {
    console.log('[HelloWorld] _fetchData was called');

    this._service.getAll()
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

    const { data, loading, selected } = this.state;

    return (
      <div className="container">
        <div className="button-group" style={{ marginBottom: '1em' }}>
          <button onClick={() => this.insertItem()} style={{ marginRight: '6px' }}> Insert </button>
          <button onClick={() => this.updateItem()} style={{ marginRight: '6px' }}> Update </button>
          <button onClick={() => this.deleteItem()} style={{ marginRight: '6px' }}> Delete </button>
          <button onClick={() => this.reload()} style={{ marginRight: '6px' }}> Reload </button>
        </div>
        <Table
          loading={loading}
          columns={columns}
          data={data}
          onItemSelectedCB={this.onItemSelected}
        />
        { 
          selected.item && 
          <div style={{ marginTop: '1em', color: 'tomato' }}> Selected Id: {selected.item.Id} </div> 
        }
      </div>
    );
  }
}
