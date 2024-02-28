<template>
  <div class="fixed bg-secondary rounded">Average Value: {{ avg.toFixed(3) }}</div>
</template>

<script setup lang="ts">
defineProps<{ avg: number }>()
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border: 1px solid black;
}
</style>
