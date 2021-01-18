<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasksCount }}</h3>
    <div class="card" v-for="(task) in tasks" :key="task.id">
      <h2 class="card-title">
       {{task.name }}
        <AppStatus :type="task.type" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="$router.push('/task/'+ task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
  components: {AppStatus},
  setup() {
   const store = useStore()
   const tasks = computed(() => store.getters.tasks)
   const activeTasksCount = computed(() => store.getters.activeTasksCount)
   return {tasks, activeTasksCount}
  }
}
</script>
