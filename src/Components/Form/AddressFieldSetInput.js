import React from 'react'
import Row from './Row'
import TextField from './TextField'
import AddressField from './AddressField'
import SectionLoader from '../SectionLoader'
import FieldSet from './FieldSet'
import ExpandableFields from './ExpandableFields'
import { postalCode as normalizePostalCode } from './normalize'
import PropTypes from 'prop-types'

class AddressFieldSetInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAddress: this.props.hasInitialAddress,
      loading: false,
    }
    this.handleAddressSearchUpdate = this.handleAddressSearchUpdate.bind(this)
    this.handleAddressSearchLoadingBegin = this.handleAddressSearchLoadingBegin.bind(this)
    this.handleAddressSearchLoadingEnd = this.handleAddressSearchLoadingEnd.bind(this)
  }

  handleAddressSearchUpdate(result) {
    const fieldSetName = this.props.fieldSetName

    this.props.updateField(`${fieldSetName}.streetAddress`, result.geocoded.streetAddress)
    this.props.updateField(`${fieldSetName}.unit`, '')
    this.props.updateField(`${fieldSetName}.city`, result.geocoded.city)
    this.props.updateField(`${fieldSetName}.region`, result.geocoded.region)
    this.props.updateField(`${fieldSetName}.postalCode`, result.geocoded.postalCode)

    this.props.updateField(`${fieldSetName}.regionCode`, result.geocoded.regionCode)
    this.props.updateField(`${fieldSetName}.country`, result.geocoded.country)
    this.props.updateField(`${fieldSetName}.countryCode`, result.geocoded.countryCode)
    this.props.updateField(`${fieldSetName}.postalCodeSuffix`, result.geocoded.postalCodeSuffix)
    this.props.updateField(`${fieldSetName}.formattedAddress`, result.geocoded.formattedAddress)
    this.props.updateField(`${fieldSetName}.placeId`, result.geocoded.placeId)
    this.props.updateField(`${fieldSetName}.suggestedPlaceId`, result.geocoded.suggestedPlaceId)

    this.setState({ hasAddress: true })
  }

  handleAddressSearchLoadingBegin() {
    this.setState({ loading: true })
  }

  handleAddressSearchLoadingEnd() {
    this.setState({ loading: false })
  }

  render() {
    let FieldSetComponent = React.Fragment
    let fieldSetComponentProps = {}

    if (this.props.asFieldSet) {
      FieldSetComponent = FieldSet
      fieldSetComponentProps = {
        standalone: !this.state.hasAddress,
      }
    }
    return (
      <FieldSetComponent {...fieldSetComponentProps}>
        <SectionLoader size="tiny" isVisible={this.state.loading} />
        <Row noTopMargin noBottomMargin={!this.state.hasAddress} special>
          <AddressField
            clearOnSelect
            onLoadingBegin={this.handleAddressSearchLoadingBegin}
            onLoadingEnd={this.handleAddressSearchLoadingEnd}
            onUpdate={this.handleAddressSearchUpdate}
            placeholder={this.props.searchText}
            icon="fa fa-search"
            name="addressSelector"
          />
        </Row>
        <ExpandableFields>
          <Row>
            <TextField
              isRequired={this.props.isRequired}
              name="streetAddress"
              placeholder="Street Address"
              maxLength={200}
              icon="fa fa-home"
            />
          </Row>
          <Row>
            <TextField
              name="unit"
              icon="fa fa-building-o"
              placeholder="Unit or Apartment Number"
              maxLength={30}
            />
          </Row>
          <Row>
            <TextField
              isRequired={this.props.isRequired}
              name="city"
              icon="fa fa-map-marker"
              placeholder="City"
              maxLength={100}
            />
            <TextField
              isRequired={this.props.isRequired}
              name="region"
              icon="fa fa-map-marker"
              placeholder="State or Region"
              maxLength={100}
            />
          </Row>
          <Row>
            <TextField
              isRequired={this.props.isRequired}
              name="postalCode"
              icon="fa fa-globe"
              placeholder="Postal Code"
              normalize={normalizePostalCode}
              maxLength={25}
            />
          </Row>
        </ExpandableFields>
      </FieldSetComponent>
    )
  }
}

AddressFieldSetInput.defaultProps = {
  updateField: () => {},
  fieldSetName: 'address',
  hasInitialAddress: false,
  searchText: 'Locate Address',
  asFieldSet: true,
  isRequired: false,
}

export default AddressFieldSetInput
