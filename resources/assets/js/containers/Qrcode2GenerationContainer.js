import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Qrcode2Generation from '../components/qrcodePrint/Qrcode2Generation'
import {fetchStoreAction} from './../actions/store'
import {create} from './../actions/qrcode2'

class Qrcode2GenerationContainer extends React.Component{

    componentDidMount() {
        this.props.fetchStoreAction();
    }

    submit = data =>
        this.props.create(data).then(() => this.props.history.push("/dashboard/qrcode/print/qrcode2"));

    render() {
        return (
            <Qrcode2Generation
                submit={this.submit}
                store={this.props.store}
            />
        );
    }
}

Qrcode2GenerationContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    create: PropTypes.func.isRequired,
    fetchStoreAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        store: state.stores.data,
    }
}

export default connect(mapStateToProps,{create,fetchStoreAction})(Qrcode2GenerationContainer)
