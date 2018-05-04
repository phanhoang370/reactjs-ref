import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateCityForm from "../forms/CreateCityForm";
import { create } from "../../actions/city";
import {FormattedMessage} from "react-intl"

class CreateCity extends React.Component {
  submit = data =>
    this.props.create(data);

  render() {
    return (
        <div>
            <h1>
                <FormattedMessage
                    id='company.create'
                    defaultMessage='Create Company'
                />
            </h1>
            <CreateCityForm
                submit={this.submit}
            />
        </div>
    );
  }
}

CreateCity.propTypes = {
  create: PropTypes.func.isRequired,
};

export default CreateCity;
