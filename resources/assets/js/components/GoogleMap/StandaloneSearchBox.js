/* eslint-disable no-undef */
import React from "react"
import { withScriptjs } from "react-google-maps"
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'

const refs = {}

class GoogleMapStandaloneSearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  onSearchBoxMounted = ref => {
    refs.searchBox = ref;
  }

  onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    this.props.onPlacesChanged(places);
  }

  onChange = e => {
    this.setState({
      address: e.target.value
    })
  }

  componentWillMount() {
    this.setState({
      address: this.props.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.value) {
      this.setState({
        address: nextProps.value
      })
    }
  }

  render() {
    const { placeholder, disabled } = this.props;
    const { address } = this.state
    
    return (
      <StandaloneSearchBox
        ref={this.onSearchBoxMounted}
        onPlacesChanged={this.onPlacesChanged}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="form-control"
          value={address}
          disabled={disabled}
          onChange={this.onChange}
        />
      </StandaloneSearchBox>
    )
  }
}

export default withScriptjs(GoogleMapStandaloneSearchBox)
