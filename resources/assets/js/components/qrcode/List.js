import * as React from 'react';
import { Card } from 'reactstrap';
import { 
  EditingState, 
  DataTypeProvider,
  PagingState,
  SearchState,
  SortingState,
  IntegratedPaging, 
  IntegratedSorting,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  Toolbar,
  SearchPanel,
  PagingPanel,
  DragDropProvider, 
  TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap4';
import { 
    injectIntl, 
    FormattedMessage 
} from "react-intl"

const getRowId = row => row.id;

const commandComponentProps = {
  add: {
    icon: 'plus',
    hint: 'Create new row',
  },
  edit: {
    icon: 'pencil',
    hint: 'Edit row',
    color: 'text-warning',
  },
  delete: {
    icon: 'trash',
    hint: 'Delete row',
    color: 'text-danger',
  },
  commit: {
    icon: 'check',
    hint: 'Save changes',
    color: 'text-success',
  },
  cancel: {
    icon: 'times',
    hint: 'Cancel changes',
    color: 'text-danger',
  },
};

const Cell = (props) => {
    return <Table.Cell {...props} />;
};

const CommandButton = ({
  onExecute, icon, text, hint, color,
}) => (
  <button
    className="btn btn-link"
    style={{ padding: 11 }}
    onClick={(e) => {
      onExecute();
      e.stopPropagation();
    }}
    title={hint}
  >
    <span className={color || 'undefined'}>
      {icon ? <i className={`fa fa-${icon} fa-2x`} style={{ marginRight: text ? 5 : 0 }} /> : null}
      {text}
    </span>
  </button>
)

const GuiderLookupEditCell = ({
  column, availableColumnValues, value, onValueChange,
}) => (
  <td className="text-nowrap dx-rg-bs4-table-cell">
    <select
      className="form-control"
      style={{ width: '100%', textAlign: column.align }}
      value={value ? value.guid_id : undefined}
      onChange={e => onValueChange(e.target.value)}
    >
      {availableColumnValues.map((val, key) => <option key={key} value={val.guid_id}>{val.guid_name}</option>)}
    </select>
  </td>
)
const CityLookupEditCell = ({
  column, availableColumnValues, value, onValueChange,
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: 1,
    }}
  >
    <input
      className="form-control"
      style={{ width: '100%', textAlign: column.align }}
      readOnly
    />
  </td>
)
const PrintLookupEditCell = ({
  column, availableColumnValues, value, onValueChange,
}) => (
  <td className="text-nowrap dx-rg-bs4-table-cell">
    <button className='btn btn-danger'>
      <i className='fa fa-print'></i>
    </button>
  </td>
)

class QrCode1ListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { 
          name: 'print',
          title: props.intl.formatMessage({
              id: 'dashboard.print',
              defaultMessage: 'Print'
          })
        },
        { 
          name: 'qr_code', 
          title: props.intl.formatMessage({
              id: 'dashboard.qrcode1',
              defaultMessage: 'QR Code 1 Serial'
          }) 
        },
        { 
          name: 'guider', 
          title: props.intl.formatMessage({
              id: 'dashboard.guider.name',
              defaultMessage: 'Guide Name'
          })
        },
        { 
          name: 'city', 
          title: props.intl.formatMessage({
              id: 'dashboard.guider.work.city',
              defaultMessage: 'Guide working city'
          }) 
        },
      ],
      rows: [],
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 10,
      pageSizes: [5, 10, 0],
      cityColumns: ['city'],
      guiderColumns: ['guider'],
      printColumns: ['print'],
      tableColumnExtensions: [
                { columnName: 'amount', align: 'right', width: 150 },
                { columnName: 'discount', width: 110 },
            ],
      editingStateColumnExtensions: [
        { columnName: 'print', editingEnabled: false },
        { columnName: 'qr_code', editingEnabled: false },
        { columnName: 'city', editingEnabled: false },
      ],
      addedRows: [],
    };

    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
  }

  changeAddedRows(addedRows) {
      this.props.getQrcode1().then(response => {
        this.setState({
          addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
            qr_code: response.data,
            guider: (this.props.guiders && this.props.guiders[0]) ? this.props.guiders[0].guid_id : ''
          })),
        })
      })
      
    }

  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;
    if (added) {
      let data = {
        serial: added[0].qr_code,
        guid_id: added[0].guider
      };
      this.props.submit(data)
      .then(response => {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        response.data.id = startingAddedId
        rows = [
          ...rows,
          response.data,
        ];
        this.setState({ rows });
      })
    }
    if (changed) {
    let data = changed[Object.keys(changed)[0]]

    this.props.updateQrcode1(rows[Object.keys(changed)[0]].link_qr_id ,data)
      .then(response => {
        rows = rows.map(row => {
          return (
            changed[row.id] ? response.data : row
          )
        })
        this.setState({ rows });
      })
      
    }
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      rows: nextProps.qrcodes,
      columns: [
        { 
          name: 'print',
          title: nextProps.intl.formatMessage({
              id: 'dashboard.print',
              defaultMessage: 'Print'
          })
        },
        { 
          name: 'qr_code', 
          title: nextProps.intl.formatMessage({
              id: 'dashboard.qrcode1',
              defaultMessage: 'QR Code 1 Serial'
          }) 
        },
        { 
          name: 'guider', 
          title: nextProps.intl.formatMessage({
              id: 'dashboard.guider.name',
              defaultMessage: 'Guide Name'
          })
        },
        { 
          name: 'city', 
          title: nextProps.intl.formatMessage({
              id: 'dashboard.guider.work.city',
              defaultMessage: 'Guide working city'
          }) 
        },
      ]
    });
  }

