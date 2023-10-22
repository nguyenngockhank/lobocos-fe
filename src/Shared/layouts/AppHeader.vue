<template>
<a-layout-header :style="{ background: '#fff', padding: 0 }">
  <a-page-header
    :title="title"
    :sub-title="subtitle"
    :breadcrumb="{ routes }"
  />
</a-layout-header>

</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePageHeaderStore } from "@/Shared/PageHeaderStore"

const { 
  title,
  subtitle,
  routes
} = storeToRefs(usePageHeaderStore())
</script>