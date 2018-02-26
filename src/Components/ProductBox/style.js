import React from 'react'

import styled from 'styled-components';

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'
import { shadeColor } from '../../util/styles/colors'
import { borderRadius, boxShadow, hexToRgb } from '../../util/styles/mixins'

import {
  extra as extraImages,
  product as productImages,
} from '../../assets/images'

export default component => (styled(component)`

  flex: 1 50%;
  max-width: 50%;
  display: flex;
  
  > .section {
    transition: all .2s;
    ${boxShadow(0, 0, '10px', 'transparent')}
    &:hover {
      ${props => boxShadow(0, 0, '10px', hexToRgb(props.product.primaryColor, 0.15))};
    }
    position: relative;
    margin: 1em;
    background: white;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    ${borderRadius('0.3em')}
    > .section-loader {
      ${borderRadius('0.3em')}
    }
    > .product-image {
      position: absolute;
      bottom: 0;
      width: 100px;
      height: 400px;
      background: url(${props => productImages[props.product.slug].productBox});
      background-repeat: no-repeat;
      background-position: 10px bottom;
      z-index:20;
      display: block;
    }
    > a {
      flex: 1;
      display: flex;
      text-decoration: none;
      color: ${colors.black};
      
      > .inner {
        flex: 1;
        border: 1px solid ${props => hexToRgb(props.product.primaryColor, 0.15)};
        border-bottom: none;
        transition: background .2s;
        padding: 1.25em 1.25em 2.25em 100px;
        background: ${props => hexToRgb(props.product.primaryColor, 0.07)};
        z-index: 10;
        position: relative;
        cursor: pointer;
        border-top-left-radius: 0.2em;
        border-top-right-radius: 0.2em;
        &:hover {
          background: ${props => hexToRgb(props.product.primaryColor, 0.1)};
        }
        > .product-icon {
          pointer-events: none;
          position: absolute;
          bottom: 0;
          right: 0;
          overflow: hidden;
          height: 1em;
          width: 1em;
          z-index: -1;
          font-size: 25em;
          color: ${props => hexToRgb(props.product.primaryColor, 0.075)};
          > i {
            position: absolute;
            right: -0.3em;
            bottom: -0.2em;
          }
        }
        > .read-more {
  
          /** change to match box color **/
  
          text-align: right;
          display: none;
          margin: 1em 0 0 0;
          > span {
            padding: 0.2em 0.5em;
            display: inline-block;
            background: ${props => hexToRgb(props.product.primaryColor, 0.07)};
            border-radius: 0.1em;
            color: ${props => shadeColor(props.product.primaryColor, -0.5)};
            font-size: 0.9em;
            cursor: pointer;
            ${props => boxShadow(0, 0, '10px', hexToRgb(props.product.primaryColor, 0.15))};
          }
        }
        > .product-name-wrapper {
          margin: 0 0 1em -100px;
          padding: 0 0 0 100px;
          position:relative;
          > .has-product {
            font-size: 2.3em;
            color: ${props => props.product.primaryColor};
            text-shadow: 0 0 7px ${props => hexToRgb(props.product.primaryColor, 0.6)};
            position: absolute;
            left: 38px;
          }
          > .product-name {
            font-size: 2.3em;
            color: ${props => props.product.primaryColor};
            padding: 0 2em 0.25em 0;
            border-bottom: 1px solid ${props => hexToRgb(props.product.primaryColor, 0.15)};
            text-transform: uppercase;
            display: inline-block;
            text-shadow: 0 0 7px ${props => hexToRgb(props.product.primaryColor, 0.3)};
          }
        }
        > div > .product-description,
        > .product-description {
          color: ${props => shadeColor(props.product.primaryColor, -0.5)};
          font-weight: 300;
          line-height: 1.6em;
          min-height: 145px;
          z-index: 15;
        }
        > .product-ingredients {
          padding: 1em 0 0 1em;
          > div {
            display: inline-block;
            margin-right: 1em;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      
    }
    
    > .footer {
      background: url(${extraImages.greyJeanBg});
      background-color: #ededed;
      padding: 1em 1em 1em 100px;
      border-bottom-left-radius: 0.2em;
      border-bottom-right-radius: 0.2em;
      z-index: 10;
      border: 1px solid #d0d0d0;
      > .widget-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .left {
          display: inline-block;
          text-align: left;
          position: relative;
          > * {
            vertical-align: middle;
            display: inline-block;
          }
        }
        > .right {
          display: inline-block;
          text-align: right;
          position: relative;
        }

        .actions {
          .button {
            > button {
              ${props => (props.product.cartContext.exists ? (`
                background-color: ${props.product.primaryColor};
                border-color: ${shadeColor(props.product.primaryColor, -0.2)};
                &:hover {
                  background-color: ${shadeColor(props.product.primaryColor, -0.2)};
                }
              `) : '')}
            }
          }
        }
        .rating {
          text-align: left;
          border-radius: 0.3em;
          > .stars {
            margin: 0 -0.3em -0.3em -0.3em;
            padding: 0.3em 0.3em 0 0.3em;
            border-bottom-right-radius: 0.3em;
            border-bottom-left-radius: 0.3em;
            color: #ffcc00;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #bd9700;
            > i {
              margin-right: 0.3em;
              &:last-child {
                margin-right: 0;
              }
            }
          }
          > img {
            display:block;
          }
        }
      }
    }
  }

  ${media.desktop_mr`
    > .section {
      > a > .inner {
        padding-left: 90px;
      }
    }
  `}
  
  ${media.desktop_lr`
    flex: 1 100%;
    max-width: 100%;
    > .section {
      margin: 0.5em;
      > a > .inner {
        padding-left: 100px;
        > div > .product-description,
        > .product-description {
          min-height: 0;
        }
        > .product-name-wrapper {
          > .has-product {
            display: none
          }
        }
      }
    }
  `}

  ${media.phone`
    > .section {
      > a > .inner {
        > .read-more {
          display: block;
        }
        > div > .product-description,
        > .product-description {
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
      }
    }
  `}

  ${media.small_phone`
    > .section {
      > .product-image {
        display: none;
      }
      > a > .inner {
        margin-left: 0;
        padding: 1.25em 1.25em 0 1.25em;
        > .product-ingredients {
          padding: 1em 0;
          text-align: center;
        }
      }
      > .footer {
        padding: 0.6em;
      }
    }
  `}

`)
