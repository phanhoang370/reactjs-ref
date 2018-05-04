import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateCompanyComponent from "../components/company/Create";
import { createAction } from "../actions/company";
import { getAllCity } from "../actions/city";
import { getAllCountry } from "../actions/country";

class CreateCompanyContainer extends React.Component {
  componentDidMount() {
    this.props.getAllCity();
    this.props.getAllCountry();
  }

  submit = data =>
    this.props.create(data)
      .then(() => this.props.history.push("/dashboard/company"))

  render() {
    const { cities, countries } = this.props;

    return (
      <CreateCompanyComponent 
        submit={this.submit}
        cities={cities}
        countries={countries}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.cities.data,
    countries: state.countries.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCity: () => dispatch(getAllCity()),
    getAllCountry: () => dispatch(getAllCountry()),
    create: data => dispatch(createAction(data))
  }
}

CreateCompanyContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  create: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyContainer);
