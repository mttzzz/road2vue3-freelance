import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    tasks: []
  },
  getters: {
    tasks: s => s.tasks,
    activeTasksCount: s => s.tasks.filter(t => t.type === 'active').length
  },
  mutations: {
    tasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    changeTaskType(state, {id, type}) {
      const idx = state.tasks.findIndex(ot => ot.id === id)
      state.tasks[idx].type = type
    },

  },
  actions: {
    async addTask({commit}, task) {
      await axios.put(`${process.env.VUE_APP_DB_URL}/tasks/${task.id}.json`, task)
      commit('addTask', task)
    },
    async changeTaskType({commit, state}, {id, type}) {
      commit('changeTaskType', {id, type})
      const idx = state.tasks.findIndex(ot => ot.id === id)
      await axios.patch(`${process.env.VUE_APP_DB_URL}/tasks/${id}.json`, state.tasks[idx])
    },
    async getTasksFromFirebase({commit}) {
      const response = (await axios.get(`${process.env.VUE_APP_DB_URL}/tasks/.json`))
      if (response.data) {
        commit('tasks', Object.values(response.data))
      }
    },
  },
  modules: {},
  plugins: []
})
