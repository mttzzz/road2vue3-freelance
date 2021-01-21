<template>
 <div class="card" v-if="task">
  <h2>{{ task.name }}</h2>
  <p><strong>Статус</strong>:
   <AppStatus :type="task.type"/>
  </p>
  <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
  <p><strong>Описание</strong>: {{ task.description }}</p>
  <div>
   <button class="btn" @click="changeTaskType('pending')">Взять в работу</button>
   <button class="btn primary" @click="changeTaskType('done')">Завершить</button>
   <button class="btn danger" @click="changeTaskType('cancelled')">Отменить</button>
  </div>
 </div>
 <h3 class="text-white center" v-else>
  Задачи с ID = <strong>{{ id }}</strong> нет.
 </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useRoute} from 'vue-router'
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
 components: {AppStatus},
 setup() {
  const store = useStore()
  const route = useRoute()
  const id = route.params.id
  const task = computed(() => store.getters.tasks.find(t => t.id === id))
  const changeTaskType = async type => store.dispatch('changeTaskType', {id, type})
  return {task, id, changeTaskType}
 }
}
</script>

<style scoped>

</style>