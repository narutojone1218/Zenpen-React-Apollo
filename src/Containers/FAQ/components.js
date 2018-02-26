import React from 'react'

import styled from 'styled-components'
import colors from '../../util/styles/colors'

import Section from '../../Components/Section'

export const FAQWrapper = styled.div`
  .Collapsible {
    background-color: none;
  }

  .Collapsible__contentInner {
    border: none;
    padding: 10px;
    margin-left: 10px;
    border-left: 2px solid ${colors.gray};
    
    p {
      margin-bottom: 10px;
      font-size: 1em;
      line-height: 1.4em;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .Collapsible__trigger {
    display: block;
    font-weight: 300;
    font-size: 1.5em;
    text-decoration: none;
    position: relative;
    padding: 10px;
    background: transparent;

    color: ${colors.brand};
    cursor: pointer;
    
  
  
    &:after {
      font-family: 'FontAwesome';
      content: '\f107';
      position: absolute;
      right: 10px;
      top: 10px;
      display: block;
      transition: transform 300ms;
    }
  
    &.is-open {
      &:after {
        transform: rotateZ(180deg);
      }
      background: ${colors.lightGray};
    }
    &:hover {
      background: ${colors.lightGray};
    }
  
    &.is-disabled {
      opacity: 0.5;
      background-color: grey;
    }
  }
  
  .CustomTriggerCSS {
    background-color: lightcoral;
    transition: background-color 200ms ease;  
  }
  
  .CustomTriggerCSS--open {
    background-color: darkslateblue;
  }
  
  .Collapsible__custom-sibling {
    padding: 5px;
    font-size: 12px;
    background-color: #CBB700;
    color: black;
  }
`

export const Answer = styled.p`
  font-size: 1em;
  line-height: 1.4em;
`
