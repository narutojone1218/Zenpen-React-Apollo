import React from 'react'
import styled from 'styled-components'
import Field from './Field'
import { inputPlaceholderColor } from '../../util/styles/mixins'
import colors from '../../util/styles/colors'

const TextFieldStyled = styled.input`
  position: relative;
  width: 100%;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.87);
  cursor: inherit;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  opacity: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0 5px 0;
  margin-bottom: 5px;
  border-bottom: 1px solid ${colors.lightGray};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  ${({ hasFocus }) => (hasFocus ? `
    border-bottom: 1px solid ${colors.brand};
  ` : '')}
  ${({ hasError }) => (hasError ? `
    border-bottom: 1px solid ${colors.red};
  ` : '')}
`

export const PlaceholderHover = styled.div`
  position: absolute;
  font-size: 60%;
  padding: 2px 10px 2px 0;
  margin-left: 6px;
  top: -6px;
  border-bottom: 1px solid #eaeaea;
  color: #b4b3b3;
  opacity: 0;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  ${({ hasFocus }) => (hasFocus ? `
    border-bottom: 1px solid ${colors.brand};
    color: ${colors.brand};
  ` : '')}
  ${({ hasFocus, hasValue }) => ((hasFocus || hasValue) ? `
    opacity: 1;
  ` : '')}
  ${({ hasError }) => (hasError ? `
    opacity: 1;
    border-bottom: 1px solid ${colors.red};
    color: ${colors.red};
  ` : '')}
`

export const TextFieldIconStyled = styled.i`
  color: ${({ color }) => color};
  font-size: 1em;
  opacity: 1;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  ${({ hasFocus, hasValue }) => ((hasFocus || hasValue) ? `
    color: ${colors.brand};
    opacity: 0.5;
  ` : '')}
  ${({ hasError }) => (hasError ? `
    color: ${colors.red};
    opacity: 0.5;
  ` : '')}
`

TextFieldIconStyled.defaultProps = {
  color: '#b4b3b3',
}

export const TextFieldIconWrapper = styled.div`
  width: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TextFieldIcon = props => (
  <TextFieldIconWrapper>
    <TextFieldIconStyled {...props} />
  </TextFieldIconWrapper>
)

export const TextFieldContainer = styled.div`
  font-size: 16px;
  line-height: 24px;
  display: inline-block;
  position: relative;
  background-color: transparent;
  transition: height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  cursor: auto;
  flex: 1;
  padding: 12px 0;
  margin-left: 12px;
`

export const TextFieldLabel = styled.label`
  position: absolute;
  line-height: 22px;
  top: 21px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  z-index: 1;
  transform: scale(1) translate(0px, 0px);
  transform-origin: left top 0px;
  pointer-events: none;
  user-select: none;
  color: ${colors.blackish};
  opacity: 0.4;
  ${({ floating }) => (floating ? `
    transform: scale(0.75) translate(0px, -28px);
  ` : '')}
  ${({ hasFocus }) => (hasFocus ? `
    opacity: 0.8;
    color: ${colors.brand};
  ` : '')}
  ${({ hasError }) => (hasError ? `
    color: ${colors.red};
  ` : '')}
  ${({ floating, hasError }) => (hasError && floating ? `
    opacity: 0.8;
  ` : '')}
  ${({ isRequired, floating, hasFocus }) => (isRequired && floating ? `
    &:after {
      content: " *";
      font-size: 18px;
      vertical-align: top;
      color: ${hasFocus ? colors.red : 'inherit'};
    }
  ` : '')}
`

export const TextFieldHint = styled.span`
  position: absolute;
  line-height: 22px;
  top: 21px;
  left: 0;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  z-index: 1;
  transform: scale(0.75) translate(0px, 38px);
  transform-origin: left top 0px;
  user-select: none;
  opacity: 0.4;
  pointer-events: none;
  ${({ hasError }) => (hasError ? `
    opacity: 0.8;
    color: ${colors.red};
  ` : '')}
`

class TextFieldInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasFocus: false }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleFocus(e) {
    this.setState({ hasFocus: true })
    if (this.props.input && this.props.input.onFocus) {
      this.props.input.onFocus(e)
    }
  }

  handleBlur(e) {
    this.setState({ hasFocus: false })
    if (this.props.input && this.props.input.onBlur) {
      this.props.input.onBlur(e)
    }
  }

  render() {
    const {
      input,
      meta,
      icon,
      flex,
      validate,
      isRequired,
      hintText,
      ...inputProps
    } = this.props
    let placeholder = inputProps.placeholder
    const hasValue = (input.value !== '' && input.value !== null)
    const hasError = (!!meta.error && meta.touched)
    const displayFloatingPlaceholder = this.state.hasFocus || hasValue
    if (displayFloatingPlaceholder) {
      placeholder = null
    }
    let errorHintText = null
    if (hasError) {
      errorHintText = meta.error
    }
    let iconComponent = null
    if (icon) {
      iconComponent = (
        <TextFieldIcon
          hasError={hasError}
          hasValue={hasValue}
          hasFocus={this.state.hasFocus}
          className={icon}
        />
      )
    }
    return (
      <Field flex={flex} hasIcon={icon !== null}>
        {iconComponent}
        <TextFieldContainer>
          <TextFieldLabel
            isRequired={isRequired}
            hasError={hasError}
            hasValue={hasValue}
            hasFocus={this.state.hasFocus}
            floating={displayFloatingPlaceholder}
          >
            {inputProps.placeholder}
          </TextFieldLabel>
          <TextFieldStyled
            {...inputProps}
            {...input}
            hasError={hasError}
            hasValue={hasValue}
            hasFocus={this.state.hasFocus}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            placeholder=""
          />
          <TextFieldHint
            hasError={hasError}
            hasValue={hasValue}
            hasFocus={this.state.hasFocus}
            hasTooltip={!!hintText}
          >
            {hasError ? errorHintText : hintText}
          </TextFieldHint>
        </TextFieldContainer>
      </Field>
    )
  }
}

TextFieldInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
}

export default TextFieldInput
