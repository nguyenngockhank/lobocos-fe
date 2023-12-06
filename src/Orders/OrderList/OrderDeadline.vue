<template>
<a-tag color="#000">
    {{ formatDate(value || deadline_at) }}
</a-tag>
</template>
<script lang="ts" setup>
import { formatDate } from "@/utils/formatDate"
defineProps(['value', 'deadline_at'])
</script>
