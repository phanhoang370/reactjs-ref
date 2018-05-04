import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateUser from "../components/user/Create";
import { create } from "../actions/user";

class UserCreateContainer extends React.Component {
  submit = data =>
    this.props.create(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
        <CreateUser submit={this.submit} />
    );
  }
}

UserCreateContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  create: PropTypes.func.isRequired
};

export default connect(null, { create })(UserCreateContainer);
