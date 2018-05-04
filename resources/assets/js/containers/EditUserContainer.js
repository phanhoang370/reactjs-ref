import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditUserComponent from '../components/user/Edit'
import { editUserAction, getOneUserAction, resetPasswordAction } from '../actions/user'
import { getRoleForCreateUpdateAction } from '../actions/role'
import PageNotFound from './../components/Errors/PageNotFound'
import { hasRole, hasPermission } from './../utils/entrust'
import { getCompanyForCreateUserAction } from '../actions/company'
import { getGuiderForCreateUserAction } from '../actions/guider'
import { getStoreForCreateUserAction } from '../actions/store'

class EditUserContainer extends React.Component {
  componentDidMount() {
    this.props.getOneUser(this.props.match.params.id);
    const { auth: { user } } = this.props
    this.props.getRoleForCreateUpdate()
    if (hasRole(this.props.auth.user, 'company')) {
      this.props.getGuiderForCreateUser()
      this.props.getStoreForCreateUser()
    }
    if (hasRole(this.props.auth.user, 'primarynet')) {
      this.props.getCompanyForCreateUser()
    }
  }

  submit = (id, data) => 
    this.props.editUser(id, data)
      .then(() => this.props.history.push("/dashboard/user"));

  submitResetPassword = (id, data) => 
    this.props.resetPasswordAction(id, data)

  render() {
    const { user, roles, resetPassword, companies, guiders, stores } = this.props;

    if (user.error) {
      return <PageNotFound />
    }

    return (
      <EditUserComponent
        submit={this.submit}
        submitResetPassword={this.submitResetPassword}
        roles={roles}
        user={user}
        resetPassword={resetPassword}
        companies={companies}
        guiders={guiders}
        stores={stores}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    roles: state.roles,
    resetPassword: state.resetPassword,
    guiders: state.guiders,
    stores: state.stores,
    companies: state.companies,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOneUser: id => dispatch(getOneUserAction(id)),
    getRoleForCreateUpdate: () => dispatch(getRoleForCreateUpdateAction()),
    editUser: (id, data) => dispatch(editUserAction(id, data)),
    resetPasswordAction: (id, data) => dispatch(resetPasswordAction(id, data)),
    getCompanyForCreateUser: () => dispatch(getCompanyForCreateUserAction()),
    getGuiderForCreateUser: () => dispatch(getGuiderForCreateUserAction()),
    getStoreForCreateUser: () => dispatch(getStoreForCreateUserAction()),
  }
}

EditUserContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getOneUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  getRoleForCreateUpdate: PropTypes.func.isRequired,
  resetPasswordAction: PropTypes.func.isRequired,
  roles: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.object.isRequired
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
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserContainer);
