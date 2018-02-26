/* eslint-disable no-underscore-dangle */
import React from 'react'
import styled from 'styled-components'
import { compose } from 'react-apollo'
import PropTypes from 'prop-types'
import { injectReducer } from 'redux-reducers-injector'
import {
  reducer as formReducer,
  reduxForm,
  change as reduxFormActionChange,
  stopSubmit as reduxFormActionStopSubmit,
} from 'redux-form'
import FieldSet from './FieldSet'
import { extra } from '../../assets/images'
import FormTitle from './FormTitle'
import colors from '../../util/styles/colors'
import SectionLoader from '../SectionLoader'

export const FormWrapper = styled.form`
  border-style: none;
  padding: 5px 5px 7px 5px;
  background: rgba(238, 238, 238, 1);
  border-radius: 0.3em;
  position: relative;
  ${({ secure }) => (secure ? `
    background: url(${extra.whiteWaveBgLight});
    background-color: #f0fff0;
    border: 1px solid #e1ede1;
  ` : '')}
  ${FieldSet} {
    margin-bottom: 7px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${FormTitle} {
  ${({secure}) => (secure ? `
    color: #656565;
  ` : '')}
  }
`

const SecureFormWrapper = styled.div`

`

const SecureFormBanner = styled.div`
  width: 70%;
  text-align: center;
  margin: 0 auto;
  font-size: 80%;
  padding: 5px 0;
  background-color: #e2e2e2;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  font-weight: lighter;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.69);
  position: relative;
  overflow-x: hidden;
  > i {
    color: ${colors.darkGreen};
  }
`

const SecureFormBannerShadow = styled.div`
  box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  right: -10px;
  
`

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      valid: this.props.valid,
    }
    this.updateField = this.updateField.bind(this)
    this.setFieldError = this.setFieldError.bind(this)
    if (__CLIENT__) {
      injectReducer('form', formReducer)
    }
  }

  getChildContext() {
    return {
      updateField: this.updateField,
      setFieldError: this.setFieldError,
    }
  }

  componentWillMount() {
    this.props.onValidation(this.state.valid)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.valid !== this.state.valid) {
      this.setState({ valid: nextProps.valid })
      this.props.onValidation(nextProps.valid)
    }
  }

  setFieldError(name, error) {
    this.props.dispatch(reduxFormActionStopSubmit(
      this.props.form,
      {
        [name]: error,
      },
    ))
  }

  updateField(name, value) {
    this.props.dispatch(reduxFormActionChange(
      this.props.form,
      name,
      value,
      true,
    ))
  }

  render() {
    const {
      loading,
      children,
      handleSubmit,
      secure,
      ...formProps
    } = this.props
    let secureFormBannerComponent = null
    if (this.props.displaySecureBanner) {
      secureFormBannerComponent = (
        <SecureFormBanner>
          <SecureFormBannerShadow />
          <i className="fa fa-expeditedssl" /> Secure Form
        </SecureFormBanner>
      )
    }
    return (
      <div>
        <SectionLoader isVisible={loading} />
        {secureFormBannerComponent}
        <FormWrapper method="post" secure={secure} onSubmit={handleSubmit} children={children} />
      </div>
    )
  }
}

Form.childContextTypes = {
  updateField: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
}

Form.defaultProps = {
  loading: false,
  secure: false,
  onValidation: () => {},
  displaySecureBanner: false,
}

export default compose(reduxForm())(Form)
