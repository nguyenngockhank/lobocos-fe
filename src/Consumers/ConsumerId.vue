<template>
<router-link :to="'#/consumers/' + value">
    <a-tag color="cyan">
        #{{ value }}
    </a-tag>
</router-link>
</template>
<script lang="ts" setup>
defineProps(['value'])
</script>
