<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items: { value: any; name: string }[]
  item: any
  nullText?: string
}>()
const emit = defineEmits(['update:item'])

const value = computed({
  get() {
    return props.item
  },
  set(value) {
    emit('update:item', value)
  }
})
</script>

<template>
  <select v-model="value">
    <option v-for="item in items" :value="item.value" :key="item.value">{{ item.name }}</option>
    <option v-if="nullText" :value="null">{{ nullText }}</option>
  </select>
</template>
