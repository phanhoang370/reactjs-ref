import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateCompanyForm from "../forms/company/CreateForm";
import {FormattedMessage} from "react-intl"

class CreateCompanyComponent extends React.Component {
  submit = data =>
    this.props.submit(data)

  render() {
    const { cities, countries } = this.props;

    return (
      <div className='company-add guider-add'>
        <h2 className='title-guider-add'>
          <i className="fa fa-plane" aria-hidden="true"></i>
          <FormattedMessage
            id='dashboard.company.register'
            defaultMessage='Company registration'
          />
        </h2>
        <div className="main-form">
              <CreateCompanyForm
                submit={this.submit}
                cities={cities}
                countries={countries}
              />
        </div>
      </div>
    );
  }
}

CreateCompanyComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
};

export default CreateCompanyComponent;
