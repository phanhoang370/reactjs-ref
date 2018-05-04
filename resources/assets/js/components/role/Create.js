import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateRoleFrom from "../forms/role/CreateForm";
import {FormattedMessage} from "react-intl"

class CreateRoleComponent extends React.Component {
  submit = data =>
    this.props.submit(data)

  render() {
    const { permissions } = this.props;

    return (
      <div className='company-add guider-add'>
          <div className='companyr-add'>
            <h2 className='title-guider-add'>
              <i className="fa fa-plane" aria-hidden="true"></i><FormattedMessage
                id='dashboard.role.create'
                defaultMessage='Role Create'
            />
            </h2>
            <div className="main-form">
              <CreateRoleFrom
                submit={this.submit}
                permissions={permissions}
              />
            </div>
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
};

export default CreateRoleComponent;
