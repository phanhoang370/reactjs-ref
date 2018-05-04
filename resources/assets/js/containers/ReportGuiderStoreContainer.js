import React from 'react'
import ReportCompany from '../components/report/ReportCompany'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { getReportGuiderStoreAction } from './../actions/report'
import ReportGuiderStoreComponent from "../components/report/ReportGuiderStore";


class ReportGuiderStoreContainer extends React.Component {

    submit = (data) => {
        this.props.getReportGuiderStore(data);
    }

    render() {
        const { history, report, guider } = this.props;
        return (
            <div>
                <ReportGuiderStoreComponent
                    report={report}
                    history={history}
                    guider={guider}
                    submit={this.submit}
                />
            </div>
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
        getReportGuiderStore: data => dispatch(getReportGuiderStoreAction(data)),
    }
}

ReportGuiderStoreContainer.propTypes = {
    getReportGuiderStore: PropTypes.func.isRequired,
    report: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportGuiderStoreContainer);
