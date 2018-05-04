import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QrcodePrint from '../components/qrcodePrint/QrcodePrint'
import { printQrCodeAction } from './../actions/qrcode'
import PageNotFound from './../components/Errors/PageNotFound'

class QrcodePrintContainer extends React.Component {

    componentDidMount(){
        this.props.printQrCode(this.props.match.params.serial)
    }

    render() {
        const { history, qrcode } = this.props

        if (qrcode.error) {
            return <PageNotFound />
        }

        if (!qrcode.data) {
            return null;
        }
        
        return (
            <QrcodePrint
                history={history}
                qrcode1={qrcode.data.qrcode1}
                qrcode2={qrcode.data.qrcode2}
            />
        );
    }
}

QrcodePrintContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
};

const mapStateToProps = (state) => {
    return {
        qrcode: state.qrcode,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    printQrCode: serial => dispatch(printQrCodeAction(serial))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QrcodePrintContainer)
