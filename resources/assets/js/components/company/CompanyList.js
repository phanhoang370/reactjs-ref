import * as React from 'react';
import {Link} from 'react-router-dom'
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
import { FormattedMessage, injectIntl } from "react-intl"

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

class CompanyListComponent extends React.PureComponent {
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
                    name: 'company_id',
                    title: props.intl.formatMessage({
                        id: 'dashboard.id',
                        defaultMessage: 'ID'
                    })
                },
                {
                    name: 'company_name',
                    title: props.intl.formatMessage({
                        id: 'dashboard.company.name',
                        defaultMessage: 'Company Name'
                    })
                },
                {
                    name: 'ceo_name',
                    title: props.intl.formatMessage({
                        id: 'dashboard.ceo',
                        defaultMessage: 'CEO'
                    })
                },
                {
                    name: 'address',
                    title: props.intl.formatMessage({
                        id: 'dashboard.store.address',
                        defaultMessage: 'Address'
                    })
                },
                {
                    name: 'company_tel',
                    title: props.intl.formatMessage({
                        id: 'dashboard.guider.phone',
                        defaultMessage: 'Phone'
                    })
                },
                {
                    name: 'home_page',
                    title: props.intl.formatMessage({
                        id: 'dashboard.homepage',
                        defaultMessage: 'Homepage'
                    })
                },
                {
                    name: 'guide_level',
                    title: props.intl.formatMessage({
                        id: 'dashboard.guider.level',
                        defaultMessage: 'Guider level'
                    })
                }
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
            addressColumns: ['address'],
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

    deleteCompany = id => {
        this.props.deleteCompany(id)
    }

    ActionFormatter = data => {
        return (
            <div>
                <Link to={`/dashboard/company/edit/${data.row.company_id}`} style={{paddingRight: '5px'}}>
                    <button className='btn btn-primary'>
                        <i className='fa fa-edit'></i>
                    </button>
                </Link>
                <button className='btn btn-danger' onClick={() => this.deleteCompany(data.row.company_id)}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>
        )
    }

    AddressFormatter = data => {
        if (!data.row.city && !data.row.country) {
            return null;
        }
        return (
            <span>
                {data.row.company_address}, {data.row.city.city_name}, {data.row.country.country_name}
            </span>
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
                    name: 'company_id',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.id',
                        defaultMessage: 'ID'
                    })
                },
                {
                    name: 'company_name',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.company.name',
                        defaultMessage: 'Company Name'
                    })
                },
                {
                    name: 'ceo_name',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.ceo',
                        defaultMessage: 'CEO'
                    })
                },
                {
                    name: 'address',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.store.address',
                        defaultMessage: 'Address'
                    })
                },
                {
                    name: 'company_tel',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.guider.phone',
                        defaultMessage: 'Phone'
                    })
                },
                {
                    name: 'home_page',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.homepage',
                        defaultMessage: 'Homepage'
                    })
                },
                {
                    name: 'guide_level',
                    title: nextProps.intl.formatMessage({
                        id: 'dashboard.guider.level',
                        defaultMessage: 'Guider level'
                    })
                }
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
            addressColumns,
        } = this.state;

        const { companies } = this.props

        return (
            <Card className="m-15 table-company-list">
                <Grid
                    rows={companies}
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
                        formatterComponent={this.AddressFormatter}
                        for={addressColumns}
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
export default injectIntl(CompanyListComponent);

