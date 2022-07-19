import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps, IHelloWorldState } from './IHelloWorldInterface';
import { escape } from '@microsoft/sp-lodash-subset';
import { Table } from './table/table';

const columns = [
  { label: 'Name', accessor: 'name' },
  { label: 'Surname', accessor: 'surname' },
  { label: 'District', accessor: 'district' },
  { label: 'GPA', accessor: 'gpa' },
]
const data = [
  {
    name: 'Bilal',
    surname: 'Bhatti',
    district: 'Sukkur',
    gpa: 3.7
  },
  {
    name: 'Rashid',
    surname: 'Babbar',
    district: 'Dadu',
    gpa: 2.9
  },
  {
    name: 'Nandlal',
    surname: 'Khatri',
    district: 'Umerkot',
    gpa: 3.4
  },
  {
    name: 'Tahir',
    surname: 'Magsi',
    district: 'Kambar',
    gpa: 3.2
  },
];

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

  public constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }
  
  public componentDidMount(): void {
    this._fetchData();
  }

  private _fetchData(): void {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ data: data, loading: false })
    }, 1000 * 1)
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const { data, loading } = this.state;

    return (
      <div className="container">
        <Table
          loading={loading}
          columns={columns}
          data={data}
        />
      </div>
    );
  }
}
