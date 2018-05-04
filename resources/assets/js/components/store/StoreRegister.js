import React from 'react';
import PropTypes from 'prop-types';
import CreateStoreForm from './../forms/store/CreateForm'
import './Store.css';
import {FormattedMessage} from "react-intl"

class RegisterStoreComponent extends React.Component {
    submit = data =>
        this.props.submit(data);

    onSearchByName = data =>
        this.props.onSearchByName(data);

    onSelectStore = id => 
        this.props.onSelectStore(id);

    render() {
        const { store, types } = this.props;

        return (
            <div className='guider-add store-register'>
                <h2 className='title-guider-add'>
                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                    <FormattedMessage
                        id='dashboard.store.registration'
                        defaultMessage='Store registration'
                    />
                </h2>
                <div className="main-form">
                    <CreateStoreForm
                        submit={this.submit}
                        onSearchByName={this.onSearchByName}
                        onSelectStore={this.onSelectStore}
                        store={store}
                        types={types}
                    />
                </div>
            </div>
        );
    }
}

RegisterStoreComponent.propTypes = {
    store: PropTypes.object,
    submit: PropTypes.func.isRequired,
    onSearchByName: PropTypes.func.isRequired,
    onSelectStore: PropTypes.func.isRequired,
};

export default RegisterStoreComponent;
