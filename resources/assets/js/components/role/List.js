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

class RoleListComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'action',
                    title: props.intl.formatMessage({
                        id: 'dashboard.action',
                        defaultMessage: 'Action'
                    }) },
                { name: 'name', title: props.intl.formatMessage({
                        id: 'dashboard.name',
                        defaultMessage: 'Name'
                    })},
                { name: 'display_name', title: props.intl.formatMessage({
                        id: 'dashboard.role.display.name',
                        defaultMessage: 'Display name'
                    }) },
                { name: 'description', title: props.intl.formatMessage({
                        id: 'dashboard.description',
                        defaultMessage: 'Description'
                    }) },
                { name: 'perms_count', title: props.intl.formatMessage({
                        id: 'dashboard.role.perm.count',
                        defaultMessage: 'Permission count'
                    }) },
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
            dcRateColumns: ['dc_rate'],
            companyFeeRateColumns: ['company_fee_rate'],
            percentColumns: ['discount'],
        };

        this.changeSorting = sorting => this.setState({ sorting });
        this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
        this.changeAddedRows = addedRows => this.setState({
            addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
                amount: 0,
                discount: 0,
                saleDate: new Date().toISOString().split('T')[0],
                product: availableValues.product[0],
                region: availableValues.region[0],
                customer: availableValues.customer[0],
            })),
        });
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

    deleteRole = id => {
        this.props.deleteRole(id)
    }

    ActionFormatter = data => {
        return (
            <div>
                <Link to={`/dashboard/role/edit/${data.row.role_id}`} style={{paddingRight: '5px'}}>
                    <button className='btn btn-primary'>
                        <i className='fa fa-edit'></i>
                    </button>
                </Link>
                <button className='btn btn-danger' onClick={() => this.deleteRole(data.row.role_id)}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                { name: 'action',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.action',
                        defaultMessage: 'Action'
                    }) },
                { name: 'name', title: nextProps.intl.formatMessage({
                        id: 'dashboard.role.name',
                        defaultMessage: 'Name'
                    })},
                { name: 'display_name', title: nextProps.intl.formatMessage({
                        id: 'dashboard.role.display.name',
                        defaultMessage: 'Display name'
                    }) },
                { name: 'description', title: nextProps.intl.formatMessage({
                        id: 'dashboard.description',
                        defaultMessage: 'Description'
                    }) },
                { name: 'perms_count', title: nextProps.intl.formatMessage({
                        id: 'dashboard.role.perm.count',
                        defaultMessage: 'Permission count'
                    }) },
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
            actionColumns,
            dcRateColumns,
            companyFeeRateColumns,
        } = this.state;

        const { roles } = this.props

        return (
            <Card className="m-15 table-role-list">
                <Grid
                    rows={roles}
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

export default injectIntl(RoleListComponent);
