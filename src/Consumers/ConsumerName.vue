<template>
<a v-if="!!consumer.facebook_link" :href="consumer.facebook_link" target="_blank">
    {{ consumer.fullname }}
</a>
<span v-else>
    {{ consumer.fullname }}
</span>
</template>
<script lang="ts" setup>
defineProps(['consumer'])
</script>