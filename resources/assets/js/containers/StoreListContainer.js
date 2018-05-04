import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchStoreAction, deleteStoreAction} from './../actions/store'
import ListStore from "../components/store/ListStore";

function addIdToObjectArray(data) {
    return data.map(function(item, index) {
        if (!item.id) {
            item.id = index;
        }
        
        return item;
    })
}

class StoreListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStore();
    }

    deleteStore = (id) =>
        this.props.deleteStore(id)
    
    render() {
        const { stores, history } = this.props;


        const newStores = addIdToObjectArray(stores.data);

        return (
            <ListStore
                stores={newStores}
                history={history}
                deleteStore={this.deleteStore}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        stores:  state.stores,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStore: () => dispatch(fetchStoreAction()),
        deleteStore: id => dispatch(deleteStoreAction(id)),
    }
}

StoreListContainer.propTypes = {
    fetchStore: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreListContainer);
