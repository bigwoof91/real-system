/**
 * -------------------------------------
 *   Tokens that don't require palette
 * -------------------------------------
 **/
import { patchScale } from '../sizeUtils';

const space = {
  'space-0': '0',
  'space-1': patchScale(1),
  'space-2': patchScale(2),
  'space-3': patchScale(3),
  'space-4': patchScale(4),
  'space-5': patchScale(5),
  'space-6': patchScale(6.5),
  'space-7': patchScale(7),
  'space-8': patchScale(8),
  'space-9': patchScale(9),
  'space-10': patchScale(10),
  'space-11': patchScale(11),
  'space-12': patchScale(12),
  'space-13': patchScale(13),
  'space-14': patchScale(14),
  'space-15': patchScale(15),
  'space-16': patchScale(16),
  'space-17': patchScale(17),
  'space-18': patchScale(18),
  'space-19': patchScale(19),
  'space-20': patchScale(20),
  'space-21': patchScale(21),
  'space-22': patchScale(22),
  'space-23': patchScale(23),
  'space-24': patchScale(24),
  'space-25': patchScale(25),
  'space-26': patchScale(26),
  'space-27': patchScale(27),
  'space-28': patchScale(28),
  'space-29': patchScale(29),
  'space-30': patchScale(30),
  'space-31': patchScale(31),
  'space-32': patchScale(32),
  'space-33': patchScale(33),
  'space-34': patchScale(34),
  'space-35': patchScale(35),
  'space-36': patchScale(36),
  'space-37': patchScale(37),
  'space-38': patchScale(38),
  'space-39': patchScale(39),
  'space-40': patchScale(40),

  xxs: patchScale(1),
  xs: patchScale(2),
  sm: patchScale(4),
  md: patchScale(8),
  lg: patchScale(16),
  xl: patchScale(32),
  xxl: patchScale(64),
};

const sizes = {
  'size-0': '0',
  'size-1': patchScale(1),
  'size-2': patchScale(2),
  'size-3': patchScale(3),
  'size-4': patchScale(4),
  'size-5': patchScale(5),
  'size-6': patchScale(6.5),
  'size-7': patchScale(7),
  'size-8': patchScale(8),
  'size-9': patchScale(9),
  'size-10': patchScale(10),
  'size-11': patchScale(11),
  'size-12': patchScale(12),
  'size-13': patchScale(13),
  'size-14': patchScale(14),
  'size-15': patchScale(15),
  'size-16': patchScale(16),
  'size-17': patchScale(17),
  'size-18': patchScale(18),
  'size-19': patchScale(19),
  'size-20': patchScale(20),
  'size-21': patchScale(21),
  'size-22': patchScale(22),
  'size-23': patchScale(23),
  'size-24': patchScale(24),
  'size-25': patchScale(25),
  'size-26': patchScale(26),
  'size-27': patchScale(27),
  'size-28': patchScale(28),
  'size-29': patchScale(29),
  'size-30': patchScale(30),

  /** should match fontSizes */
  'icon-xxs': patchScale(5),
  'icon-xs': patchScale(7),
  'icon-sm': patchScale(8),
  'icon-md': patchScale(10),
  'icon-lg': patchScale(12),
  'icon-xl': patchScale(13),
  'icon-xxl': patchScale(15),
  'spinner-xxs': patchScale(5),
  'spinner-xs': patchScale(7),
  'spinner-sm': patchScale(8),
  'spinner-md': patchScale(10),
  'spinner-lg': patchScale(12),
  'spinner-xl': patchScale(13),
  'spinner-xxl': patchScale(15),

  max: 'max-content',
  min: 'min-content',
  full: '100%',

  /** controls are components like  buttons, inputs, selects, etc. */
  'control-xxs': patchScale(11),
  'control-xs': patchScale(13),
  'control-sm': patchScale(15),
  control: patchScale(18),
  'control-lg': patchScale(21),
  'control-xl': patchScale(24),
  'control-xxl': patchScale(27),
};

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  dialog: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const radii = {
  none: 0,
  xxs: '0.5px',
  xs: '0.75px',
  sm: patchScale(1),
  md: patchScale(2),
  lg: patchScale(4),
  xl: patchScale(5),
  xxl: patchScale(6.5),
  interactive: patchScale(2),
  layer: patchScale(2),
  squarish: '1px',
  circle: '50%',
};

