export const compileReactIconProperties = ({
  body,
  compiledClasses,
  size,
  ...attributes
}: {
  body: string
  compiledClasses: string[]
  size: string
} & React.SVGProps<SVGSVGElement>) => {
  Object.keys(attributes).forEach((key) => {
    if (key.toLowerCase().endsWith('color')) {
      // @ts-ignore
      delete attributes[key]
    }
  })

  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    dangerouslySetInnerHTML: {
      __html: body,
    },
    ...attributes, // add all standard attributes back to the svg tag
  }
  if (attributes.className) {
    compiledClasses.push(attributes.className)
  }
  if (compiledClasses.length) {
    componentProps.className = compiledClasses.join(' ')
  }
  return componentProps
}
