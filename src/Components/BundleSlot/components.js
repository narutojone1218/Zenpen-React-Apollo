import React from 'react'

import styled from 'styled-components'
import media from '../../util/styles/media'

import {
  extra as extraImages,
} from '../../assets/images'

export const BundleSlotWrapper = styled.div`
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
  position: relative;
`

export const ClickToChangeWrapper = styled.div`
  color: rgba(0, 0, 0, 0.22);
  ${media.phone`
    display: none;
  `}
`

export const ClickToChange = () => (
  <ClickToChangeWrapper>
    (click to change)
  </ClickToChangeWrapper>
)


export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

export const SlotTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  background: url(${extraImages.greyJeanBg});
  border-top-left-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  border: 1px solid #d0d0d0;
`

export const SlotTitleWord = styled.span`

`

export const SlotTitleNumeric = styled.span`
  display: none;
`

export const SlotTitle = styled.div`
  flex: 1;
  font-size: 3em;
  color: #545454;
  padding-left: 1em;
  padding-right: 1em;
  ${media.tablet`
    padding-left: 0.5em;
    padding-right: 0.5em;
  `}
  ${media.phone`
    font-size: 1.5em;
    ${SlotTitleWord} {
      display: none;
    }
    ${SlotTitleNumeric} {
      display: inline-block;
    }
  `}
`

export const SlotSelection = styled.div`
  flex: 3;
  cursor: pointer;
  ${media.phone`
    flex: 5;
  `}
`

export const SlotPlaceholderWrapper = styled.div`
  padding: 1.45em 0 1.45em 0;
  text-align: center;
  font-size: 2em;
  background-color: #f3f3f3;
  border: 1px solid #e2e2e2;
  border-radius: 0.1em;
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: #9a9a9a;
  transition: all .2s;
  box-shadow: 0 0 10px transparent;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 149, 255, 0.36);
  }
  ${media.phone`
    font-size: 90%;
  `}
`

export const SlotPlaceholder = () => (
  <SlotPlaceholderWrapper>
    Click to Select a ZenPen
  </SlotPlaceholderWrapper>
)
