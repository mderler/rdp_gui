import axios from 'axios'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Value } from '@/scripts/value'
import type { UrlParams } from '@/types/url-paras.type'

export const useValueStore = defineStore('value', () => {
  const values = ref<Value[]>([])
  const orderField = ref("")
  const ascending = ref(true)
  const updateValues = (params: UrlParams = {}) => {
    const url = '/api/value/'
    console.log('Trying to get url', url)
    axios
      .get(url, { params: {...params, orderfield: orderField.value, asc: ascending.value} })
      .then((result) => {
        values.value = result.data
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const updateOrder = (field: string) => {
    if (field === orderField.value && ascending.value === false) {
      ascending.value = true
      orderField.value = ""
      return
    }
    if (field === orderField.value) {
      ascending.value = false
    } else {
      ascending.value = true
    }
    orderField.value = field
  }

  return { values, updateValues,  orderField, ascending, updateOrder }
})
