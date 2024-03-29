import { kebabCase } from '@real-system/utils-library';

import type { HeroIconNames, HeroIconSet, Icons, IconValue } from './types';

const formatIconName = (heroIconName: HeroIconNames): Icons =>
  kebabCase<typeof heroIconName>(heroIconName).split('-icon').shift() as Icons;

type IconsMap = Record<Icons, IconValue>;

const getIcons = (IconSet: HeroIconSet): IconsMap => {
  const heroIcons = Object.keys(IconSet) as HeroIconNames[];
  const realSystemIcons = heroIcons.reduce((o, heroIconName) => {
    const key = formatIconName(heroIconName);
    return { ...o, [key]: IconSet[heroIconName] };
  }, {} as IconsMap);

  return realSystemIcons as IconsMap;
};

export { getIcons };
