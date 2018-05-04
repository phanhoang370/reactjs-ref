import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateCountry from "../components/country/Create";
import { createCountry } from "../actions/country";

class CountryCreateContainer extends React.Component {

  submit = data =>
    this.props.createCountry(data);

  render() {
    const { cities, countries } = this.props;

    return (
      <CreateCountry 
        create={this.submit}
        cities={cities}
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
    createCountry: () => dispatch(createCountry())
  }
}

CountryCreateContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createCountry: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryCreateContainer);
