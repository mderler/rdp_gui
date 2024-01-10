<script setup lang="ts">
import { Room } from '@/scripts/room'
import { useRoomStore } from '@/stores/room.store'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import ItemSelect from './ItemSelect.vue'

const props = defineProps<{ roomGroup: Room }>()
const emits = defineEmits(['update_room_group'])

const roomStore = useRoomStore()
const roomGroups = computed(() =>
  roomStore.roomGroups
    .filter((group) => group.id !== props.roomGroup.id)
    .map((group) => ({ value: group.id, name: group.name }))
)

const updatedRoomGroup = ref<Room>(new Room())
const changed = computed(
  () =>
    props.roomGroup.name !== updatedRoomGroup.value.name ||
    props.roomGroup.room_group_id !== updatedRoomGroup.value.room_group_id
)

const updateRoom = () => {
  axios.put(`/api/room-group/${updatedRoomGroup.value.id}/`, updatedRoomGroup.value).then(() => {
    emits('update_room_group')
  })
}

const deleteRoom = () => {
  axios.delete(`/api/room-group/${updatedRoomGroup.value.id}/`).then(() => {
    emits('update_room_group')
  })
}

onMounted(() => {
  updatedRoomGroup.value = { ...props.roomGroup }
})
</script>
<template>
  <div class="row rounded mt-1 mb-0 p-0">
    <button class="col bg-secondary rounded delete-button" @click="deleteRoom">&#128465;</button>
    <input class="col bg-secondary rounded me-1" v-model="updatedRoomGroup.name" />
    <ItemSelect
      :items="roomGroups"
      null-text="NULL"
      v-model:item="updatedRoomGroup.room_group_id"
      class="col bg-secondary rounded me-1"
    />
    <button class="col bg-primary text-end rounded mb-1" v-if="changed" @click="updateRoom">
      submit
    </button>
  </div>
</template>
