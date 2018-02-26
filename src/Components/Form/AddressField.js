import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import { inputPlaceholderColor } from '../../util/styles/mixins'
import Field from './Field'
import { TextFieldIcon, TextFieldContainer } from './TextFieldInput'
import colors from '../../util/styles/colors'
import SectionLoader from '../SectionLoader'

const SearchWrapper = styled.div`
  flex: 1;
  .searchWrapper_input {
    background-color: transparent;
    border: none;
    display: block;
    margin: 0;
    width: 100%;
    font-size: 1em;
    padding: 0.4em;
    box-sizing: border-box;
    ${inputPlaceholderColor('#4e4e4e')}
  }
  .searchWrapper_autocomplete_container {
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    border-radius: 0 0 0.3em 0.3em;
    position: absolute;
    box-sizing: border-box;
    z-index: 100;
    width: 100%;
  }
`

const extractAddressComponent = (components, type, long = true) => {
  const component = components.find(_ => (_.types.indexOf(type) !== -1))
  if (!component) {
    return ''
  }
  if (long && component.long_name) {
    return component.long_name
  }
  return component.short_name
}

class AddressField extends React.Component {
  static isPlacesAvailable() {
    return !!window.google && !!window.google.maps && !!window.google.maps.places
  }

  constructor(props) {
    super(props)
    this.state = {
      formattedAddress: this.props.formattedAddress || '',
      placeId: this.props.placeId || null,
      placesAvailable: AddressField.isPlacesAvailable(),
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setValue = this.setValue.bind(this)
    this.handlePostUpdate = this.handlePostUpdate.bind(this)
    this.waitForPlacesAvailable = this.waitForPlacesAvailable.bind(this)
  }

  componentWillMount() {
    this.context.ensureExternalJavascriptLibrary('app.google.places')
    if (!this.state.placesAvailable) {
      this.waitForPlacesAvailable()
    }
  }

  setValue(value = {}, defaultValue = {}) {
    this.setState({
      formattedAddress: value.formattedAddress || '',
      placeId: value.placeId || '',
    })
  }

  formatGeocodeResponse(response) {
    if (!Array.isArray(response) || response.length === 0) {
      this.setState({ formattedAddress: null, placeId: null })
    }
    const result = response.pop()
    const c = result.address_components
    return {
      streetNumber: extractAddressComponent(c, 'street_number'),
      street: extractAddressComponent(c, 'route'),
      city: extractAddressComponent(c, 'locality'),
      region: extractAddressComponent(c, 'administrative_area_level_1'),
      regionCode: extractAddressComponent(c, 'administrative_area_level_1', false),
      country: extractAddressComponent(c, 'country'),
      countryCode: extractAddressComponent(c, 'country', false),
      postalCode: extractAddressComponent(c, 'postal_code'),
      postalCodeSuffix: extractAddressComponent(c, 'postal_code_suffix'),
      formattedAddress: result.formatted_address,
      placeId: result.place_id,
    }
  }

  handlePostUpdate() {
    if (this.props.clearOnSelect) {
      this.setValue()
    }
  }

  waitForPlacesAvailable() {
    if (this.state.placesAvailable === true) {
      return true
    }
    this.props.onLoadingBegin()
    if (!AddressField.isPlacesAvailable()) {
      return setTimeout(this.waitForPlacesAvailable, 1000)
    }
    this.setState({ placesAvailable: true })
    this.props.onLoadingEnd()
  }

  handleSelect(formattedAddress, placeId) {
    this.props.onSelect(formattedAddress, placeId)
    this.props.onLoadingBegin(formattedAddress, placeId)
    this.setState({ formattedAddress })
    this.resolveValue(formattedAddress, placeId)
      .then(geocoded => this.props.onUpdate({
        geocoded,
        formattedAddress,
        placeId,
      }))
      .then(this.handlePostUpdate)
      .then(_ => this.props.onLoadingEnd())
  }

  handleChange(formattedAddress) {
    this.setState({ formattedAddress, placeId: null })
  }

  resolveValue(formattedAddress, placeId) {
    let resolvePromise = null
    if (placeId || this.state.placeId) {
      resolvePromise = geocodeByPlaceId(placeId || this.state.placeId)
        .then(response => this.formatGeocodeResponse(response))
    } else {
      resolvePromise = geocodeByAddress(formattedAddress || this.state.formattedAddress)
        .then(response => this.formatGeocodeResponse(response))
    }
    return resolvePromise.then((geocoded) => {
      let gc = geocoded
      if (formattedAddress) {
        gc = { ...gc, formattedAddress }
      }
      if (formattedAddress && (geocoded.streetNumber === '' || geocoded.streetNumber === null)) {
        gc = { ...gc, streetAddress: formattedAddress.split(',')[0] }
      } else {
        gc = { ...gc, streetAddress: `${geocoded.streetNumber} ${geocoded.street}` }
      }
      gc = { ...gc, suggestedPlaceId: placeId }
      const { street, streetNumber, ...result } = gc
      return result
    })
  }

  render() {
    if (__SERVER__) {
      return null
    }

    const inputProps = {
      value: this.state.formattedAddress,
      onChange: this.handleChange,
    }

    const classNames = {
      input: 'searchWrapper_input',
      autocompleteContainer: 'searchWrapper_autocomplete_container',
    }

    const {
      icon,
      onSelect,
      clearOnSelect,
      onUpdate,
      onLoadingBegin,
      onLoadingEnd,
      ...extraProps
    } = this.props

    let iconComponent = null

    if (this.props.icon) {
      iconComponent = <TextFieldIcon color={colors.brand} className={icon} />
    }

    return (
      <Field hasIcon={icon !== null}>
        {iconComponent}
        <TextFieldContainer>
          <SearchWrapper>
            {this.state.placesAvailable ? (
              <PlacesAutocomplete
                inputProps={{ ...inputProps, ...extraProps }}
                onSelect={this.handleSelect}
                onEnterKeyDown={this.handleSelect}
                classNames={classNames}
              />
            ) : <input type="text" className={classNames.input} {...({ ...inputProps, ...extraProps })} />}
          </SearchWrapper>
        </TextFieldContainer>
      </Field>
    )
  }
}

AddressField.contextTypes = {
  ensureExternalJavascriptLibrary: PropTypes.func.isRequired,
}

AddressField.defaultProps = {
  icon: null,
  clearOnSelect: false,
  onUpdate: () => {},
  onLoadingBegin: () => {},
  onLoadingEnd: () => {},
  onSelect: () => {},
}

export default AddressField
