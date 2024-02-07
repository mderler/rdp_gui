<script setup lang="ts">
import { Room } from '@/scripts/room'
import { useRoomStore } from '@/stores/room.store'
import axios from 'axios'
import { ref } from 'vue'
import ItemSelect from './ItemSelect.vue'
import SingleRoomGroupDisplay from './SingleRoomGroupDisplay.vue'

defineProps<{ roomGroups: Room[] }>()
const emit = defineEmits(['update_room_group'])

const roomStore = useRoomStore()

const newRoomGroup = ref<Room>(new Room())
const editorHidden = ref(true)

const addRoom = () => {
  axios.post('/api/room-group/', newRoomGroup.value).then((result) => {
    console.log(result)
    emit('update_room_group')
  })
}
</script>
<template>
  <div class="row bg-primary mt-1">
    <span class="col-4">Room Group Editor</span
    ><span class="col text-end" v-on:click="() => (editorHidden = !editorHidden)">
      <img width="15" height="15" src="/triangle-down.png" v-if="editorHidden"/>
        <img width="15" height="15" src="/triangle-up.png" v-else/>
    </span>
  </div>
  <span v-if="!editorHidden">
    <SingleRoomGroupDisplay
      v-for="room in roomGroups"
      :key="room.id"
      :room-group="room"
      @update_room_group="$emit('update_room_group')"
    />
    <span>
      <b>Add new room group:</b>
    </span>
    <div class="row rounded mt-1 mb-0 p-0">
      <input class="col bg-secondary rounded me-1" v-model="newRoomGroup.name" />
      <ItemSelect
        :items="
          roomStore.roomGroups.map((roomGroup) => ({ value: roomGroup.id, name: roomGroup.name }))
        "
        null-text="NULL"
        v-model:item="newRoomGroup.room_group_id"
        class="col bg-secondary rounded me-1"
      />
      <button class="col bg-primary text-end rounded mb-1" @click="addRoom">submit</button>
    </div>
  </span>
</template>
