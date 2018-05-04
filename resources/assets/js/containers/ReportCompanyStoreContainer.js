import React from 'react'
import ReportCompany from '../components/report/ReportCompany'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { getReportCompanyStoreAction, clearReportAction } from './../actions/report'
import ReportCompanyStoreComponent from "../components/report/ReportCompanyStore"
import { fetchAllCompany } from './../actions/company'


class ReportCompanyStoreContainer extends React.Component {

    submit = (data) => {
        this.props.getReportCompanyStore(data);
    }

    componentWillUnmount() {
        this.props.clearReport()
    }

    render() {
        const { history, report } = this.props;
        return (
            <ReportCompanyStoreComponent
                report={report}
                history={history}
                submit={this.submit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReportCompanyStore: data => dispatch(getReportCompanyStoreAction(data)),
        clearReport: () => dispatch(clearReportAction()),
    }
}

ReportCompanyStoreContainer.propTypes = {
    getReportCompanyStore: PropTypes.func.isRequired,
    report: PropTypes.array.isRequired,
    clearReport: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportCompanyStoreContainer);
