import * as React from 'react';
import { Link } from 'react-router-dom'
import {
    SortingState, 
    PagingState,
    IntegratedPaging, 
    IntegratedSorting,
    DataTypeProvider,
    SearchState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import { Card } from 'reactstrap';
import {
    Grid,
    Table, 
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    PagingPanel, 
    DragDropProvider, 
    TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap4';

import {FormattedMessage, injectIntl} from "react-intl"

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
      {icon ? <i className={`oi oi-${icon}`} style={{ marginRight: text ? 5 : 0 }} /> : null}
        {text}
    </span>
    </button>
);

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
        icon: 'x',
        hint: 'Cancel changes',
        color: 'text-danger',
    },
};

const Command = ({ id, onExecute }) => (
    <CommandButton
        {...commandComponentProps[id]}
        onExecute={onExecute}
    />
);

const availableValues = {
    // product: globalSalesValues.product,
    // region: globalSalesValues.region,
    // customer: globalSalesValues.customer,
};

export const LookupEditCell = ({
                                   column, availableColumnValues, value, onValueChange,
                               }) => (
    <td
        style={{
            verticalAlign: 'middle',
            padding: 1,
        }}
    >
        <select
            className="form-control"
            style={{ width: '100%', textAlign: column.align }}
            value={value}
            onChange={e => onValueChange(e.target.value)}
        >
            {availableColumnValues.map(val => <option key={val} value={val}>{val}</option>)}
        </select>
    </td>
);


const Cell = (props) => {
    if (props.column.name === 'discount') {
        return <ProgressBarCell {...props} />;
    }
    if (props.column.name === 'amount') {
        return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const getRowId = row => row.id;

class GuiderList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    name: 'action',
                    title: props.intl.formatMessage({
                        id: 'dashboard.action',
                        defaultMessage: 'Action'
                    })

                },

                { 
                    name: 'guid_email',
                    title: props.intl.formatMessage({
                        id: 'dashboard.store.email',
                        defaultMessage: 'Email'
                    })

                },

                { 
                    name: 'guid_resident_number',
                    title: props.intl.formatMessage({
                        id: 'dashboard.store.guid_resident_number',
                        defaultMessage: 'guid_resident_number'
                    })

                },
                { 
                    name: 'guid_name',
                    title: props.intl.formatMessage({
                        id: 'dashboard.name',
                        defaultMessage: 'Name'
                    })
                },
                { 
                    name: 'guid_phone',
                    title: props.intl.formatMessage({
                        id: 'dashboard.guider.phone',
                        defaultMessage: 'Phone'
                    })
                },
                { 
                    name: 'city_name',
                    title: props.intl.formatMessage({
                        id: 'dashboard.guider.work.city',
                        defaultMessage: 'Working city'
                    })
                },
                { 
                    name: 'guid_level',
                    title: props.intl.formatMessage({
                        id: 'dashboard.level',
                        defaultMessage: 'Level'
                    })
                },
            ],
            tableColumnExtensions: [
                { columnName: 'amount', align: 'right', width: 150 },
                { columnName: 'discount', width: 110 },
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
            columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
            actionColumns: ['action'],
            percentColumns: ['discount'],
        };

        this.changeSorting = sorting => this.setState({ sorting });
        this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
        this.changeRowChanges = rowChanges => this.setState({ rowChanges });
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });
        this.cancelDelete = () => this.setState({ deletingRows: [] });
        this.deleteRows = () => {
            const rows = this.state.rows.slice();
            this.state.deletingRows.forEach((rowId) => {
                const index = rows.findIndex(row => row.id === rowId);
                if (index > -1) {
                    rows.splice(index, 1);
                }
            });
            this.setState({ rows, deletingRows: [] });
        };
        this.changeColumnOrder = (order) => {
            this.setState({ columnOrder: order });
        };
    }

    deleteGuider = id => {
        this.props.deleteGuider(id)
    }

    ActionFormatter = data => {
        return (
            <div>
                <Link to={`/dashboard/guider/edit/${data.row.id}`} style={{paddingRight: '5px'}}>
                    <button className='btn btn-primary'>
                        <i className='fa fa-edit'></i>
                    </button>
                </Link>
                <button className='btn btn-danger' onClick={() => this.deleteGuider(data.row.id)}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>
        )
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    name: 'action',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.action',
                        defaultMessage: 'Action'
                    })

                },
                {
                    name: 'guid_id',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.id',
                        defaultMessage: 'ID'
                    })

                },

                { 
                    name: 'guid_resident_number',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.store.resident.number',
                        defaultMessage: 'Guide Resident Number'
                    })

                },
                {
                    name: 'guid_email',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.store.email',
                        defaultMessage: 'Email'
                    })

                },
                {
                    name: 'guid_name',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.name',
                        defaultMessage: 'Name'
                    })
                },
                {
                    name: 'guid_phone',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.guider.phone',
                        defaultMessage: 'Phone'
                    })
                },
                {
                    name: 'city_name',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.guider.work.city',
                        defaultMessage: 'Working city'
                    })
                },
                {
                    name: 'guid_level',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.level',
                        defaultMessage: 'Level'
                    })
                },
            ]
        })
    }

    render() {
        const {
            columns,
            tableColumnExtensions,
            sorting,
            currentPage,
            pageSize,
            pageSizes,
            columnOrder,
            actionColumns
        } = this.state;

        const { guiders } = this.props

        return (
            <Card className="m-15 table-guide-list">
                <Grid
                    rows={guiders}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <SearchState
                        defaultValue={''}
                    />
                    
                    <SortingState
                        sorting={sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                    />

                    <DataTypeProvider
                        formatterComponent={this.ActionFormatter}
                        for={actionColumns}
                    />

                    <IntegratedSorting />
                    <IntegratedPaging />

                    <DragDropProvider />
                    <IntegratedFiltering />
                    <Table
                        columnExtensions={tableColumnExtensions}
                        cellComponent={Cell}
                    />

                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    />

                    <TableHeaderRow showSortingControls />
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

export default injectIntl(GuiderList);
