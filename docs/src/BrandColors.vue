<script lang="ts" setup>
import { colors as designColors } from '@cypress-design/css/dist/colors'
import { filter, flatten, pick, startCase, startsWith, values } from 'lodash'
import flat from 'flat'
import chroma from 'chroma-js'

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
  <div class="w-full">
    <div
      v-for="(palette, paletteName) of brandPalettes"
      :key="paletteName"
      class="mb-8"
    >
      <h3 :id="paletteName" class="flex items-end text-xl gap-2">
        {{ startCase(paletteName) }}
        <p v-if="paletteName === 'tertiary'" class="text-sm text-gray-500">
          (Use only for generated content)
        </p>
        <a
          class="header-anchor"
          :href="`#${paletteName}`"
          :aria-label="`Permalink to &quot;${paletteName}&quot;`"
          >​</a
        >
      </h3>
      <div
        class="grid grid-rows-[repeat(11,minmax(0,1fr))] grid-flow-col gap-x-[8px] my-[16px]"
      >
        <template v-for="colorway of palette" :key="colorway">
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
    </div>
  </div>
</template>
