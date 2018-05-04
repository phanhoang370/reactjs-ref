import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResetPasswordLinkForm from "../forms/Auth/ResetPasswordLinkForm";
import { FormattedMessage } from "react-intl"

class ResetPasswordLinkComponent extends React.Component {
  submit = data =>
    this.props.resetPasswordLink(data)
    
  onClickToLogin = () =>
    this.props.onClickToLogin()

  render() {

    return (
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <h2 className="title-guider-add text-center">
                <i className="fa fa-plane" aria-hidden="true"></i>
                Reset your password
              </h2>
              <div className="main-form">
                <ResetPasswordLinkForm
                  submit={this.submit}
                  onClickToLogin={this.onClickToLogin}
                />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

ResetPasswordLinkComponent.propTypes = {
  resetPasswordLink: PropTypes.func.isRequired,
  onClickToLogin: PropTypes.func.isRequired,
};

export default ResetPasswordLinkComponent;
