import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateUserComponent from '../components/user/Create'
import { createUserAction } from '../actions/user'
import { getRoleForCreateUpdateAction } from '../actions/role'
import { getCompanyForCreateUserAction } from '../actions/company'
import { getGuiderForCreateUserAction, getGuiderById } from '../actions/guider'
import { getStoreForCreateUserAction } from '../actions/store'
import { hasRole, hasPermission } from './../utils/entrust'
import queryString from 'query-string'

class CreateUserContainer extends React.Component {
  componentDidMount() {
    const { auth: { user } } = this.props
    const query = queryString.parse(this.props.location.search)
    if (query.type === 'guide') {
      this.props.getGuiderById(query.id)
    }
    this.props.getRoleForCreateUpdate()
    if (hasRole(this.props.auth.user, 'company')) {
      this.props.getGuiderForCreateUser()
      this.props.getStoreForCreateUser()
    }
    if (hasRole(this.props.auth.user, 'primarynet')) {
      this.props.getCompanyForCreateUser()
    }
  }

  submit = data =>
    this.props.create(data)
      .then(() => this.props.history.push("/dashboard/user"));

  render() {
    const { roles, companies, guiders, stores, guider } = this.props;

    return (
      <CreateUserComponent 
        submit={this.submit}
        roles={roles}
        companies={companies}
        guiders={guiders}
        stores={stores}
        guider={guider.data}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    roles: state.roles,
    companies: state.companies,
    guiders: state.guiders,
    stores: state.stores,
    auth: state.auth,
    guider: state.guider,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRoleForCreateUpdate: () => dispatch(getRoleForCreateUpdateAction()),
    getCompanyForCreateUser: () => dispatch(getCompanyForCreateUserAction()),
    getGuiderForCreateUser: () => dispatch(getGuiderForCreateUserAction()),
    getStoreForCreateUser: () => dispatch(getStoreForCreateUserAction()),
    create: data => dispatch(createUserAction(data)),
    getGuiderById: id => dispatch(getGuiderById(id))
  }
}

CreateUserContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  create: PropTypes.func.isRequired,
  getRoleForCreateUpdate: PropTypes.func.isRequired,
  getCompanyForCreateUser: PropTypes.func.isRequired,
  getGuiderForCreateUser: PropTypes.func.isRequired,
  getStoreForCreateUser: PropTypes.func.isRequired,
  getGuiderById: PropTypes.func.isRequired,
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
  guider: PropTypes.shape({
    data: PropTypes.object
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserContainer);
