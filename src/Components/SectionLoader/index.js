import React from 'react'

import style from './style'
import colors from '../../util/styles/colors'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const sizes = {
  tiny: '30px',
  small: '50px',
  medium: '100px',
  larger: '200px',
}

const SectionLoaderWrapper = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  position: absolute;
  opacity: 0.7;
  transition: all .2s;
  z-index: 25;
  pointer-events: none;
  ${({ isVisible }) => (isVisible ? '' : `
    z-index: -100;
    opacity: 0;
    pointer-events: inherit;
  `)}
`

SectionLoaderWrapper.propTypes = {
  isVisible: PropTypes.bool,
}

const LoaderCircleAnimationWrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: ${({ size }) => (sizes[size || 'small'])};
  height: ${({ size }) => (sizes[size || 'small'])};

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  
  > div:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: ${colors.brand};
    border-radius: 100%;
    -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
            animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  }
  
  > div.c2 {
    -webkit-transform: rotate(30deg);
        -ms-transform: rotate(30deg);
            transform: rotate(30deg); }
  > div.c3 {
    -webkit-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
            transform: rotate(60deg); }
  > div.c4 {
    -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
            transform: rotate(90deg); }
  > div.c5 {
    -webkit-transform: rotate(120deg);
        -ms-transform: rotate(120deg);
            transform: rotate(120deg); }
  > div.c6 {
    -webkit-transform: rotate(150deg);
        -ms-transform: rotate(150deg);
            transform: rotate(150deg); }
  > div.c7 {
    -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
            transform: rotate(180deg); }
  > div.c8 {
    -webkit-transform: rotate(210deg);
        -ms-transform: rotate(210deg);
            transform: rotate(210deg); }
  > div.c9 {
    -webkit-transform: rotate(240deg);
        -ms-transform: rotate(240deg);
            transform: rotate(240deg); }
  > div.c10 {
    -webkit-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
            transform: rotate(270deg); }
  > div.c11 {
    -webkit-transform: rotate(300deg);
        -ms-transform: rotate(300deg);
            transform: rotate(300deg); }
  > div.c12 {
    -webkit-transform: rotate(330deg);
        -ms-transform: rotate(330deg);
            transform: rotate(330deg); }
  > div.c2:before {
    -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s; }
  > div.c3:before {
    -webkit-animation-delay: -1s;
            animation-delay: -1s; }
  > div.c4:before {
    -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s; }
  > div.c5:before {
    -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s; }
  > div.c6:before {
    -webkit-animation-delay: -0.7s;
            animation-delay: -0.7s; }
  > div.c7:before {
    -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s; }
  > div.c8:before {
    -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s; }
  > div.c9:before {
    -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s; }
  > div.c10:before {
    -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s; }
  > div.c11:before {
    -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s; }
  > div.c12:before {
    -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s; }

  @-webkit-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
              transform: scale(0);
    } 40% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
  }

  @keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
              transform: scale(0);
    } 40% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
  }
`

const LoaderCircleAnimation = ({ size }) => (
  <LoaderCircleAnimationWrapper size={size}>
    <div className="c1" />
    <div className="c2" />
    <div className="c3" />
    <div className="c4" />
    <div className="c5" />
    <div className="c6" />
    <div className="c7" />
    <div className="c8" />
    <div className="c9" />
    <div className="c10" />
    <div className="c11" />
    <div className="c12" />
  </LoaderCircleAnimationWrapper>
)

const SectionLoader = ({ className, size, isVisible }) => (
  <SectionLoaderWrapper isVisible={isVisible} className={className}>
    {isVisible ? <LoaderCircleAnimation size={size} /> : null}
  </SectionLoaderWrapper>
)

SectionLoader.propTypes = {
  isVisible: PropTypes.bool,
}

SectionLoader.defaultProps = {
  isVisible: true,
}

export default style(SectionLoader)
