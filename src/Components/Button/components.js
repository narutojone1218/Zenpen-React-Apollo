import styled from 'styled-components';
import colors from '../../util/styles/colors'
import media from '../../util/styles/media'

const buttonColors = {
  green: {
    text: 'white',
    primary: colors.green,
    border: colors.darkGreen,
    hover: {
      text: 'white',
      primary: colors.darkGreen,
      border: colors.darkGreen,
    },
  },
  facebook: {
    text: 'white',
    primary: '#4267b2',
    border: '#4267b2',
    hover: {
      text: 'white',
      primary: '#4a71c0',
      border: '#4a71c0',
    },
  },
  blue: {
    text: 'white',
    primary: colors.brand,
    border: colors.brandDark,
    hover: {
      text: 'white',
      primary: colors.brandDark,
      border: colors.brandDark,
    },
  },
  gray: {
    text: 'white',
    primary: '#969696',
    border: '#8c8c8c',
    hover: {
      text: 'white',
      primary: '#8c8c8c',
      border: '#585858',
    },
  },
  white: {
    text: colors.blackish,
    primary: 'white',
    border: colors.gray,
    accent: colors.brandDark,
    hover: {
      text: 'white',
      primary: colors.brandDark,
      border: colors.gray,
    },
  },
}

const buttonSizes = {
  normal: {
    fontSize: '1.2em',
    letterSpacing: '0.03',
  },
  small: {
    fontSize: '1em',
    letterSpacing: '0.02em',
  },
}

export const ButtonComponent = styled.button`
  position: relative;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  transition: all .1s;
  display: block;
  background: ${({ color }) => (buttonColors[color || 'green'].primary)};
  border: 1px solid ${({ color }) => (buttonColors[color || 'green'].border)};
  border-left: 4px solid ${({ color }) => (buttonColors[color || 'green'].accent || buttonColors[color || 'green'].border)};
  font-size: ${({ size }) => (buttonSizes[size || 'normal'].fontSize)};
  letter-spacing: ${({ size }) => (buttonSizes[size || 'normal'].letterSpacing)};
  color: ${({ color }) => (buttonColors[color || 'green'].text)};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  padding: 0.5em 1em;
  line-height: 1.25em;
  border-radius: 0.15em;
  ${({ expandToParent }) => (expandToParent ? 'width: 100%;' : '')}
  &:hover {
    background: ${({ color }) => (buttonColors[color || 'green'].hover.primary)};
    border: 1px solid ${({ color }) => (buttonColors[color || 'green'].hover.primary)};
    border-left: 4px solid ${({ color }) => (buttonColors[color || 'green'].hover.primary)};
    color: ${({ color }) => (buttonColors[color || 'green'].hover.text)};
  }
  > i {
    margin-right: 0.5em;
  }
  ${({ disabled }) => (disabled ? 'cursor: not-allowed;' : '')}
  box-sizing: border-box;
  ${media.phone`
    padding: 0.5em;
  `}
`

export const ButtonWrapper = styled.div`
  position: relative;
  display: ${({ display }) => (display)};
  ${({ disabled }) => (disabled ? `
    cursor: not-allowed;
    pointer-events: none;
  ` : '')}
`
