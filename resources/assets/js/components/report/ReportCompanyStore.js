import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import InlineError from './../messages/InlineError'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from "react-intl"
import ReportTableCompanyStore from './../table/ReportTableCompanyStore';
import Picker from 'react-month-picker'
import './Picker.css'
import './Report.css';

const DEFAULT_MIN_YEAR = 1990
const DEFAULT_MIN_MONTH = 1

class MonthBox extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A',
        }

        this._handleClick = this._handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    render() {

        return (
            <div className="box" onClick={this._handleClick}>
                <label>{this.state.value} <div className="background-time"><i className="fa fa-calendar"></i></div></label>
            </div>
        )
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e)
    }
}

class ReportCompanyStoreComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                startDate: `${moment().format('YYYY') - 1}-${moment().format('MM')}-01`,
                endDate: `${moment().format('YYYY')}-${moment().format('MM')}-01`,
            },
            loading: false,
            errors: {},
            selectedOption: '',
            total: 0,
            valueMonthStart: {
                year: moment().format('YYYY') - 1, 
                month: moment().format('MM')
            },
            valueMonthEnd: {
                year: moment().format('YYYY'), 
                month: moment().format('MM')
            },
            years: {
                min: {
                    year: DEFAULT_MIN_YEAR, 
                    month: DEFAULT_MIN_MONTH
                }, 
                max: {
                    year: moment().format('YYYY'), 
                    month: moment().format('MM')
                }
            }
        };
    }

    handleChangeSelect = selectedOption => {
        this.setState({
            selectedOption:selectedOption,
            data: {
                ...this.state.data, 
                'id': selectedOption.value
            }
        });
    }

    componentWillMount(){
        this.props.submit(this.state.data);
    }

    handleChange = ({startDate, endDate}) => {
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate

        if (startDate.isAfter(endDate)) {
            endDate = startDate
        }

        this.setState({
            startDate,
            endDate,
            data: {...this.state.data,
                'startDate': startDate,
                'endDate': endDate
            }
        })
    }

    handleChangeStart = (startDate, e) => {
        this.handleChange({startDate});
        e.preventDefault();
    }


    handleChangeEnd = (endDate) => this.handleChange({endDate})

    handleClickStart = (e, date) => {
        e.preventDefault();
        this.setState({
            startDate: moment()

        });
    }
    handleSelect = (date) => {
        this.setState({
            startDate: date
        });

    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.submit(this.state.data)
    }


    handleFromDatePicker = (e) => {
        e.preventDefault()
        document.getElementById('FromDatePicker').focus();

    }

    handleToDatePicker = (e) => {
        e.preventDefault()
        document.getElementById('ToDatePicker').focus();

    }

    showTotal(report) {
        let total = parseInt('0');
        report.forEach(function(data){
            total+= parseInt(data.bill_tot_cost)
        })

        return total
    }

    convertNumberOfMonth = month => {
        return month >= 10 ? `${month}` : `0${month}`
    }

    handleClickMonthStartBox = (e) => {
        this.refs.pickAMonthStart.show()
    }

    handleAMonthStartDissmis = (value) => {
        this.setState({
            valueMonthStart: value,
            years: {
                min: value, 
                max: {
                    year: moment().format('YYYY'), 
                    month: moment().format('MM')
                }
            },
            data: {
                ...this.state.data,
                startDate: `${value.year}-${this.convertNumberOfMonth(value.month)}-01`
            }
        })
    }

    handleAMonthStartChange(value, text) {
        this.onDismissStart({year: value, month: text});
    }

    handleClickMonthEndBox = (e) => {
        this.refs.pickAMonthEnd.show()
    }

    handleAMonthEndDissmis = (value) => {
        this.setState({
            valueMonthEnd: value,
            years: {
                min: {
                    year: DEFAULT_MIN_YEAR, 
                    month: DEFAULT_MIN_MONTH
                },
                max: value,
            },
            data: {
                ...this.state.data,
                endDate: `${value.year}-${this.convertNumberOfMonth(value.month)}-01`
            }
        })
    }

    handleAMonthEndChange(value, text) {
        this.onDismissEnd({year: value, month: text});
    }

    render() {
        const { report } = this.props;
        const { data, errors, total, selectedOption, valueMonthStart, valueMonthEnd, years } = this.state;
        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From', to: 'To',
        }
        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
            return '?'
        }

        return (
            <div className='guider-add info-company'>
                <h2 className='title-guider-add'><i className="fa fa-pie-chart" aria-hidden="true"></i><FormattedMessage
                    id='dashboard.title.report'
                    defaultMessage='Travel Agent, Guide, Amount and Fees by Store'
                />
                </h2>
                <div className="main-form">
                    <div className="search">
                        <div className="search-input">
                        </div>

                        <form className="form-inline search-report admin-report" onSubmit={this.onSubmit}>
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="search-input title-admin-time">
                                    <span><i className="fa fa-caret-right"></i><FormattedMessage
                                        id='dashboard.time'
                                        defaultMessage='Time'
                                    /></span>
                                </div>
                                <div className="fromdate">
                                    <Picker
                                        ref="pickAMonthStart"
                                        years={years}
                                        value={valueMonthStart}
                                        lang={pickerLang.months}
                                        theme="dark"
                                        onChange={this.handleAMonthStartChange}
                                        onDismissStart={this.handleAMonthStartDissmis}
                                    >
                                        <MonthBox value={makeText(valueMonthStart)} onClick={this.handleClickMonthStartBox} />
                                    </Picker>
                                </div>
                                <div className="todate">
                                    <Picker
                                        ref="pickAMonthEnd"
                                        years={years}
                                        value={valueMonthEnd}
                                        lang={pickerLang.months}
                                        theme="dark"
                                        onChange={this.handleAMonthEndChange}
                                        onDismissEnd={this.handleAMonthEndDissmis}
                                    >
                                        <MonthBox value={makeText(valueMonthEnd)} onClick={this.handleClickMonthEndBox} />
                                    </Picker>
                                </div>
                                <div className="btn-report pt-10-ipad">
                                    <button onClick={this.onSubmit}  id="search_btn" className="btn btn-sm">
                                        <FormattedMessage
                                            id='dashboard.search'
                                            defaultMessage='Search'
                                        />
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>

                    <table className="table tab-in-tab table-hover table-bordered table-view">
                        <thead>
                        <tr>
                            <th>
                                <FormattedMessage
                                    id='dashboard.store.name'
                                    defaultMessage='Store name'
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id='dashboard.time'
                                    defaultMessage='Time'
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id='dashboard.sale.amount'
                                    defaultMessage='Sale amount'
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id='dashboard.commission.amount'
                                    defaultMessage='Commission amount'
                                />
                            </th>
                        </tr>
                        </thead>

                        <ReportTableCompanyStore report={report} />

                    </table>
                    <div className="form-group row main-table-report">
                        <div className="col-md-12 p-0 pt-10-mb text-align-center">
                            <button type="button" id="search_btn" className="btn btn-sm btn-colorP ">
                                <FormattedMessage
                                    id='dashboard.cancel'
                                    defaultMessage='Cancel'
                                />
                            </button>
                            <button id="search_btn" className="btn btn-sm btn-colorN ml-15">
                                <FormattedMessage
                                    id='dashboard.print'
                                    defaultMessage='Print'
                                />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default ReportCompanyStoreComponent;
