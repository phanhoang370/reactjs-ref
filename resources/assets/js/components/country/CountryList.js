import React from 'react';
import PropTypes from 'prop-types'
import {
    SortingState, EditingState, PagingState,
    IntegratedPaging, IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableEditRow, TableEditColumn,
    PagingPanel, DragDropProvider, TableColumnReordering,
    TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {TableCell} from 'material-ui/Table';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import AddIcon from 'material-ui-icons/Add';
import {withStyles} from 'material-ui/styles';

import {
    ProgressBarCell,
} from '../../constants/progress-bar-cell';
import {
    HighlightedCell,
} from '../../constants/highlighted-cell';

import {
    generateRows,
    globalSalesValues,
} from '../../constants/generator';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const styles = theme => ({
    lookupEditCell: {
        paddingTop: theme.spacing.unit * 0.875,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
    dialog: {
        width: 'calc(100% - 16px)',
    },
    inputRoot: {
        width: '100%',
    }
});

const AddButton = ({onExecute}) => (
    <Link to='/dashboard/guider/create'>
        <div style={{textAlign: 'center'}}>
            <Button
                color="primary"
                onClick={onExecute}
                title="Create new row"
            >
                New
            </Button>
        </div>
    </Link>
);

const EditButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon/>
    </IconButton>
);

const DeleteButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Delete row">
        <DeleteIcon/>
    </IconButton>
);

const CommitButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon/>
    </IconButton>
);

const CancelButton = ({onExecute}) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon/>
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

const Command = ({id, onExecute}) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};

const availableValues = {
    product: globalSalesValues.product,
    region: globalSalesValues.region,
    customer: globalSalesValues.customer,
};

const LookupEditCellBase = ({availableColumnValues, value, onValueChange, classes}) => (
    <TableCell
        className={classes.lookupEditCell}
    >
        <Select
            value={value}
            onChange={event => onValueChange(event.target.value)}
            input={
                <Input
                    classes={{root: classes.inputRoot}}
                />
            }
        >
            {availableColumnValues.map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
        </Select>
    </TableCell>
);
export const LookupEditCell = withStyles(styles, {name: 'ControlledModeDemo'})(LookupEditCellBase);

const Cell = (props) => {
    if (props.column.name === 'discount') {
        return <ProgressBarCell {...props} />;
    }
    if (props.column.name === 'amount') {
        return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const EditCell = (props) => {
    const availableColumnValues = availableValues[props.column.name];
    if (availableColumnValues) {
        return <LookupEditCell {...props} availableColumnValues={availableColumnValues}/>;
    }
    return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

class CountryList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {name: 'country_name', title: 'country_name'},
                {name: 'country_id', title: 'action'},
            ],
            tableColumnExtensions: [
                {columnName: 'amount', align: 'right'},
            ],
            rows: generateRows({
                columnValues: {id: ({index}) => index, ...globalSalesValues},
                length: 20,
            }),
            sorting: [],
            editingRowIds: [],
            addedRows: [],
            rowChanges: {},
            currentPage: 10,
            deletingRows: [],
            pageSize: 0,
            pageSizes: [5, 10, 0],
            columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
            currencyColumns: ['country_id'],
        };

        this.changeSorting = sorting => this.setState({sorting});
        this.changeEditingRowIds = editingRowIds => {
            console.log(this);
            // this.props.history.push(`/dashboard/country/${editingRowIds}`)
            this.setState({editingRowIds})
        }
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
        this.changeRowChanges = rowChanges => this.setState({rowChanges});
        this.changeCurrentPage = currentPage => this.setState({currentPage});
        this.changePageSize = pageSize => this.setState({pageSize});
        this.commitChanges = ({added, changed, deleted}) => {
            let {rows} = this.state;
            if (added) {
                const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
                rows = [
                    ...rows,
                    ...added.map((row, index) => ({
                        id: startingAddedId + index,
                        ...row,
                    })),
                ];
            }
            if (changed) {
                rows = rows.map(row => (changed[row.id] ? {...row, ...changed[row.id]} : row));
            }
            this.setState({rows, deletingRows: deleted || this.state.deletingRows});
        };
        this.cancelDelete = () => this.setState({deletingRows: []});
        this.deleteRows = () => {
            const rows = this.state.rows.slice();
            this.state.deletingRows.forEach((rowId) => {
                const index = rows.findIndex(row => row.id === rowId);
                if (index > -1) {
                    rows.splice(index, 1);
                }
            });
            this.setState({rows, deletingRows: []});
        };
        this.changeColumnOrder = (order) => {
            this.setState({columnOrder: order});
        };
    }

    deleteCountry = id => {
        console.log(id);
    }

    CurrencyFormatter = data => {
        return (
            <div>
                <Link to={`/dashboard/country/edit/${data.value}`} > edit </Link> 
                <button onClick={() => this.deleteCountry(data.value)}> delete </button>
            </div>
        )
    }

    render() {
        const {
            classes,
            countries
        } = this.props;
        const {
            rows,
            columns,
            tableColumnExtensions,
            sorting,
            currentPage,
            deletingRows,
            pageSize,
            pageSizes,
            columnOrder,
            currencyColumns
        } = this.state;

        return (
            <Paper>
                <Grid
                    rows={countries.data}
                    columns={columns}
                    getRowId={getRowId}
                >
              <DataTypeProvider
                formatterComponent={this.CurrencyFormatter}
                for={currencyColumns}
              />
                    <FilteringState defaultFilters={[]}/>
                    <IntegratedFiltering/>
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

                    <IntegratedSorting/>
                    <IntegratedPaging/>

                    <DragDropProvider/>

                    <Table
                        columnExtensions={tableColumnExtensions}
                        cellComponent={Cell}
                    />

                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    />

                    <TableHeaderRow showSortingControls/>

                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <TableFilterRow/>
                </Grid>

                <Dialog
                    open={!!deletingRows.length}
                    onClose={this.cancelDelete}
                    classes={{paper: classes.dialog}}
                >
                    <DialogTitle>Delete Row</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure to delete the following row?
                        </DialogContentText>
                        <Paper>
                            <Grid
                                rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                                columns={columns}
                            >
                                <Table
                                    columnExtensions={tableColumnExtensions}
                                    cellComponent={Cell}
                                />
                                <TableHeaderRow/>
                            </Grid>
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
                        <Button onClick={this.deleteRows} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}


export default withStyles(styles, {name: 'ControlledModeDemo'})(CountryList);
