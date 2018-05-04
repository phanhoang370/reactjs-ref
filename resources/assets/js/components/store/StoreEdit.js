import React from 'react';
import PropTypes from 'prop-types';
import EditStoreForm from './../forms/store/EditForm'
import './Store.css';

class RegisterStoreComponent extends React.Component {
    submit = (id, data) =>
        this.props.submit(id, data)

    render() {
        const { store, types } = this.props;

        return (
            <div className='guider-add store-register'>
                <h2 className='title-guider-add'>
                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i> 
                    Store Edit
                </h2>
                <div className="main-form">
                    <EditStoreForm
                        submit={this.submit}
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
  types: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
};

export default RegisterStoreComponent;
