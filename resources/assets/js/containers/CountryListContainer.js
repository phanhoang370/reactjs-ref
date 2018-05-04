import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CountryList from "../components/country/CountryList";
import { getAllCountry } from './../actions/country'

class CountryListContainer extends React.Component {
    componentDidMount() {
        this.props.getAllCountry();
    }

    render() {
        const { countries, history } = this.props;

        return (
            <CountryList
                countries={countries}
                history={history}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries,
    }
}

CountryListContainer.propTypes = {
    getAllCountry: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getAllCountry})(CountryListContainer);
