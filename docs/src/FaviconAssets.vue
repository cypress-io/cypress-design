<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FAVICON_ASSETS, FAVICON_LINKS } from '@cypress-design/favicon'

// The site serves these at its root, so the page shows the very files it ships itself.
const base = ''

const ICO_SIZES = [16, 24, 32, 48, 64]

// Rows are driven by FAVICON_ASSETS so the table cannot list a file the package
// does not ship, or miss one it does. Only the prose is keyed by filename; an
// asset added without an entry here still renders, with its description blank.
const DETAIL: Record<string, { dims: string; alpha: string; used: string }> = {
  'favicon.svg': {
    dims: 'vector',
    alpha: 'n/a',
    used: 'Chrome, Edge, Firefox, Safari — adapts to light/dark',
  },
  'favicon.ico': {
    dims: '16/24/32/48/64',
    alpha: 'yes',
    used: 'Safari before 26, crawlers, unfurlers, RSS readers',
  },
  'apple-touch-icon.png': {
    dims: '180×180',
    alpha: 'no',
    used: 'iOS home screen',
  },
  'android-chrome-192x192.png': {
    dims: '192×192',
    alpha: 'yes',
    used: 'Android, installed PWAs',
  },
  'android-chrome-256x256.png': {
    dims: '256×256',
    alpha: 'yes',
    used: 'Android, installed PWAs',
  },
  'android-chrome-512x512.png': {
    dims: '512×512',
    alpha: 'yes',
    used: 'Android splash screens',
  },
}

const files = FAVICON_ASSETS.map((name) => ({
  name,
  dims: DETAIL[name]?.dims ?? '—',
  alpha: DETAIL[name]?.alpha ?? '—',
  used: DETAIL[name]?.used ?? '',
}))

const scheme = ref<'light' | 'dark'>('light')
let mq: MediaQueryList | undefined
const sync = () => {
  scheme.value = mq?.matches ? 'dark' : 'light'
}
onMounted(() => {
  mq = window.matchMedia('(prefers-color-scheme: dark)')
  sync()
  mq.addEventListener('change', sync)
})
onUnmounted(() => mq?.removeEventListener('change', sync))
</script>

<template>
  <div class="my-[24px] flex flex-col gap-[32px]">
    <!-- how it looks in a tab -->
    <section class="flex flex-col gap-[12px]">
      <h3 class="!mt-0 !mb-0 text-[18px]">In a browser tab</h3>
      <p class="!my-0 text-[14px] text-gray-700">
        The real <code>favicon.ico</code> at the sizes a browser actually
        renders, on Chrome's light and dark tab colours.
      </p>
      <div class="grid gap-[12px] md:grid-cols-2">
        <div
          class="rounded-t-[10px] px-[11px] pt-[11px] overflow-x-auto"
          style="background: #dee1e6"
        >
          <div class="flex gap-[2px] items-end min-w-min">
            <div
              v-for="s of ICO_SIZES"
              :key="`l${s}`"
              class="flex items-center gap-[7px] rounded-t-[9px] px-[13px] py-[9px] text-[11px] whitespace-nowrap"
              style="background: #ffffff; color: #5a6072"
            >
              <img :src="`${base}/favicon.ico`" :width="s" :height="s" alt="" />
              {{ s }}
            </div>
          </div>
        </div>
        <div
          class="rounded-t-[10px] px-[11px] pt-[11px] overflow-x-auto"
          style="background: #202124"
        >
          <div class="flex gap-[2px] items-end min-w-min">
            <div
              v-for="s of ICO_SIZES"
              :key="`d${s}`"
              class="flex items-center gap-[7px] rounded-t-[9px] px-[13px] py-[9px] text-[11px] whitespace-nowrap"
              style="background: #35363a; color: #9aa0ae"
            >
              <img :src="`${base}/favicon.ico`" :width="s" :height="s" alt="" />
              {{ s }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- the adaptive svg -->
    <section class="flex flex-col gap-[12px]">
      <h3 class="!mt-0 !mb-0 text-[18px]">favicon.svg — the adaptive one</h3>
      <p class="!my-0 text-[14px] text-gray-700">
        One file, two palettes, swapped with <code>prefers-color-scheme</code>.
        Your system is currently <b>{{ scheme }}</b
        >, so this is the <b>{{ scheme }}</b> variant. Flip your appearance and
        it repaints.
      </p>
      <div
        class="flex gap-[24px] items-end flex-wrap rounded p-[24px] bg-gray-50"
      >
        <div
          v-for="s of [16, 24, 32, 48, 64, 128]"
          :key="s"
          class="flex flex-col items-center gap-[8px]"
        >
          <img :src="`${base}/favicon.svg`" :width="s" :height="s" alt="" />
          <span class="text-[11px] text-gray-600">{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- the rest -->
    <section class="flex flex-col gap-[12px]">
      <h3 class="!mt-0 !mb-0 text-[18px]">The other surfaces</h3>
      <p class="!my-0 text-[14px] text-gray-700">
        Each renders a single fixed image and never adapts. The apple-touch icon
        is deliberately opaque: iOS composites on white, so transparent corners
        produce a hard edge.
      </p>
      <div
        class="flex gap-[28px] items-end flex-wrap rounded p-[24px] bg-gray-50"
      >
        <div class="flex flex-col items-center gap-[8px]">
          <img
            :src="`${base}/apple-touch-icon.png`"
            width="90"
            height="90"
            alt=""
          />
          <span class="text-[11px] text-gray-600">apple-touch 180</span>
        </div>
        <div class="flex flex-col items-center gap-[8px]">
          <img
            :src="`${base}/android-chrome-192x192.png`"
            width="90"
            height="90"
            alt=""
          />
          <span class="text-[11px] text-gray-600">android 192</span>
        </div>
        <div class="flex flex-col items-center gap-[8px]">
          <img
            :src="`${base}/android-chrome-512x512.png`"
            width="90"
            height="90"
            alt=""
          />
          <span class="text-[11px] text-gray-600">android 512</span>
        </div>
      </div>
    </section>

    <!-- inventory -->
    <section class="flex flex-col gap-[12px]">
      <h3 class="!mt-0 !mb-0 text-[18px]">What ships</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-[14px] border-collapse">
          <thead>
            <tr class="text-left text-gray-600">
              <th class="py-[8px] pr-[16px] font-medium">File</th>
              <th class="py-[8px] pr-[16px] font-medium">Size</th>
              <th class="py-[8px] pr-[16px] font-medium">Alpha</th>
              <th class="py-[8px] font-medium">Used by</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="f of files"
              :key="f.name"
              class="border-t border-gray-100 align-top"
            >
              <td class="py-[8px] pr-[16px] font-mono text-[12.5px]">
                {{ f.name }}
              </td>
              <td class="py-[8px] pr-[16px] font-mono text-[12.5px]">
                {{ f.dims }}
              </td>
              <td class="py-[8px] pr-[16px] font-mono text-[12.5px]">
                {{ f.alpha }}
              </td>
              <td class="py-[8px] text-gray-700">{{ f.used }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="!my-0 text-[12.5px] text-gray-600">
        {{ FAVICON_ASSETS.length }} files, {{ FAVICON_LINKS.length }} link tags
        — every row is generated from the package's own asset list, so this
        table cannot drift from what ships.
      </p>
    </section>
  </div>
</template>
