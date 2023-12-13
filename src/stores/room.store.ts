import axios from 'axios'

import { Room } from '@/scripts/room'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoomStore = defineStore('room', () => {
  const rooms = ref<Room[]>([])
  const roomGroups = ref<Room[]>([])
  const updateRooms = () => {
    axios
      .get('/api/room/')
      .then((result) => {
        rooms.value = result.data
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get('/api/room-group/')
      .then((result) => {
        roomGroups.value = result.data
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { rooms, roomGroups, updateRooms }
})
