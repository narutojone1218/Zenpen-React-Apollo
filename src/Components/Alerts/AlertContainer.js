import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components'
import Alert from './Alert'
import Section from '../Section'

const StyledAlert = styled(Alert)``

const AlertContainerWrapper = styled.div`
  transition: all 0.5s;
  ${StyledAlert} {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${({ fixed }) => (fixed ? `
    position: absolute;
    z-index: 10;
    width: 100%;
    opacity: 0.8;
  ` : '')}
  .example-enter {
    opacity: 0.01;
  }
  
  .example-enter.example-enter-active {
    opacity: 1;
    transition: all 500ms ease-in;
  }
  
  .example-leave {
    opacity: 1;
  }
  
  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: all 300ms ease-in;
  }
`

const AlertContainer = ({ fixed, alerts }) => (
  <AlertContainerWrapper fixed={fixed}>
    <Section.Sub>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {alerts.map(alert => (
          <StyledAlert key={alert.id} {...alert} />
        ))}
      </ReactCSSTransitionGroup>
    </Section.Sub>
  </AlertContainerWrapper>
)

AlertContainer.defaultProps = {
  fixed: false,
}

const mapStateToProps = state => ({ alerts: Object.values(state.alerts) })

export default compose(connect(mapStateToProps))(AlertContainer)
