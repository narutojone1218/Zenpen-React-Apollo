
export default {

  brand: '#23a3dd',

  brandDark: '#0d77b6',

  black: '#2d2d2d',

  blackish: '#4e4e4e',

  green: '#71cc3a',

  darkGreen: '#54962b',

  orange: '#fd7801',

  darkOrange: '#c25c02',

  lightGray: '#f3f3f3',

  gray: '#d0d0d0',

  darkGray: '#989898',

  purple: '#a21e71',

  red: '#b32227',

}

export const shadeColor = (color, percent) => {
  let f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = f >> 8 & 0x00FF,
    B = f & 0x0000FF;
  return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)}`;
}
