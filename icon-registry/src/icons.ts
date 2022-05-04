/* placeholder to be replaced by build-icons.mjs */

export interface Icon {
  pascalCaseName: string;
  iconId: string;
  size: string[];
  darkColor: string;
  lightColor: string;
  secondaryDarkColor: string;
  secondaryLightColor: string;
}

export const icons: Record<string, { availableSizes: string[] }> = {};
