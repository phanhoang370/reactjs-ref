import React from 'react'
import TravelerListStoreComponent from '../components/traveler/ListStore'
import {fetchStoreAllAction} from './../actions/store'
import {fetchTypeAllAction} from './../actions/type'
import PropTypes from "prop-types";
import { connect } from "react-redux";

// const TravelerListStoreContainer = () => <TravelerListStoreComponent />

class TravelerListStoreContainer extends React.Component {

    componentDidMount() {
        this.props.fetchStore();
        this.props.fetchType();
    }

    onTypeClick = id => {
        this.props.fetchStore(id);
    }

    render() {
        const { stores, types} = this.props;
        return (
            <TravelerListStoreComponent
                stores={stores}
                types={types}
                onTypeClick={this.onTypeClick}
            />
        );
    }
}


const mapStateToProps = state => {
    return {
        stores:  state.stores,
        types:state.types
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStore: (id = null) => dispatch(fetchStoreAllAction(id)),
        fetchType: () => dispatch(fetchTypeAllAction()),
    }
}


TravelerListStoreContainer.propTypes = {
    fetchStore: PropTypes.func.isRequired,
    fetchType: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps) (TravelerListStoreContainer);
