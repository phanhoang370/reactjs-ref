import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import Login from "../components/login/Login"


class LoginPage extends React.Component {

    submit = data =>
        this.props.login(data).then((data) =>
            {
                if(data.data.data.role=='primarynet') {
                    this.props.history.push("/dashboard/admin/report")
                }else
                {
                    this.props.history.push("/")
                }
            });

    render() {

        return (
            <Login submit={this.submit} />
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

export default connect(null, { login })(LoginPage);
