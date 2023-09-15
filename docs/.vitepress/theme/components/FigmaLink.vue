<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isCypressOrg = ref(false)

async function fetchCloud(body: any) {
  // if domain is not cypress.io return empty data
  // cors and cookies would make the data fail anyway
  if (!window.location.hostname.endsWith('.cypress.io')) {
    return { data: {} }
  }

  const response = await fetch(`https://cloud.cypress.io/graphql`, {
    mode: `cors`,
    method: `POST`,
    credentials: `include`,
    headers: { 'Content-Type': `application/json;charset=UTF-8` },
    body: JSON.stringify(body),
  })

  return response.json()
}

const CYPRESS_ORG_ID = '06fe4bd2-2315-4d55-bab2-43153895e908'
const CloudQuery = `query CypressCloudUser {
  me {
    organizations {
      nodes {
        id
      }
    }
  }
}
`

onMounted(async () => {
  const {
    data: { me },
  } = await fetchCloud({
    query: CloudQuery,
  })

  // check if the user has the Cypress org among it's organizations
  isCypressOrg.value =
    me?.organizations?.nodes.some((org: any) => org.id === CYPRESS_ORG_ID) ??
    false
})

defineProps<{
  href: string
}>()
</script>

<template>
  <a v-if="isCypressOrg" :href="href" class="figma-link">
    <slot />
  </a>
</template>
