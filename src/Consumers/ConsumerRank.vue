<template>
<a-tag :color="rankColor">
    {{ consumer.rank }}
</a-tag>
</template>
<script lang="ts" setup>
const { consumer } = defineProps(['consumer'])
const rankColor = consumer.rank === 'S' ? 'gold' : consumer.rank === 'A' ? 'blue' : ''
</script>