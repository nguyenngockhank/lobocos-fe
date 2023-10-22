<template>
<router-link :to="'/orders/' + value">
    <a-tag color="magenta">
        #{{ value }}
    </a-tag>
</router-link>
</template>
<script lang="ts" setup>
defineProps(['value'])
</script>