/** @todo add font-size-0 */
const fontSizes = {
  'font-size-1': patchScale(6.5),
  'font-size-2': patchScale(7),
  'font-size-3': patchScale(8),
  'font-size-4': patchScale(9),
  'font-size-5': patchScale(11),
  'font-size-6': patchScale(13),
  'font-size-7': patchScale(15),
  'font-size-8': patchScale(17),
  'font-size-9': patchScale(19),
  'font-size-10': patchScale(21),
  'font-size-11': patchScale(23),
  'rem-base': '0.625rem',
  body: patchScale(7),
  button: patchScale(7),
  'button-xxs': patchScale(5.5),
  'button-xs': patchScale(6),
  'button-sm': patchScale(6.5),
  'button-lg': patchScale(7),
  'button-xl': patchScale(7.5),
  'button-xxl': patchScale(8.5),
  'menu-item': patchScale(7),
  'select-item': patchScale(7),
  input: patchScale(7),
  placeholder: patchScale(7),
  'badge-xs': patchScale(5),
  'badge-sm': patchScale(5.5),
  badge: patchScale(6),
  'badge-lg': patchScale(6.5),
  'badge-xl': patchScale(7),
  label: patchScale(6.5),
  link: patchScale(7),
  help: patchScale(6.5),
  h1: patchScale(17),
  h2: patchScale(13),
  h3: patchScale(11),
  h4: patchScale(9),
  h5: patchScale(7),
  h6: patchScale(6.5),
};

const lineHeights = {
  'line-height-1': patchScale(6.5),
  'line-height-2': patchScale(7),
  'line-height-3': patchScale(8),
  'line-height-4': patchScale(9),
  'line-height-5': patchScale(11),
  'line-height-6': patchScale(13),
  'line-height-7': patchScale(15),
  'line-height-8': patchScale(17),
  'line-height-9': patchScale(19),
  'line-height-10': patchScale(21),
  'line-height-11': patchScale(23),
  'rem-base': '0.625rem',
  body: patchScale(7),
  button: patchScale(7),
  'button-xxs': patchScale(5.5),
  'button-xs': patchScale(6),
  'button-sm': patchScale(6.5),
  'button-lg': patchScale(7),
  'button-xl': patchScale(7.5),
  'button-xxl': patchScale(8.5),
  'menu-item': patchScale(7),
  'select-item': patchScale(7),
  input: patchScale(7),
  control: patchScale(18),
  placeholder: patchScale(7),
  'badge-xs': patchScale(5),
  'badge-sm': patchScale(5.5),
  badge: patchScale(6),
  'badge-lg': patchScale(6.5),
  'badge-xl': patchScale(7),
  label: patchScale(6.5),
  help: patchScale(6.5),
  link: patchScale(7),
  h1: patchScale(17),
  h2: patchScale(13),
  h3: patchScale(11),
  h4: patchScale(9),
  h5: patchScale(7),
  h6: patchScale(6.5),
};

const letterSpacings = {
  none: '0',
  xxs: '0.05px',
  xs: '0.1px',
  sm: '0.25px',
  md: '0.3px',
  lg: '0.4px',
  xl: '0.45px',
  xxl: '0.5px',
  body: '0.25px',
  button: '0.25px',
  'button-xxs': '0.25px',
  'button-xs': '0.25px',
  'button-sm': '0.25px',
  'button-lg': '0.25px',
  'button-xl': '0.25px',
  'button-xxl': '0.25px',
  'menu-item': '0.25px',
  'select-item': '0.25px',
  input: '0.25px',
  placeholder: '0.25px',
  'badge-xs': 0,
  'badge-sm': 0,
  badge: 0,
  'badge-lg': 0,
  'badge-xl': 0,
  label: '0.25px',
  help: '0.25px',
  link: '0.25px',
  h1: '0.3px',
  h2: '0.3px',
  h3: '0.3px',
  h4: '0.3px',
  h5: '0.3px',
  h6: '0.3px',
  heading: '0.3px',
  mono: '0.3px',
  code: '0.3px',
};

const fontWeights = {
  thin: 300,
  light: 400,
  regular: 400,
  medium: 500,
  'semi-bold': 600,
  bold: 700,
  body: 400,
  button: 500,
  'button-xxs': 400,
  'button-xs': 500,
  'button-sm': 500,
  'button-lg': 500,
  'button-xl': 500,
  'button-xxl': 500,
  'menu-item': 400,
  'select-item': 400,
  input: 500,
  placeholder: 400,
  'badge-xs': 500,
  'badge-sm': 500,
  badge: 500,
  'badge-lg': 500,
  'badge-xl': 500,
  label: 600,
  help: 400,
  link: 400,
  h1: 700,
  h2: 700,
  h3: 600,
  h4: 600,
  h5: 600,
  h6: 600,
};

const defaultFontFamily =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";';
const monoFontFamily =
  'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace';

const fonts = {
  heading: defaultFontFamily,
  body: defaultFontFamily,
  mono: monoFontFamily,
  code: monoFontFamily,
};

const borderWidths = {
  none: 0,
  md: '1px',
  lg: '2px',
  'border-width-3': '3px',
  xl: '4px',
  'border-width-5': '5px',
  'border-width-6': '6px',
  'border-width-7': '7px',
  xxl: '8px',
  'border-width-9': '9px',
  'border-width-10': '10px',
  xxs: '0.125px',
  xs: '0.25px',
  sm: '0.5',
};

/** @todo add breakpoints scale - need to update responsive-cssFn */
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  xxl: '96em',
};

export {
  borderWidths,
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  sizes,
  space,
  zIndices,
};
