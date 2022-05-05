const path = require('path');
const dedent = require('dedent');
const { promises: fs } = require('fs');
const camelcase = require('camelcase');
const { icons, iconSet } = require('@cypress-design/icon-registry');

const iconsComponents = Object.keys(icons).map((iconId) => {
  const pascalCaseName = camelcase(iconId, { pascalCase: true });
  const iconMetadata = icons[iconId];
  const availableIds = iconMetadata.availableSizes.map(
    (size) => `${camelcase(iconId)}X${size}`
  );

  const iconBodies = iconSet.reduce((acc, icon) => {
    const sizeIndex = availableIds.indexOf(icon.name);
    if (sizeIndex > -1) {
      acc[iconMetadata.availableSizes[sizeIndex]] = icon.data;
    }
    return acc;
  }, {});
  return dedent`
  export const Icon${pascalCaseName}: React.FC<
    iconsRegistry.I${pascalCaseName} & React.SVGProps<SVGSVGElement>
  > = (props) => {
    const { sizeWithDefault: size, compiledClasses } = iconsRegistry.getComponentAttributes({ ...(props as any), availableSizes: ${JSON.stringify(
      iconMetadata.availableSizes
    )} })
    const iconBodies: Record<string, string> = ${JSON.stringify(
      iconBodies,
      null,
      2
    )}
    const body = iconBodies[size]
    if(!body){
      throw Error(\`Icon "${iconId}" is not available in size ${'$'}{size}\`)
    }
    return React.createElement('svg', compileReactIconProperties({
      ...props,
      size,
      body,
      compiledClasses
    }))
  }
  `;
});

writeFile(`
import * as iconsRegistry from '@cypress-design/icon-registry'
import { compileReactIconProperties } from './Icon'
import * as React from 'react';

${iconsComponents.join('\n\n\n')}
`);

async function writeFile(fileContents) {
  await fs.writeFile(
    path.resolve(__dirname, './TreeShakableIcons.ts'),
    fileContents,
    'utf-8'
  );
}
