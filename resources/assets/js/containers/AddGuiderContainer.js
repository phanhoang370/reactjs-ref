import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GuiderAdd from "../components/guider/GuiderAdd";
import {create, getGuiderManagerAction} from './../actions/guider'
import { getAllCity } from "../actions/city";


class AddGuiderContainer extends React.Component {

    componentDidMount() {
        this.props.getGuiderManager();
        this.props.getAllCity();
    }

    submit = data =>
        this.props.create(data).then(response => 
            this.props.history.push(`/dashboard/user/create?type=guide&id=${response.data.guid_id}`)
        );

    onCancel = () => 
        this.props.history.push("/dashboard/guider");

    render() {

        const { guiders, cities } = this.props

        return (
            <GuiderAdd
                submit={this.submit}
                guiders={guiders.data}
                cities={cities}
                cancel={this.onCancel}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        guiders: state.guiders,
        cities: state.cities,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: data => dispatch(create(data)),
        getAllCity: () => dispatch(getAllCity()),
        getGuiderManager: () => dispatch(getGuiderManagerAction())
    }
}

AddGuiderContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    create: PropTypes.func.isRequired,
    getGuiderManager: PropTypes.func.isRequired,
    getAllCity: PropTypes.func.isRequired,
    cities: PropTypes.shape({
        data: PropTypes.array.isRequired
    }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGuiderContainer);
