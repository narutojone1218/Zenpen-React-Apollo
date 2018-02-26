import React from 'react'
import styled from 'styled-components'
import Field from './Field'
import colors from '../../util/styles/colors'

export const CheckboxFieldContainer = styled.div`
  font-size: 16px;
  line-height: 24px;
  position: relative;
  background-color: transparent;
  transition: height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  flex: 1;
  padding: 12px 0;
  margin-left: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const CheckboxFieldControlLabel = styled.div`
  line-height: 22px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  z-index: 1;
  color: ${colors.blackish};
  ${({ hasError }) => (hasError ? `
    color: ${colors.red};
  ` : '')}
  ${({ isRequired }) => (isRequired ? `
    &:after {
      content: " *";
      font-size: 18px;
      vertical-align: top;
      color: ${colors.red};
    }
  ` : '')}
`

export const CheckboxFieldControl = styled.div`
  height: 25px;
  width: 25px;
  margin-right: 18px;
  border-radius: 0.1em;
  border: 1px solid #d2d2d2;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 130%;
  ${({ hasMouseHover, checked }) => (hasMouseHover || checked ? `
    border: 1px solid ${colors.brand};
  ` : '')}
`

const CheckboxFieldControlCheckmark = styled.i`
  opacity: 1;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  ${({ hasMouseHover, checked }) => (hasMouseHover && !checked ? `
    opacity: 0.3;
  ` : '')}
  ${({ checked }) => (checked ? `
    color: ${colors.brand};
  ` : '')}
`

export const CheckboxFieldHint = styled.span`
  position: absolute;
  line-height: 22px;
  top: 21px;
  left: 0;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  z-index: 1;
  transform: scale(0.75) translate(0px, 38px);
  transform-origin: left top 0px;
  user-select: none;
  opacity: 0.6;
  pointer-events: none;
  ${({ hasError }) => (hasError ? `
    color: ${colors.red};
  ` : '')}
`

class CheckboxFieldInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseHover: false,
      checked: !!this.props.input.value,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const checked = !this.state.checked
    this.props.input.onChange(checked)
    this.setState({ checked })
  }

  handleMouseEnter() {
    this.setState({ mouseHover: true })
  }

  handleMouseLeave() {
    this.setState({ mouseHover: false })
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
    const hasError = (!!meta.error && meta.touched)
    let errorHintText = null
    if (hasError) {
      errorHintText = meta.error
    }
    return (
      <Field flex={flex} hasIcon={icon !== null}>
        <CheckboxFieldContainer
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <CheckboxFieldControl
            hasMouseHover={this.state.mouseHover}
            hasError={hasError}
            checked={this.state.checked}
          >{this.state.checked || this.state.mouseHover
            ? <CheckboxFieldControlCheckmark
              hasMouseHover={this.state.mouseHover}
              checked={this.state.checked}
              className="fa fa-check"
            />
            : null}
          </CheckboxFieldControl>
          <CheckboxFieldControlLabel
            isRequired={isRequired}
            hasError={hasError}
          >{inputProps.label}
          </CheckboxFieldControlLabel>
          <CheckboxFieldHint
            hasError={hasError}
            hasTooltip={!!hintText}
          >
            {hasError ? errorHintText : hintText}
          </CheckboxFieldHint>
        </CheckboxFieldContainer>
      </Field>
    )
  }
}

CheckboxFieldInput.defaultProps = {

}

export default CheckboxFieldInput
