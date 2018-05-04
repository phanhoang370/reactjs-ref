import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResetPasswordForm from "../forms/Auth/ResetPasswordForm";
import { FormattedMessage } from "react-intl"

class ResetPasswordComponent extends React.Component {
  submit = data =>
    this.props.resetPassword(data)
    
  onClickToLogin = () =>
    this.props.onClickToLogin()

  render() {
    const { email } = this.props
    
    return (
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <h2 className="title-guider-add text-center">
                <i className="fa fa-plane" aria-hidden="true"></i>
                Change password for {email}
              </h2>
              <div className="main-form">
                <ResetPasswordForm
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

ResetPasswordComponent.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  onClickToLogin: PropTypes.func.isRequired,
};

export default ResetPasswordComponent;
