import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PolicyCompanyForm from "../forms/company/PolicyForm";
import { FormattedMessage } from "react-intl"

class EditCompanyComponent extends React.Component {
  submit = data =>
    this.props.submit(data);

  render() {
    const { company } = this.props;
    
    return (
        <div className="company-add guider-add">
            <h1 className="title-guider-add">
                <FormattedMessage
                    id='dashboard.company.edit'
                    defaultMessage='Edit Company'
                />
            </h1>
            <div className="main-form">
                <PolicyCompanyForm
                    company={company}
                    submit={this.submit}
                />
            </div>
        </div>
    );
  }
}

EditCompanyComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
};

export default EditCompanyComponent;
