import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CompanyListComponent from "../components/company/CompanyList";
import { fetchAllCompany, deleteCompany } from './../actions/company'

function addIdToObjectArray(data) {
    return data.map(function(item, index) {
        if (!item.id) {
            item.id = index;
        }
        
        return item;
    })
}

class CompanyListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchAllCompany();
    }

    deleteCompany = id => 
        this.props.deleteCompany(id);

    render() {
        const { companies, history, deleteCompany } = this.props;

        const newCompanies = addIdToObjectArray(companies.data);

        return (
            <CompanyListComponent
                companies={newCompanies}
                history={history}
                deleteCompany={this.deleteCompany}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        companies: state.companies,
    }
}

CompanyListContainer.propTypes = {
    fetchAllCompany: PropTypes.func.isRequired,
    deleteCompany: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {fetchAllCompany, deleteCompany})(CompanyListContainer);
