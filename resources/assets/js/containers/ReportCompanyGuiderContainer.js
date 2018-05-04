import React from 'react'
import ReportCompany from '../components/report/ReportCompany'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { getReportCompanyGuiderAction, clearReportAction } from './../actions/report'
import ReportCompanyGuiderComponent from "../components/report/ReportCompanyGuider"
import { fetchAllCompany } from './../actions/company'


class ReportCompanyStoreContainer extends React.Component {

    submit = (data) => {
        this.props.getReportCompanyGuider(data);
    }

    componentWillUnmount() {
        this.props.clearReport()
    }

    render() {
        const { history, report } = this.props;
        return (
            <ReportCompanyGuiderComponent
                report={report}
                history={history}
                submit={this.submit}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReportCompanyGuider: data => dispatch(getReportCompanyGuiderAction(data)),
        clearReport: () => dispatch(clearReportAction()),
    }
}

ReportCompanyStoreContainer.propTypes = {
    getReportCompanyGuider: PropTypes.func.isRequired,
    clearReport: PropTypes.func.isRequired,
    report: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportCompanyStoreContainer);
