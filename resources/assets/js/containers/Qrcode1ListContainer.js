import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QrCode1ListComponent from "../components/qrcode/List";
import { fetchQrCode1Action } from './../actions/qrcode'
import { getCompanyGuiderAction } from './../actions/guider'
import { storeQrCode1Acion, getQrcode1Action, updateQrcode1Action } from './../actions/qrcode'

function addIdToObjectArray(data) {
    return data.map(function(item, index) {
        if (!item.id) {
            item.id = index;
        }
        
        return item;
    })
}

class Qrcode1ListContainer extends React.Component {

    componentDidMount() {
        this.props.fetchQrCode1();
        this.props.actFetchGuidersRequest();
    }

    updateQrcode1 = (id, data) => 
        this.props.updateQrcode1(id, data)

    getQrcode1 = (id, data) => 
        this.props.getQrcode1(id, data)

    submit = data => 
        this.props.create(data)

    render() {
        const { qrcodes, history, qrcode1Number, guiders } = this.props;

        const newQrCodes = addIdToObjectArray(qrcodes.data);

        return (
            <QrCode1ListComponent
                qrcodes={newQrCodes}
                history={history}
                guiders={guiders.data}
                qrcode1Number={qrcode1Number.data}
                updateQrcode1={this.updateQrcode1}
                getQrcode1={this.getQrcode1}
                submit={this.submit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        guiders: state.guiders,
        qrcodes: state.qrcodes,
        qrcode1Number: state.qrcode1Number,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchQrCode1: () => dispatch(fetchQrCode1Action()),
        actFetchGuidersRequest: () => dispatch(getCompanyGuiderAction()),
        getQrcode1: () => dispatch(getQrcode1Action()),
        updateQrcode1: (id, data) => dispatch(updateQrcode1Action(id, data)),
        create: data => dispatch(storeQrCode1Acion(data)),
    }
}

Qrcode1ListContainer.propTypes = {
    fetchQrCode1: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Qrcode1ListContainer);
