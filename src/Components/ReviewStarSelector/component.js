import React from 'react'
import styled from 'styled-components'

const ReviewStarSelectorWrapper = styled.div`
  ${({ readOnly }) => (readOnly ? '' : `
    cursor: pointer;
  `)}
`

const StarWrapper = styled.span`
  margin-right: 3px;
  -webkit-text-stroke-width: 1px;
  ${({ selected }) => (selected ? `
  color: #ffcc00;
  -webkit-text-stroke-color: #bd9700;
  ` : `
  color: #d6d6d6;
  -webkit-text-stroke-width: 0;
  -webkit-text-stroke-color: none;
  `)}
  &:last-child {
    margin-right: 0;
  }
  ${({ readOnly }) => (readOnly ? '' : `
    &:hover {
      color: #ffcc00;
    }
  `)}
`

class ReviewStarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value }
  }

  handleStarClick(value) {
    if (this.props.readOnly) {
      return
    }
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { max, readOnly } = this.props

    const stars = []

    for (let i = 1; i <= max; i++) {
      let selected = false
      if (i <= this.state.value) {
        selected = true
      }
      stars.push(<StarWrapper readOnly={readOnly} key={i} selected={selected}><i onClick={() => (this.handleStarClick(i))} className="fa fa-star" /></StarWrapper>)
    }

    return (
      <ReviewStarSelectorWrapper readOnly={readOnly}>
        {stars}
      </ReviewStarSelectorWrapper>
    )
  }
}

ReviewStarSelector.defaultProps = {
  value: 1,
  min: 1,
  max: 5,
  readOnly: true,
  onChange: (() => {}),
}

export default ReviewStarSelector
