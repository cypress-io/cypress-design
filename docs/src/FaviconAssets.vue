<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FAVICON_ASSETS, FAVICON_LINKS } from '@cypress-design/favicon'

// Resolved through Vite rather than written as absolute paths. These are the
// same bytes the site serves at its root, but importing them means the showcase
// renders anywhere it is mounted -- Cypress's component-test dev server does not
// serve a public directory, so absolute paths 404 there.
import faviconSvg from '@cypress-design/favicon/assets/favicon.svg?url'
import faviconIco from '@cypress-design/favicon/assets/favicon.ico?url'
import appleTouch from '@cypress-design/favicon/assets/apple-touch-icon.png?url'
import android192 from '@cypress-design/favicon/assets/android-chrome-192x192.png?url'
import android512 from '@cypress-design/favicon/assets/android-chrome-512x512.png?url'

const SRC: Record<string, string> = {
  'favicon.svg': faviconSvg,
  'favicon.ico': faviconIco,
  'apple-touch-icon.png': appleTouch,
  'android-chrome-192x192.png': android192,
  'android-chrome-512x512.png': android512,
}

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
  <div class="my-6 flex flex-col gap-8">
    <!-- how it looks in a tab -->
    <section class="flex flex-col gap-3">
      <h3 class="!mb-0 !mt-0 text-lg">In a browser tab</h3>
      <p class="!my-0 text-sm text-gray-700">
        The real <code>favicon.ico</code> at the sizes a browser actually
        renders, on Chrome's light and dark tab colours.
      </p>
      <div class="grid gap-3 md:grid-cols-2">
        <div class="chrome-tab-strip chrome-tab-strip-light overflow-x-auto">
          <div class="flex min-w-min items-end gap-0.5">
            <div
              v-for="s of ICO_SIZES"
              :key="`l${s}`"
              class="chrome-tab flex items-center whitespace-nowrap"
            >
              <img :src="SRC['favicon.ico']" :width="s" :height="s" alt="" />
              {{ s }}
            </div>
          </div>
        </div>
        <div class="chrome-tab-strip chrome-tab-strip-dark overflow-x-auto">
          <div class="flex min-w-min items-end gap-0.5">
            <div
              v-for="s of ICO_SIZES"
              :key="`d${s}`"
              class="chrome-tab flex items-center whitespace-nowrap"
            >
              <img :src="SRC['favicon.ico']" :width="s" :height="s" alt="" />
              {{ s }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- the adaptive svg -->
    <section class="flex flex-col gap-3">
      <h3 class="!mb-0 !mt-0 text-lg">favicon.svg — the adaptive one</h3>
      <p class="!my-0 text-sm text-gray-700">
        One file, two palettes, swapped with <code>prefers-color-scheme</code>.
        Your system is currently <b>{{ scheme }}</b
        >, so this is the <b>{{ scheme }}</b> variant. Flip your appearance and
        it repaints.
      </p>
      <div class="flex flex-wrap items-end gap-6 rounded bg-gray-50 p-6">
        <div
          v-for="s of [16, 24, 32, 48, 64, 128]"
          :key="s"
          class="flex flex-col items-center gap-2"
        >
          <img :src="SRC['favicon.svg']" :width="s" :height="s" alt="" />
          <span class="text-xs text-gray-600">{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- the rest -->
    <section class="flex flex-col gap-3">
      <h3 class="!mb-0 !mt-0 text-lg">The other surfaces</h3>
      <p class="!my-0 text-sm text-gray-700">
        Each renders a single fixed image and never adapts. The apple-touch icon
        is deliberately opaque: iOS composites on white, so transparent corners
        produce a hard edge.
      </p>
      <div class="flex flex-wrap items-end gap-7 rounded bg-gray-50 p-6">
        <div class="flex flex-col items-center gap-2">
          <img
            :src="SRC['apple-touch-icon.png']"
            width="90"
            height="90"
            alt=""
          />
          <span class="text-xs text-gray-600">apple-touch 180</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <img
            :src="SRC['android-chrome-192x192.png']"
            width="90"
            height="90"
            alt=""
          />
          <span class="text-xs text-gray-600">android 192</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <img
            :src="SRC['android-chrome-512x512.png']"
            width="90"
            height="90"
            alt=""
          />
          <span class="text-xs text-gray-600">android 512</span>
        </div>
      </div>
    </section>

    <!-- inventory -->
    <section class="flex flex-col gap-3">
      <h3 class="!mb-0 !mt-0 text-lg">What ships</h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="text-left text-gray-600">
              <th class="py-2 pr-4 font-medium">File</th>
              <th class="py-2 pr-4 font-medium">Size</th>
              <th class="py-2 pr-4 font-medium">Alpha</th>
              <th class="py-2 font-medium">Used by</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="f of files"
              :key="f.name"
              class="border-t border-gray-100 align-top"
            >
              <td class="py-2 pr-4 font-mono text-xs">
                {{ f.name }}
              </td>
              <td class="py-2 pr-4 font-mono text-xs">
                {{ f.dims }}
              </td>
              <td class="py-2 pr-4 font-mono text-xs">
                {{ f.alpha }}
              </td>
              <td class="py-2 text-gray-700">{{ f.used }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="!my-0 text-xs text-gray-600">
        {{ FAVICON_ASSETS.length }} files, {{ FAVICON_LINKS.length }} link tags
        — every row is generated from the package's own asset list, so this
        table cannot drift from what ships.
      </p>
    </section>
  </div>
</template>

<style scoped>
/* A copy of Chrome's tab strip, measured from the browser rather than set on
   our grid, so the favicon is shown on the surface it really renders on. */
.chrome-tab-strip {
  border-radius: 10px 10px 0 0;
  padding: 11px 11px 0;
}
.chrome-tab {
  gap: 7px;
  border-radius: 9px 9px 0 0;
  padding: 9px 13px;
  font-size: 11px;
}
.chrome-tab-strip-light {
  background: #dee1e6;
}
.chrome-tab-strip-light .chrome-tab {
  background: #ffffff;
  color: #5a6072;
}
.chrome-tab-strip-dark {
  background: #202124;
}
.chrome-tab-strip-dark .chrome-tab {
  background: #35363a;
  color: #9aa0ae;
}
</style>
