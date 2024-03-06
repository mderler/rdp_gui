<script setup lang="ts">
import '@/assets/shared.css'

import { CommandFactory } from './commands/command.factory'
import DeviceDisplay from './components/DeviceDisplay.vue'
import InputBar from './components/InputBar.vue'
import RoomsDisplay from './components/RoomsDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'

import { useRoomStore } from './stores/room.store'
import { useValueTypeStore } from './stores/value-type.store'
import { useValueStore } from './stores/value.store'

import RoomGroupsDisplay from './components/RoomGroupsDisplay.vue'
import { useDeviceStore } from './stores/device.store'
import type { UrlParams } from './types/url-paras.type'
import AverageDisplay from './components/AverageDisplay.vue'
</script>

<script lang="ts">
export default {
  data() {
    const valueStore = useValueStore()
    const valueTypeStore = useValueTypeStore()
    const deviceStore = useDeviceStore()
    const roomStore = useRoomStore()

    const params: UrlParams = {}
    const commandFactory = new CommandFactory(params)

    return {
      params,
      commandFactory,
      valueStore,
      valueTypeStore,
      deviceStore,
      roomStore
    }
  },
  mounted() {
    this.valueTypeStore.updateValueTypes()
    this.valueStore.updateValues()
    this.deviceStore.updateDevices()
    this.roomStore.updateRooms()
  },
  methods: {
    update_search(args: string[]) {
      for (const key in this.params) {
        delete this.params[key]
      }
      console.log('New search arguemnts', args)
      for (var i = 0; i < args.length; i++) {
        console.log('handling command', args[i])
        const command_and_args = args[i].split(':')
        if (command_and_args.length == 2) {
          const key = command_and_args[0]
          const value = command_and_args[1]
          const command = this.commandFactory.getCommand(key)
          if (command) {
            command.execute(value)
            continue
          }
        }
        console.log('Ignoring command', args[i])
      }
      this.valueStore.updateValues(this.params)
    }
  }
}
</script>

<template>
  <AverageDisplay :avg="valueStore.average" />
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay
      :value_types="valueTypeStore.valueTypes"
      @update_type="valueTypeStore.updateValueTypes"
    />
    <DeviceDisplay :devices="deviceStore.devices" @update_device="deviceStore.updateDevices" />
    <RoomsDisplay :rooms="roomStore.rooms" @update_room="roomStore.updateRooms" />
    <RoomGroupsDisplay
      :room-groups="roomStore.roomGroups"
      @update_room_group="roomStore.updateRooms"
    />
    <ValuesDisplay
      :values="valueStore.values"
      :count="valueStore.count"
      :value_types="valueTypeStore.valueTypes"
      :devices="deviceStore.devices"
      :order_field="valueStore.orderField"
      :ascending="valueStore.ascending"
      @filter_click="
        (col) => {
          valueStore.updateOrder(col)
          valueStore.updateValues(params)
        }
      "
      @page_change="
        (newPage) => {
          valueStore.page = newPage
          valueStore.updateValues(params)
        }
      "
    />
  </div>
</template>
