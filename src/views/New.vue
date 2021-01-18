<template>
 <form class="card" @submit.prevent="add">
  <h1>Создать новую задачу</h1>
  <div class="form-control">
   <label for="title">Название</label>
   <input type="text" id="title" v-model="title">
  </div>

  <div class="form-control">
   <label for="date">Дата дэдлайна</label>
   <input type="date" id="date" v-model="date">
  </div>

  <div class="form-control">
   <label for="description">Описание</label>
   <textarea id="description" v-model="description"></textarea>
  </div>

  <button class="btn primary" :disabled="!isValid">Создать</button>
 </form>
</template>


<script>
import moment from 'moment'
import {ref, computed} from 'vue'
import store from '../store'
import {useRouter} from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
export default {
 setup() {

  const title = ref('')
  const date = ref('')
  const description = ref('')
  const router = useRouter()
  async function add() {
   const task = {
    id: uuidv4(),
    name: title.value,
    date: date.value,
    description: description.value,
    type: moment(date.value).endOf('day').isAfter() ? 'active' : 'cancelled'
   }
   await store.dispatch('addTask', task)
   await router.push('/')
  }

  const isValid = computed(() => title.value && date.value && description.value)

  return {
   title, date, description, add, isValid
  }
 }

}
</script>