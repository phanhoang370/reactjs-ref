import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Qrcode2Print from '../components/qrcodePrint/Qrcode2Print'

class Qrcode2PrintContainer extends React.Component{

    render() {
        return (
            <Qrcode2Print
                history={this.props.history}
                qrcode={this.props.qrcode}
            />
        );
    }
}

Qrcode2PrintContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

const mapStateToProps = (state) => {
    return {
        qrcode: state.qrcode,
    }
}

export default connect(mapStateToProps,null)(Qrcode2PrintContainer)
