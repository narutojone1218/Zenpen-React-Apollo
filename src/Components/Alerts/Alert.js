import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import styled from 'styled-components'
import { removeAlert } from './actions'

const styles = {
  danger: {
    background: '#ff8e8e',
    text: '#480000',
    border: '#d07374',
    icon: 'fa fa-frown-o',
  },
  success: {
    background: '#a6e481',
    text: '#1e4800',
    border: '#8ec56c',
    icon: 'fa fa-check',
  },
  info: {
    background: '#dac9ff',
    text: '#3e394a',
    border: '#ccbbef',
    icon: 'fa fa-exclamation',
  },
  warning: {
    background: '#ffff89',
    text: '#5d5d31',
    border: '#d2d26e',
    icon: 'fa fa-exclamation-triangle',
  },
}

const AlertWrapper = styled.div`
  display: flex;
  background: ${({ alertType }) => styles[alertType].border};
  color: ${({ alertType }) => styles[alertType].text};
  border-radius: 0.2rem;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.11);
  font-size: 1.3em;
  border: 1px solid ${({ alertType }) => styles[alertType].border};
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ alertType }) => styles[alertType].border};
  }
`

const AlertIcon = styled.div`
  padding: 0.5em;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  min-width: 50px;
  text-align: center;
`

const AlertContentWrapper = styled.div`
  flex: 1;
  background: ${({ alertType }) => styles[alertType].background};
`

const AlertContent = styled.div`
  padding: 0.5em;
`

const AlertAction = styled.div`
  padding: 0.5em;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
`

const Alert = ({ className, alertType, message, removeAlert, id }) => (
  <AlertWrapper onClick={_ => removeAlert(id)} className={className} alertType={alertType}>
    <AlertIcon><i className={styles[alertType].icon} /></AlertIcon>
    <AlertContentWrapper alertType={alertType}>
      <AlertContent>
        {message}
      </AlertContent>
    </AlertContentWrapper>
    <AlertAction><i className="fa fa-times" /></AlertAction>
  </AlertWrapper>
)


const mapStateToProps = (state) => (state)

const mapDispatchToProps = dispatch => ({
  removeAlert: (id) => dispatch(removeAlert(id)),
})

export default compose(connect(null, mapDispatchToProps))(Alert)
