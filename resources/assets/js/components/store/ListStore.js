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
import { 
    injectIntl, 
    FormattedMessage 
} from "react-intl"

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

class ListStore extends React.PureComponent {
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
                    name: 'store_name', 
                    title: props.intl.formatMessage({ 
                        id: 'dashboard.name',
                        defaultMessage: 'Name' 
                    })
                },
                { 
                    name: 'store_email', 
                    title: props.intl.formatMessage({ 
                        id: 'dashboard.store.email',
                        defaultMessage: 'Email' 
                    })
                },
                { 
                    name: 'store_phone', 
                    title: props.intl.formatMessage({ 
                        id: 'dashboard.guider.phone',
                        defaultMessage: 'Phone'
                    })
                },
                { 
                    name: 'store_address', 
                    title: props.intl.formatMessage({ 
                        id: 'dashboard.store.address',
                        defaultMessage: 'Address'
                    })
                },
                { 
                    name: 'dc_rate', 
                    title: props.intl.formatMessage({ 
                        id: 'dashboard.customer.discount',
                        defaultMessage: 'Customer discount %'
                    })
                },
                { 
                    name: 'company_fee_rate', 
                    title: props.intl.formatMessage({ 
                        id: 'dashboard.company.margin',
                        defaultMessage: 'Travel agency margin %'
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
            dcRateColumns: ['dc_rate'],
            companyFeeRateColumns: ['company_fee_rate'],
            percentColumns: ['discount'],
            addressColumns: ['store_address'],
        };

        this.changeSorting = sorting => this.setState({ sorting });
        this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
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

    deleteStore = id => {
        this.props.deleteStore(id)
    }

    ActionFormatter = data => {
        return (
            <React.Fragment>
                <Link to={`/dashboard/store/edit/${data.row.link_store_id}`} style={{paddingRight: '5px'}}>
                    <button className='btn btn-primary'>
                        <i className='fa fa-edit'></i>
                    </button>
                </Link>
                <button className='btn btn-danger' onClick={() => this.deleteStore(data.row.store_id)}>
                    <i className='fa fa-trash'></i>
                </button>
            </React.Fragment>
        )
    }

    DcRateFormatter = data => {
        return (
            <React.Fragment>
                {data.value} %
            </React.Fragment>
        )
    }

    CompanyFeeRateFormatter = data => {
        return (
            <React.Fragment>
                {data.value} %
            </React.Fragment>
        )
    }

    AddressFormatter = data => {
        return (
            <React.Fragment>
                {data.row.store_address}, {data.row.city_name}, {data.row.country_name} 
            </React.Fragment>
        )
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
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
                    name: 'store_name', 
                    title: nextProps.intl.formatMessage({ 
                        id: 'dashboard.name',
                        defaultMessage: 'Name' 
                    })
                },
                { 
                    name: 'store_email', 
                    title: nextProps.intl.formatMessage({ 
                        id: 'dashboard.store.email',
                        defaultMessage: 'Email' 
                    })
                },
                { 
                    name: 'store_phone', 
                    title: nextProps.intl.formatMessage({ 
                        id: 'dashboard.guider.phone',
                        defaultMessage: 'Phone'
                    })
                },
                { 
                    name: 'store_address', 
                    title: nextProps.intl.formatMessage({ 
                        id: 'dashboard.store.address',
                        defaultMessage: 'Address'
                    })
                },
                { 
                    name: 'dc_rate', 
                    title: nextProps.intl.formatMessage({ 
                        id: 'dashboard.customer.discount',
                        defaultMessage: 'Customer discount %'
                    })
                },
                { 
                    name: 'company_fee_rate', 
                    title: nextProps.intl.formatMessage({ 
                        id: 'dashboard.company.margin',
                        defaultMessage: 'Travel agency margin %'
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
            dcRateColumns,
            companyFeeRateColumns,
            addressColumns,
        } = this.state;

        const { stores } = this.props


        return (
            <Card className="m-15 table-store-list">
                <Grid
                    rows={stores}
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
                        formatterComponent={this.CompanyFeeRateFormatter}
                        for={companyFeeRateColumns}
                    />

                    <DataTypeProvider
                        formatterComponent={this.AddressFormatter}
                        for={addressColumns}
                    />

                    <DataTypeProvider
                        formatterComponent={this.DcRateFormatter}
                        for={dcRateColumns}
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

export default injectIntl(ListStore);