EditCell = (props) => {
  if (props.column.name === 'print') {
    return <PrintLookupEditCell {...props} />;
  }
  if (props.column.name === 'guider') {
    return <GuiderLookupEditCell {...props} availableColumnValues={this.props.guiders} />;
  }
  if (props.column.name === 'city') {
    return <CityLookupEditCell {...props} />;
  }
  return <TableEditRow.Cell {...props} />;
}
Command = ({ id, onExecute }) => (
  <CommandButton
    {...commandComponentProps[id]}
    onExecute={onExecute}
  />
)
CityFormatter = data => {
        return (
            <React.Fragment>
                {data.row.city.city_name}
            </React.Fragment>
        )
    }

    GuiderFormatter = data => {
        return (
            <React.Fragment>
                {data.row.guider.guid_name}
            </React.Fragment>
        )
    }
  PrintFormatter = data => {
        return (
            <div>
                <button className='btn btn-danger' onClick={() => this.printQrCode(data.row)}>
                    <i className='fa fa-print'></i>
                </button>
            </div>
        )
    }
    printQrCode = data => {
        this.props.history.push(`/dashboard/qrcode/${data.qr_code}/print`)
    }

  render() {
    const { 
      rows,
      columns,
      tableColumnExtensions,
      sorting,
      pageSize,
      pageSizes,
      columnOrder,
      cityColumns,
      guiderColumns,
      currentPage,
      addedRows,
      editingStateColumnExtensions,
      printColumns
    } = this.state;

    return (
      <Card className="m-15 table-qrcode-list">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
                        
          <SortingState
              sorting={sorting}
              onSortingChange={this.changeSorting}
          />
          <SearchState
            defaultValue={''}
          />
          <EditingState
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
            columnExtensions={editingStateColumnExtensions}
          />
          <DataTypeProvider
            formatterComponent={this.PrintFormatter}
            for={printColumns}
          />
          <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.changeCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={this.changePageSize}
          />

          <IntegratedSorting />
          <IntegratedPaging />

          <DataTypeProvider
              formatterComponent={this.GuiderFormatter}
              for={guiderColumns}
          />

          <DataTypeProvider
              formatterComponent={this.CityFormatter}
              for={cityColumns}
          />
          <Table 
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />

          <DragDropProvider />
          <IntegratedFiltering />

          <TableColumnReordering
              order={columnOrder}
              onOrderChange={this.changeColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow 
            cellComponent={this.EditCell}
          />
          <TableEditColumn
            width={100}
            showAddCommand={!addedRows.length}
            showEditCommand
            commandComponent={this.Command}
          />
          <Toolbar />
          <SearchPanel />
          <PagingPanel
              pageSizes={pageSizes}
          />

        </Grid>
      </Card>
    );
  }
}

export default injectIntl(QrCode1ListComponent);
