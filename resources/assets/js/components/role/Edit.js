import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditRoleFrom from "../forms/role/EditFrom";
import {FormattedMessage} from "react-intl"

class CreateRoleComponent extends React.Component {
  submit = (id, data) =>
    this.props.submit(id, data)

  render() {
    const { permissions, role } = this.props;

    return (
      <div className='company-add guider-add'>
            <h2 className='title-guider-add'>
              <i className="fa fa-plane" aria-hidden="true"></i><FormattedMessage
                id='dashboard.role.edit'
                defaultMessage='Role Edit'
            />
            </h2>
            <div className="main-form">
              <EditRoleFrom
                submit={this.submit}
                permissions={permissions}
                role={role}
              />
            </div>
      </div>
    );
  }
}

CreateRoleComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  permissions: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  role: PropTypes.shape({
    data: PropTypes.object.isRequired
  }).isRequired,
};

export default CreateRoleComponent;
