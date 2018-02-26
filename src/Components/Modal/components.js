import React from 'react'
import styled from 'styled-components'
import media from '../../util/styles/media'

export const ModalInner = styled.div`
  max-width: 1070px;
  background: white;
  border-radius: 0.3em;
  overflow-x: hidden;
  box-shadow: 0 3px 50px rgba(0,0,0,.15);
  margin: 0 auto;
  ${({ transparent }) => (transparent ? `
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  ` : '')}
`

export const ModalTitle = styled.div`
  text-align: center;
  font-size: 2em;
  color: #6b6b6b;
  background-color: #ececec;
  padding: 0.5em 2.5rem;
  ${({ transparent }) => (transparent ? `
    background-color: transparent;
    border-radius: 0;
  ` : '')}
  ${media.phone`
    font-size: 1.5em;
  `}
`

export const ModalBody = styled.div`
  padding: 2.5rem;
  position: relative;
  min-height:300px;
  ${media.phone`
    padding: 0 1.5em 1.5em 1.5em;
  `}
`

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  padding: 2.5rem;
  ${media.phone`
    padding: 0;
  `}
`

export const ModalCloseButtonWrapper = styled.div`
  float: right;
  cursor: pointer;
`

export const ModalCloseButton = (props) => (
  <ModalCloseButtonWrapper {...props}>
    <i className="fa fa-times-circle-o" />
  </ModalCloseButtonWrapper>
)
