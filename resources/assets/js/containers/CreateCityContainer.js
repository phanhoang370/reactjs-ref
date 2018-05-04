import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateCity from "../components/city/Create";
import { createCity } from "../actions/city";

class CityCreateContainer extends React.Component {

  submit = data =>
    this.props.createCity(data);

  render() {
    const { cities, countries } = this.props;

    return (
      <CreateCity 
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
    createCity: () => dispatch(createCity())
  }
}

CityCreateContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CityCreateContainer);
