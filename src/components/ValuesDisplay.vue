<script lang="ts">
import { Value } from '@/scripts/value'
import OrderDirInidcator from './OrderDirInidcator.vue'

export default {
  props: ['values', 'count', 'value_types', 'devices', 'order_field', 'ascending'],
  setup(props) {
    console.log(props.values)
  },
  data() {
    return {
      page: 1
    }
  },
  emits: ['rename', 'filter_click', 'page_change'],
  methods: {
    getTypeName(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].id == value.value_type_id) {
          return this.value_types[i].type_name
        }
      }
      return 'XXX'
    },
    getUnit(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].id == value.value_type_id) {
          return this.value_types[i].type_unit
        }
      }
      return 'XXX'
    },
    getDevice(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.devices[i].id == value.device_id) {
          return this.devices[i].name
        }
      }
      return 'XXX'
    },
    formatTime(time: number) {
      const date = new Date(time * 1000)
      return date.toLocaleString('de-DE', { timeZone: 'UTC', hour12: false })
    },
    getOrderStatus(field: string) {
      if (field === this.order_field) {
        return this.ascending ? 'up' : 'down'
      }
      return ''
    }
  },
  components: { OrderDirInidcator }
}
</script>

<template>
  <div class="row bg-primary mt-2 mb-1">
    <div
      class="col-1 clickable"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Tooltip on top"
      @click="$emit('filter_click', 'time')"
    >
      time <OrderDirInidcator :dir="getOrderStatus('time')" />
    </div>
    <div class="col-1 clickable" @click="$emit('filter_click', 'type')">
      type <OrderDirInidcator :dir="getOrderStatus('type')" />
    </div>
    <div class="col clickable" @click="$emit('filter_click', 'value')">
      value <OrderDirInidcator :dir="getOrderStatus('value')" />
    </div>
    <div class="col clickable" @click="$emit('filter_click', 'device')">
      device <OrderDirInidcator :dir="getOrderStatus('device')" />
    </div>
  </div>
  <div class="row bg-secondary rounded mt-1" v-for="value in values" :key="value">
    <div class="col-1">
      {{ formatTime(value.time) }}
    </div>
    <div class="col-1">
      {{ getTypeName(value) }}
    </div>
    <div class="col">{{ value.value.toFixed(2) }} {{ getUnit(value) }}</div>
    <div class="col">{{ getDevice(value) }}</div>
  </div>
  <div class="d-flex flex-row justify-content-center">
    <span>
      <span>Page</span>
      <input
        type="number"
        min="1"
        :max="Math.floor(count / 10)"
        v-model="page"
        @change="$emit('page_change', page)"
      />
      <span> of {{ Math.floor(count / 10) }}</span>
    </span>
  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
