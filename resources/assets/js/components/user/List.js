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

import InlineError from './../messages/InlineError'

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
                {
                    name: 'action',
                    title: props.intl.formatMessage({
                        id: 'dashboard.action',
                        defaultMessage: 'Action'
                    })
                },
                { 
                    name: 'name',
                    title: props.intl.formatMessage({
                        id: 'dashboard.user.name',
                        defaultMessage: 'Username'
                    })
                },
                { 
                    name: 'email',
                    title: props.intl.formatMessage({
                        id: 'dashboard.store.email',
                        defaultMessage: 'Email'
                    })
                },
                { 
                    name: 'created_at',
                    title: props.intl.formatMessage({
                        id: 'dashboard.user.create.at',
                        defaultMessage: 'Created at'
                    })

                },
                { 
                    name: 'type',
                    title: props.intl.formatMessage({
                        id: 'dashboard.type',
                        defaultMessage: 'Type'
                    })
                },
            ],
            tableColumnExtensions: [
                { columnName: 'amount', align: 'right', width: 150 },
                { columnName: 'discount', width: 110 },
            ],
            rows: [],
            sorting: ['name', 'email', 'created_at', 'type'],
            editingRowIds: [],
            addedRows: [],
            rowChanges: {},
            currentPage: 0,
            deletingRows: [],
            pageSize: 10,
            pageSizes: [5, 10, 0],
            columnOrder: ['roles_count'],
            actionColumns: ['action'],
            typeColumns: ['type'],
            error: '',
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

    deleteUser = id => {
        this.setState({ error: '' });
        this.props.deleteUser(id)
            .catch(error => {
                this.setState({ error: error.data.message });
            })
    }

    ActionFormatter = data => {
        if (data.row.user_id == 1) {
            return null
        }
        
        return (
            <div>
                <Link to={`/dashboard/user/edit/${data.row.user_id}`} style={{paddingRight: '5px'}}>
                    <button className='btn btn-primary'>
                        <i className='fa fa-edit'></i>
                    </button>
                </Link>
                <button className='btn btn-danger' onClick={() => this.deleteUser(data.row.user_id)}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>
        )
    }

    TypeFormatter = data => {
        if (!data.row.roles) {
            return null;
        }

        return (
            <div>
                {data.row.company_count > 0 ? 'Company' : data.row.roles[0] ? data.row.roles[0].name : ''}
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
                    name: 'name',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.user.name',
                        defaultMessage: 'User name'
                    })
                },
                {
                    name: 'email',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.store.email',
                        defaultMessage: 'Email'
                    })
                },
                {
                    name: 'created_at',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.user.create.at',
                        defaultMessage: 'Created at'
                    })

                },
                {
                    name: 'type',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.type',
                        defaultMessage: 'Type'
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
            actionColumns,
            typeColumns,
            error,
        } = this.state;

        const { users } = this.props

        return (
            <div>
                { error && <InlineError text={error}/>}
                <Card className="m-15 table-user-list">
                    <Grid
                        rows={users}
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

                        <DataTypeProvider
                            formatterComponent={this.TypeFormatter}
                            for={typeColumns}
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
            </div>
        );
    }
}

export default injectIntl(RoleListComponent);
