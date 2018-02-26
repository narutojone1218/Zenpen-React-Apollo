import React from 'react'
import styled from 'styled-components'
import { Field as ReduxFormField } from 'redux-form'
import { inputPlaceholderColor } from '../../util/styles/mixins'
import Field from './Field'
import colors from '../../util/styles/colors'

const FieldContainerStyled = styled(Field)`
  margin: 0;
`

export const TextAreaFieldStyled = styled.textarea`
  background-color: transparent;
  border: none;
  display: block;
  margin: 0;
  width: 100%;
  padding: 0.4em;
  box-sizing: border-box;
  ${inputPlaceholderColor('#b3b3b3')}
`

export const PlaceholderHover = styled.div`
  position: absolute;
  font-size: 60%;
  padding: 2px 10px 2px 0;
  margin-left: 6px;
  top: -6px;
  border-bottom: 1px dotted #eaeaea;
  color: #b4b3b3;
  ${({ hasFocus }) => (hasFocus ? `
    border-bottom: none;
    color: ${colors.brand};
  ` : '')}
`

const TextFieldIcon = styled.i`
  color: #b4b3b3;
  font-size: 1em;
  position: absolute;
  top: 5px;
  right: 5px;
`

class TextAreaField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasFocus: false }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.renderField = this.renderField.bind(this)
  }

  handleFocus() {
    this.setState({ hasFocus: true })
  }

  handleBlur() {
    this.setState({ hasFocus: false })
  }

  renderField({ input, meta, ...inputProps }) {
    return (
      <FieldContainerStyled>
        <TextAreaFieldStyled {...inputProps} {...input} />
      </FieldContainerStyled>
    )
  }

  render() {
    const {
      icon,
      ...fieldProps
    } = this.props
    let iconComponent = null
    if (this.props.icon) {
      iconComponent = <TextFieldIcon className={icon} />
    }
    return (
      <Field hasIcon={icon !== null}>
        {iconComponent}
        <ReduxFormField
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...fieldProps}
          component={this.renderField}
        />
      </Field>
    )
  }
}

TextAreaField.defaultProps = {
  icon: null,
}

export default TextAreaField
