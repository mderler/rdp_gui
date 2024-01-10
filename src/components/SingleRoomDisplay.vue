<script setup lang="ts">
import { Room } from '@/scripts/room'
import { useRoomStore } from '@/stores/room.store'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import ItemSelect from './ItemSelect.vue'

const props = defineProps<{ room: Room }>()
const emits = defineEmits(['update_room'])

const roomStore = useRoomStore()

const updatedRoom = ref<Room>(new Room())
const changed = computed(
  () =>
    props.room.name !== updatedRoom.value.name ||
    props.room.room_group_id !== updatedRoom.value.room_group_id
)

const updateRoom = () => {
  axios.put(`/api/room/${updatedRoom.value.id}/`, updatedRoom.value).then(() => {
    emits('update_room')
  })
}

const deleteRoom = () => {
  axios.delete(`/api/room/${updatedRoom.value.id}/`).then(() => {
    emits('update_room')
  })
}

onMounted(() => {
  updatedRoom.value = { ...props.room }
})
</script>

<template>
  <div class="row rounded mt-1 mb-0 p-0">
    <button class="col bg-secondary rounded delete-button" @click="deleteRoom">&#128465;</button>
    <input class="col bg-secondary rounded me-1" v-model="updatedRoom.name" />
    <ItemSelect
      :items="
        roomStore.roomGroups.map((roomGroup) => ({ value: roomGroup.id, name: roomGroup.name }))
      "
      null-text="NULL"
      v-model:item="updatedRoom.room_group_id"
      class="col bg-secondary rounded me-1"
    />
    <button class="col bg-primary text-end rounded mb-1" v-if="changed" @click="updateRoom">
      submit
    </button>
  </div>
</template>
