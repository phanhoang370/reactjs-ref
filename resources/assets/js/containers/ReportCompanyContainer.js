import React from 'react'
import ReportCompany from '../components/report/ReportCompany'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {  getAllReport } from './../actions/report'
import {actFetchGuidersRequest} from "../actions/guider";


class ReportCompanyContainer extends React.Component {
    componentDidMount() {
        // this.props.getAllReport();
        this.props.actFetchGuidersRequest();
    }

    submit = (data) => {
        this.props.getAllReport(data);
    }

    render() {
        const { history, report, guider } = this.props;
        return (
            <ReportCompany
                report={report}
                history={history}
                guider={guider.data}
                submit={this.submit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report,
        guider: state.guiders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllReport: data => dispatch(getAllReport(data)),
        actFetchGuidersRequest: () => dispatch(actFetchGuidersRequest()),
    }
}

ReportCompanyContainer.propTypes = {
    getAllReport: PropTypes.func.isRequired,
    actFetchGuidersRequest: PropTypes.func.isRequired,
    report: PropTypes.array.isRequired,
    guider: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportCompanyContainer);
