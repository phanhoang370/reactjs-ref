import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actFetchGuidersRequest, deleteGuider } from './../actions/guider'
import GuiderList from "../components/guider/GuiderList";

function addIdToObjectArray(data) {
    return data.map(function(item, index) {
        if (!item.id) {
            item.id = index;
        }
        
        return item;
    })
}

class CountryListContainer extends React.Component {
    componentDidMount() {
        this.props.actFetchGuidersRequest();
    }
    deleteGuider = id =>
        this.props.deleteGuider(id)

    render() {
        const { guiders, history } = this.props;
        const newGuiders = addIdToObjectArray(guiders.data);

        return (
            <GuiderList
                guiders={newGuiders}
                history={history}
                deleteGuider={this.deleteGuider}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        guiders: state.guiders,
    }
}

CountryListContainer.propTypes = {
    actFetchGuidersRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {actFetchGuidersRequest,deleteGuider})(CountryListContainer);
