import { css } from 'styled-components'

export const css3Prefix = (property, value) => (`
  -webkit-${property}: ${value};
   -khtml-${property}: ${value};
     -moz-${property}: ${value};
      -ms-${property}: ${value};
       -o-${property}: ${value};
          ${property}: ${value};
`)

export const borderRadius = radius => (
  css`
    ${css3Prefix('border-radius', radius)}
  `
)

export const boxShadow = (top, left, blur, color, inset = false) => (
  css`
    ${inset ? (`
      ${css3Prefix('box-shadow', `inset ${top} ${left} ${blur} ${color}`)}
    `) : (`
      ${css3Prefix('box-shadow', `${top} ${left} ${blur} ${color}`)}
    `)}
  `
)

export const hexToRgb = (hex, opacity = 1) => {
  const int = parseInt(hex.substr(-6), 16)
  const color = {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
}

export const backgroundGradient = (startColor = '#3C3C3C', endColor = '#999999') => (
  css`
  background-color: ${startColor}
  background-image: -webkit-gradient(linear, left top, left bottom, from(${startColor}), to(${startColor}));
  background-image: -webkit-linear-gradient(top, ${startColor}, ${endColor});
  background-image:    -moz-linear-gradient(top, ${startColor}, ${endColor});
  background-image:     -ms-linear-gradient(top, ${startColor}, ${endColor});
  background-image:      -o-linear-gradient(top, ${startColor}, ${endColor});
  background-image:         linear-gradient(top, ${startColor}, ${endColor});
  filter:           progid:DXImageTransform.Microsoft.gradient(startColorStr='${startColor}', endColorStr='${startColor}');
  `
)

export const inputPlaceholderColor = color => (
  css`
  ::-webkit-input-placeholder {
    color: ${color};
  }
  :-moz-placeholder {
    color: ${color};
    opacity: 1;
  }
  ::-moz-placeholder {
    color: ${color};
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${color};
  }
  ::-ms-input-placeholder {
    color: ${color};
  }
  `
)
