import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPasswordAction, getUserResetPasswordAction } from "../actions/auth";
import ResetPasswordComponent from "./../components/Auth/ResetPassword"


class PasswordResetContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }
    componentWillMount() {
        this.props.getUserResetPassword(this.props.match.params.token)
            .then(response => {
                if (!response.data) {
                    this.props.history.push("/password/reset")
                } else {
                    this.setState({
                        email: response.data
                    })
                }
            })
    }

    resetPassword = data => {
        data.token = this.props.match.params.token
        data.email = this.state.email
        return this.props.resetPassword(data).then(() => {
            this.props.history.push("/login")
        })
    }
    
    onClickToLogin = data => 
        this.props.history.push("/login")
    
    render() {
        const { email } = this.state
        return <ResetPasswordComponent
            resetPassword={this.resetPassword}
            onClickToLogin={this.onClickToLogin}
            email={email}
        />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: data => dispatch(resetPasswordAction(data)),
        getUserResetPassword: data => dispatch(getUserResetPasswordAction(data)),
    }
}

PasswordResetContainer.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    getUserResetPassword: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

export default connect(null, mapDispatchToProps)(PasswordResetContainer);
