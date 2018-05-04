import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import QrcodeGenerationComponent from '../components/qrcodePrint/QrcodeGeneration'
import { getCompanyGuiderAction } from './../actions/guider'
import { create, getQrcode1Action } from './../actions/qrcode'

class QrcodeGenerationContainer extends React.Component{

    componentDidMount() {
        this.props.actFetchGuidersRequest();
        this.props.getQrcode1();
    }

    submit = data =>
        this.props.create(data)

    render() {
        const { guider, qrcode, qrcode1Number } = this.props

        if (qrcode.create) {
            return <Redirect to="/dashboard/qrcode" />
        }

        return (
            <QrcodeGenerationComponent
                submit={this.submit}
                guider={guider.data}
                qrcode={qrcode.data}
                qrcode1Number={qrcode1Number.data}
            />
        );
    }
}

QrcodeGenerationContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    create: PropTypes.func.isRequired,
    actFetchGuidersRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        guider: state.guiders,
        qrcode: state.qrcode,
        qrcode1Number: state.qrcode1Number,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        create: data => dispatch(create(data)),
        actFetchGuidersRequest: () => dispatch(getCompanyGuiderAction()),
        getQrcode1: () => dispatch(getQrcode1Action()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QrcodeGenerationContainer)
