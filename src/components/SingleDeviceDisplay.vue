<script lang="ts">
import { Device } from '@/scripts/device'
import { useRoomStore } from '@/stores/room.store'
import axios from 'axios'
import ItemSelect from './ItemSelect.vue'

export default {
  props: ['deviceProp'],
  data() {
    return {
      editDevice: new Device(),
      changed: false,
      roomStore: useRoomStore()
    }
  },
  mounted() {
    console.log('Mounted with ', this.deviceProp)
    this.editDevice.id = this.deviceProp.id
    this.editDevice.device = this.deviceProp.device
    this.editDevice.name = this.deviceProp.name
    this.editDevice.room_id = this.deviceProp.room_id
  },
  methods: {
    update_changed() {
      this.changed =
        this.deviceProp.device !== this.editDevice.device ||
        this.deviceProp.name !== this.editDevice.name ||
        this.deviceProp.room_id !== this.editDevice.room_id
      console.log('Changed is now', this.changed)
    },
    update_device() {
      axios.put('/api/device/' + this.editDevice.id + '/', this.editDevice).then((result) => {
        console.log(result)
        this.$emit('update_device')
      })
    },
    delete_device() {
      axios.delete('/api/device/' + this.editDevice.id + '/').then(() => {
        this.$emit('update_device')
      })
    }
  },
  emits: ['update_device'],
  components: { ItemSelect }
}
</script>

<template>
  <div class="row rounded mt-1 mb-0 p-0">
    <button class="col bg-secondary rounded delete-button" @click="delete_device">&#128465;</button>
    <input
      class="col bg-secondary rounded me-1"
      v-model="editDevice.name"
      v-on:change="update_changed"
    />
    <input
      class="col bg-secondary rounded"
      v-model="editDevice.device"
      v-on:change="update_changed"
    />
    <ItemSelect
      :items="roomStore.rooms.map((room) => ({ value: room.id, name: room.name }))"
      null-text="NULL"
      v-model:item="editDevice.room_id"
      @update:item="update_changed"
      class="col bg-secondary rounded"
    />
    <button
      class="col bg-primary text-end rounded mb-1"
      v-if="changed"
      v-on:click="update_device()"
    >
      submit
    </button>
  </div>
</template>
