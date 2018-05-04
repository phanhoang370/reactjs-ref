import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePageCompanyComponent from '../components/home/HomePageCompany'
import HomePageComponent from '../components/home/HomePage'
import { fetchStoreLocationAction, fetchStoreTopAction } from './../actions/company'
import { hasRole, hasPermission } from './../utils/entrust'

class HomePageContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            storesLocation: {}
        }
    }
    // componentDidMount() {
    //     if (hasRole(this.props.auth.user, 'company')) {
    //         this.props.fetchStoreLocation();
    //         this.props.fetchStoreTop();
    //     }
    // }
    componentWillMount(){
        if (hasRole(this.props.auth.user, 'company')) {
            this.props.fetchStoreLocation();
            this.props.fetchStoreTop();
        }
    }
    getDefaultCenter() {
        const { storesLocation } = this.props
        if (storesLocation.data.length == 0) {
            return
        }
        if (storesLocation.data.length == 1) {
            return {
                lat: storesLocation.data[0].lat,
                lng: storesLocation.data[0].lng,
            }
        }

        var latMax = storesLocation.data.map(function(store){
            return store.lat
        }).reduce(function (previousValue, currentValue) {
            if(previousValue > currentValue) {
                return previousValue;
            } else {
                return currentValue;
            }
        })

        var latMin = storesLocation.data.map(function(store){
            return store.lat
        }).reduce(function (previousValue, currentValue) {
            if(previousValue < currentValue) {
                return previousValue;
            } else {
                return currentValue;
            }
        })

        const lat = (latMax + latMin) / 2

        var lngMax = storesLocation.data.map(function(store){
            return store.lng
        }).reduce(function (previousValue, currentValue) {
            if(previousValue > currentValue) {
                return previousValue;
            } else {
                return currentValue;
            }
        })

        var lngMin = storesLocation.data.map(function(store){
            return store.lng
        }).reduce(function (previousValue, currentValue) {
            if(previousValue < currentValue) {
                return previousValue;
            } else {
                return currentValue;
            }
        })
        const lng = (lngMax + lngMin) / 2

        return {
            lat: lat,
            lng: lng,
        }
    }

    calculateZoomLevel() {

        const { storesLocation } = this.props
        if (storesLocation.data.length == 0) {
            return 3
        }
        if (storesLocation.data.length == 1) {
            return 16
        }
        const latMax = Math.max.apply(Math, storesLocation.data.map(function(store){ return store.lat; })) | 0
        const latMin = Math.min.apply(Math, storesLocation.data.map(function(store){ return store.lat; })) | 0
        const lngMax = Math.max.apply(Math, storesLocation.data.map(function(store){ return store.lng; })) | 0
        const lngMin = Math.min.apply(Math, storesLocation.data.map(function(store){ return store.lng; })) | 0

        let angle = (latMax - latMin) > (lngMax - lngMin) ? (latMax - latMin) : (lngMax - lngMin)

        if (angle == 0) {
            return 15
        }

        // a constant in Google's map projection=
        var GLOBE_WIDTH = 256;
        if (angle < 0) {
          angle += 360;
        }
        let pixelWidth = 200;
        let zoom = Math.round(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);

        return zoom;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.storesLocation) {
            this.setState({
                storesLocation: nextProps.storesLocation.data,
            })
        }

    }

    render() {
        const { storesLocation,stores, auth: {user} } = this.props;
        // const {storesLocation}=this.state;
        // console.log(storesLocation.data);

        if (hasRole(user, 'company')) {
            return (
                <HomePageCompanyComponent 
                    stores={stores.data}
                    storesLocation={storesLocation.data}
                    defaultCenter={this.getDefaultCenter()}
                    defaultZoom={this.calculateZoomLevel()}
                />
            )
        }

        return (
            <HomePageComponent />
        )
    }
}

const mapStateToProps = state => ({
    storesLocation: state.storesLocation,
    stores: state.stores,
    auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
    fetchStoreLocation: () => dispatch(fetchStoreLocationAction()),
    fetchStoreTop: () => dispatch(fetchStoreTopAction()),
})

HomePageContainer.propTypes = {
    fetchStoreLocation: PropTypes.func.isRequired,
    fetchStoreTop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
