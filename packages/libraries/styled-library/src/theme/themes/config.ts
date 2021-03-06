import { palettes } from '../palettes/config';

import { makeTheme } from './makeTheme';

const themes = {
  /** default theme */
  realSystem: makeTheme(),
  /** theme that resembles the stripe brand colors */
  stripe: makeTheme(palettes.stripe),
};

export { themes };
