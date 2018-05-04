import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditCompanyComponent from '../components/company/Edit'
import { editCompany, getOneCompany } from '../actions/company'
import { getAllCity } from '../actions/city'
import { getAllCountry } from '../actions/country'
import PageNotFound from './../components/Errors/PageNotFound'

class EditCompanyContainer extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        company: {},
          error: false
      }
  }

  componentDidMount() {
    this.props.getAllCity();
    this.props.getAllCountry();
    this.props.getOneCompany(this.props.match.params.id);
  }

  submit = (id, data) => 
    this.props.editCompany(id, data).then(() => 
      this.props.history.push('/dashboard/company'))


    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.company) {
          this.setState({
              company: nextProps.company.data,
              error: nextProps.company.error
          })
        }
    }
  render() {
    const { cities, countries } = this.props;
    const { company, error } = this.state

    if (error) {
      return <PageNotFound />
    }

    return (
      <EditCompanyComponent 
        company={company}
        cities={cities.data}
        countries={countries.data}
        submit={this.submit}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    company: state.company,
    cities: state.cities,
    countries: state.countries,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOneCompany: id => dispatch(getOneCompany(id)),
    getAllCity: () => dispatch(getAllCity()),
    getAllCountry: () => dispatch(getAllCountry()),
    editCompany: (id, data) => dispatch(editCompany(id, data))
  }
}

EditCompanyContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getOneCompany: PropTypes.func.isRequired,
  editCompany: PropTypes.func.isRequired,
  getAllCity: PropTypes.func.isRequired,
  getAllCountry: PropTypes.func.isRequired,
  cities: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  countries: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  company: PropTypes.shape({
    data: PropTypes.object.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyContainer);
