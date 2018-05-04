import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPasswordLinkAction } from "../actions/auth";
import ResetPasswordLinkComponent from "./../components/Auth/ResetPasswordLink"


class PasswordResetLinkContainer extends React.Component {

    resetPasswordLink = data => 
        this.props.resetPasswordLink(data)
    
    onClickToLogin = data => 
        this.props.history.push("/login")
    
    render() {
        return <ResetPasswordLinkComponent
            resetPasswordLink={this.resetPasswordLink}
            onClickToLogin={this.onClickToLogin}
        />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPasswordLink: data => dispatch(resetPasswordLinkAction(data)),
    }
}

PasswordResetLinkContainer.propTypes = {
    resetPasswordLink: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

export default connect(null, mapDispatchToProps)(PasswordResetLinkContainer);
