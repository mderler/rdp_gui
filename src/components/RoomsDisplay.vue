<script setup lang="ts">
import { Room } from '@/scripts/room'
import { useRoomStore } from '@/stores/room.store'
import axios from 'axios'
import { ref } from 'vue'
import ItemSelect from './ItemSelect.vue'
import SingleRoomDisplay from './SingleRoomDisplay.vue'

defineProps<{ rooms: Room[] }>()
const emit = defineEmits(['update_room'])

const roomStore = useRoomStore()

const newRoom = ref<Room>(new Room())
const editorHidden = ref(true)

const addRoom = () => {
  axios.post('/api/room/', newRoom.value).then((result) => {
    console.log(result)
    emit('update_room')
  })
}
</script>
<template>
  <div class="row bg-primary mt-1">
    <span class="col-2">Room Editor</span
    ><span class="col text-end" v-on:click="() => (editorHidden = !editorHidden)">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editorHidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editorHidden">
    <SingleRoomDisplay
      v-for="room in rooms"
      :key="room.id"
      :room="room"
      @update_room="$emit('update_room')"
    />
    <span>
      <b>Add new room:</b>
    </span>
    <div class="row rounded mt-1 mb-0 p-0">
      <input class="col bg-secondary rounded me-1" v-model="newRoom.name" />
      <ItemSelect
        :items="
          roomStore.roomGroups.map((roomGroup) => ({ value: roomGroup.id, name: roomGroup.name }))
        "
        null-text="NULL"
        v-model:item="newRoom.room_group_id"
        class="col bg-secondary rounded me-1"
      />
      <button class="col bg-primary text-end rounded mb-1" @click="addRoom">submit</button>
    </div>
  </span>
</template>
