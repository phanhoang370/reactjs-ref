import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PolicyCompanyComponent from '../components/company/Policy'
import { editCompanyPolicyAction, getPolicyAction } from '../actions/company'
import PageNotFound from './../components/Errors/PageNotFound'

class PolicyCompanyContainer extends React.Component {
  componentDidMount() {
    this.props.getPolicy();
  }

  submit = data => 
    this.props.editCompanyPolicy(data).then(() => 
      this.props.history.push('/'))

  render() {
    const { company } = this.props;

    return (
      <PolicyCompanyComponent 
        company={company.data}
        submit={this.submit}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    company: state.company,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPolicy: () => dispatch(getPolicyAction()),
    editCompanyPolicy: data => dispatch(editCompanyPolicyAction(data))
  }
}

PolicyCompanyContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getPolicy: PropTypes.func.isRequired,
  editCompanyPolicy: PropTypes.func.isRequired,
  company: PropTypes.shape({
    data: PropTypes.object.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyCompanyContainer);
