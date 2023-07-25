<script lang="ts" setup>
import { cyColors as designColors } from '@cypress-design/css/dist/color-constants'
import _ from 'lodash'
import flat from 'flat'
import chroma from 'chroma-js'

const { filter, flatten, pick, startsWith, values } = _

function contrastingTextColor(color: string) {
  const ratioToBlack = chroma.contrast(color, 'black')
  const ratioToWhite = chroma.contrast(color, 'white')

  return ratioToBlack > ratioToWhite ? 'black' : 'white'
}

const brandPalettes = {
  primary: ['teal', 'jade', 'gray'],
  secondary: ['purple', 'orange', 'red', 'indigo'],
  tertiary: ['fuchsia', 'green', 'magenta'],
}

defineProps<{
  palette: keyof typeof brandPalettes
}>()

const brandColorways = flatten(values(brandPalettes))

const namedColors = pick(designColors, brandColorways)

type Color = {
  hex: string
  name: string
  textColor: 'white' | 'black'
}

const colorsObject = flat(namedColors, {
  delimiter: '-',
}) as Record<string, string>

const colors: Color[] = Object.keys(colorsObject).map((name) => {
  return {
    name,
    hex: colorsObject[name],
    textColor: contrastingTextColor(colorsObject[name]),
  }
})

const colorsForColorway = (colorway: string) => {
  return filter(colors, (color) => {
    return startsWith(color.name, colorway)
  })
}
</script>

<template>
  <div
    class="grid md:grid-rows-[repeat(11,minmax(0,1fr))] md:grid-flow-col gap-x-[8px] my-[16px]"
  >
    <template v-for="colorway of brandPalettes[palette]" :key="colorway">
      <div
        v-for="(color, i) of colorsForColorway(colorway)"
        :key="i"
        class="relative h-16"
        :class="`bg-${color.name} text-${color.textColor}`"
      >
        <div class="mx-2 my-1 text-md">
          {{ color.name }}
        </div>
        <div class="absolute bottom-2 inset-x-2 text-sm text-right">
          {{ color.hex }}
        </div>
      </div>
    </template>
  </div>
</template>
