import React, {Component} from "react";
import {FormattedMessage} from "react-intl"
import NumberFormat from 'react-number-format'


class ReportTable extends Component {

    constructor(props) {
        super(props);
        const data = {}

        this.state = {}
    }

    showTotal(report) {
        let total = parseInt('0');
        report.forEach(function (data) {
            total += parseInt(data.bill_tot_cost)
        })

        return total

    }

    renderStoreBill = reports => {

        return reports.map((data, key) => {
            const table = data.reports.map((row, key) => {
                if (key === 0) {
                    return (
                        <tr key={key}>
                            <td rowSpan={data.reports.length}>{data.guid_name}</td>
                            <td>{row.store_name}</td>
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
                        <td>{row.store_name}</td>
                        <td>
                            <NumberFormat
                                value={row.bill_tot_cost}
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
                        <NumberFormat value={this.showTotal(data.reports)} displayType={'text'} thousandSeparator={true}/>
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
            { report.length == 0 ?(<tr><td colSpan={3}>No data</td></tr>):this.renderStoreBill(report)}
            </tbody>
        );
    }
}

export default ReportTable;
