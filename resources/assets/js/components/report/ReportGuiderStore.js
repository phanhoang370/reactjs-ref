import React from 'react';
import DatePicker from 'react-datepicker';
import './Report.css';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import InlineError from './../messages/InlineError'
import NumberFormat from 'react-number-format'
import {FormattedMessage} from "react-intl"
import ReportTableGuiderStore from './../table/ReportTableGuiderStore';

class ReportGuiderStoreComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment().subtract(360, 'days'),
            endDate: moment(),
            data: {
                startDate: moment().subtract(360, 'days'),
                endDate: moment(),
            },
            loading: false,
            errors: {},
            selectedOption: '',
            total: 0
        };
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption:selectedOption,
            data: {...this.state.data, 'guid_id': selectedOption.value}
        });
    }

    handleChange = ({startDate, endDate}) => {
        console.log(startDate);
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate

        if (startDate.isAfter(endDate)) {
            endDate = startDate
        }

        this.setState({
            startDate,
            endDate,
            data: {
                ...this.state.data,
                'startDate': startDate,
                'endDate': endDate
            }
        })
    }

    handleChangeStart = (startDate, e) => {
        console.log(startDate, 'ff');
        this.handleChange({startDate});
        e.preventDefault();
    }


    handleChangeEnd = endDate => this.handleChange({endDate})

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

    componentWillMount(){
        this.setState({loading: true});
        this.props.submit(this.state.data);
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({loading: true});
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

    render() {
        const { report } = this.props;
        const { data, errors,total, selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <div className='guider-add info-company'>
                <h2 className='title-guider-add'>
                    <i className="fa fa-pie-chart" aria-hidden="true"></i>
                    <FormattedMessage
                        id='dashboard.title.report'
                        defaultMessage='Travel Agent, Guide, Amount and Fees by Store'
                    />
                </h2>
                <div className="main-form">
                    <div className="search">
                        <div className="search-input">
                        </div>

                        <form className="form-inline search-report" onSubmit={this.onSubmit}>
                            <div className="input-group mb-2 mr-sm-2">
                                <div className="search-input">
                                    <span>
                                        <i className="fa fa-caret-right"></i>
                                        <FormattedMessage
                                            id='dashboard.time'
                                            defaultMessage='Time'
                                        />
                                    </span>
                                </div>
                                <div className="fromdate">
                                    <DatePicker
                                        dateFormat="YYYY/MM/DD"
                                        selected={this.state.startDate}
                                        selectsStart
                                        disable
                                        id="FromDatePicker"
                                        name="FromDatePicker"
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleChangeStart}
                                    />
                                    <button id='start-day' onClick={this.handleFromDatePicker}>
                                        <i className="fa fa-calendar"></i>
                                    </button>
                                </div>
                                <div className="todate">
                                    <DatePicker
                                        dateFormat="YYYY/MM/DD"
                                        selected={this.state.endDate}
                                        selectsEnd
                                        disable
                                        onCtotallick={this.handleClickEnd}
                                        id="ToDatePicker"
                                        name="ToDatePicker"
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onChange={this.handleChangeEnd}
                                    />
                                    <button id='end-day' onClick={this.handleToDatePicker}>
                                        <i className="fa fa-calendar"></i>
                                    </button>
                                </div>

                                <div className="btn-report pt-10-ipad">
                                    <button onClick={this.onSubmit} id="search_btn" className="btn btn-sm">
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
                                    id='dashboard.guide'
                                    defaultMessage='Guide'
                                />
                            </th>
                            <th>
                                <FormattedMessage
                                    id='dashboard.store.name'
                                    defaultMessage='Store Name'
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

                        <ReportTableGuiderStore report={report} />

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

export default ReportGuiderStoreComponent;
