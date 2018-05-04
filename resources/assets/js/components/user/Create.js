import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateUserFrom from "../forms/user/CreateForm";
import { FormattedMessage } from "react-intl"

class CreateUserComponent extends React.Component {
  submit = data =>
    this.props.submit(data)

  render() {
    const { roles, companies, guiders, stores, guider } = this.props;

    return (
      <div className='guider-add'>
          <div className='companyr-add'>
            <h2 className='title-guider-add'>
              <i className="fa fa-plane" aria-hidden="true"></i>
              <FormattedMessage
                id='dashboard.user.create'
                defaultMessage='User Create'
              />
            </h2>
            <div className="main-form">
              <CreateUserFrom
                submit={this.submit}
                roles={roles}
                companies={companies}
                guiders={guiders}
                stores={stores}
                guider={guider}
              />
            </div>
          </div>
      </div>
    );
  }
}

CreateUserComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  roles: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  companies: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
  guiders: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
  stores: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
  guider: PropTypes.object,
};

export default CreateUserComponent;
