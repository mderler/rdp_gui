<template>
    <img width="15" height="15" src="/triangle-down.png" v-if="dir == 'down'"/>
    <img width="15" height="15" src="/triangle-up.png" v-else-if="dir == 'up'"/>
</template>

<script setup lang="ts">
defineProps<{dir: string}>()
</script>