/* eslint-disable no-undef */
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

class MapWithAMarkerClusterer extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         storesLocation: {}
    //     }
    // }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps && nextProps.markers) {
    //         this.setState({
    //             storesLocation: nextProps.markers,
    //         })
    //     }
    //     // console.log(nextProps);
    //
    // }

  render() {
    const { 
      markers, 
      gridSize = 60, 
      defaultZoom = 3, 
      defaultCenter 
    } = this.props

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={gridSize}
        >
          {
              markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MapWithAMarkerClusterer))
