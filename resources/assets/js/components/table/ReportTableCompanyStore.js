import React, {Component} from "react";
import {FormattedMessage} from "react-intl"
import NumberFormat from 'react-number-format'


class ReportTableByMonthYear extends Component {

    constructor(props) {
        super(props);
        const data = {}

        this.state = {}
    }

    showTotalSale(report) {
        let total = parseInt('0');
        report.forEach(function (data) {
            total += parseInt(data.bill_tot_cost)
        })

        return total
    }

    showTotalCommission(report) {
        let total = parseInt('0');
        report.forEach(function (data) {
            total += parseInt(data.com_fee_cost)
        })

        return total
    }

    renderStoreBill = reports => {

        return reports.map((data, key) => {
            const table = data.reports.map((row, key) => {
                if (key === 0) {
                    return (
                        <tr key={key}>
                            <td rowSpan={data.reports.length}>{data.store_name}</td>
                            <td>{row.bill_date}</td>
                            <td>
                                <NumberFormat
                                    value={row.bill_tot_cost}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            </td>
                            <td>
                                <NumberFormat
                                    value={row.bill_tot_cost}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            </td>
                        </tr>
                    )
                }
                return (
                    <tr key={key}>
                        <td>{row.bill_date}</td>
                        <td>
                            <NumberFormat
                                value={row.bill_tot_cost}
                                displayType={'text'}
                                thousandSeparator={true}
                            />
                        </td>
                        <td>
                            <NumberFormat
                                value={row.com_fee_cost}
                                displayType={'text'}
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>
                )
            });
            data.reports.length ?
            table.push(<tr key={key + data.reports.length}>
                    <td colSpan={2}><FormattedMessage
                        id='dashboard.total'
                        defaultMessage='Total'
                    /></td>
                    <td>
                        <NumberFormat value={this.showTotalSale(data.reports)} displayType={'text'} thousandSeparator={true}/>
                    </td>
                    <td>
                        <NumberFormat value={this.showTotalCommission(data.reports)} displayType={'text'} thousandSeparator={true}/>
                    </td>
                </tr>
            )
            :null
            return table;
        })
    }


    render() {
        const {report} = this.props;
        return (
            <tbody>
            { report.length == 0 ?(<tr><td colSpan={4}>No data</td></tr>):this.renderStoreBill(report)}
            </tbody>
        );
    }
}

export default ReportTableByMonthYear;
