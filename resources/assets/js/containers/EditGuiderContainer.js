import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GuiderEdit from './../components/guider/GuiderEdit'
import {getGuiderById} from './../actions/guider'
import {getGuiderManagerAction, edit} from './../actions/guider'
import { getAllCity } from "../actions/city";
import PageNotFound from './../components/Errors/PageNotFound'

class EditGuiderContainer extends React.Component {

    onCancel = () =>
        this.props.history.push("/dashboard/guider")

    submit = data =>
        this.props.edit(data,this.props.match.params.id)
            .then(() => this.props.history.push("/dashboard/guider"))

    componentWillMount(){
        this.props.getGuiderById(this.props.match.params.id)
        this.props.getGuiderManager()
        this.props.getAllCity()
    }

    render() {
        const { guider, guiders, cities } = this.props;

        if (guider.error) {
            return <PageNotFound />
        }

        return (
            <GuiderEdit
                submit={this.submit}
                itemEditing={guider.data}
                guider={guiders.data}
                cities={cities}
                cancel={this.onCancel}
            />
        );
    }
}

EditGuiderContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    edit: PropTypes.func.isRequired,
    cities: PropTypes.shape({
        data: PropTypes.array.isRequired
    }).isRequired,
};

const mapStateToProps = state => {
    return {
        guider: state.guider,
        guiders: state.guiders,
        cities: state.cities,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        edit: (data, id) => dispatch(edit(data, id)),
        getAllCity: () => dispatch(getAllCity()),
        getGuiderById: id => dispatch(getGuiderById(id)),
        getGuiderManager: () => dispatch(getGuiderManagerAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGuiderContainer);
