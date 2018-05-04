import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditCompanyForm from "../forms/company/EditForm";
import {FormattedMessage} from "react-intl"

class EditCompanyComponent extends React.Component {
  submit = (id, data) =>
    this.props.submit(id, data);

  render() {
    const { company, cities, countries } = this.props;
    
    return (
        <div className="company-add guider-add">
            <h1 className="title-guider-add">
                <FormattedMessage
                    id='dashboard.company.edit'
                    defaultMessage='Edit Company'
                />
            </h1>
            <div className="main-form">
                <EditCompanyForm
                    company={company}
                    submit={this.submit}
                    cities={cities}
                    countries={countries}
                />
            </div>
        </div>
    );
  }
}

EditCompanyComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
};

export default EditCompanyComponent;
