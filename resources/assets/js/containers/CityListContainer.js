import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CityList from "../components/city/CityList";
import { getAllCity } from './../actions/city'

class CityListContainer extends React.Component {
    componentDidMount() {
        this.props.getAllCity();
    }

    render() {
        const { cities, history } = this.props;

        return (
            <CityList
                cities={cities}
                history={history}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities,
    }
}

CityListContainer.propTypes = {
    getAllCity: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getAllCity})(CityListContainer);
