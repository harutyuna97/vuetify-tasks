// Utilities
import { defineStore } from 'pinia'
import axios from "axios";

const fbUrl = 'https://vuetify-tasks-default-rtdb.firebaseio.com/tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  actions: {
    getTasksList() {
      this.tasks = [];
      const request = axios.get(fbUrl + '.json');
      request.then(d => {
        const requestData = Object.keys(d.data).map((key) => [key, d.data[key]]);
        requestData.forEach(reqData => {
          reqData[1].id = reqData[0];
          this.tasks.push(reqData[1])
        })
      })
      request.catch(error => {
        console.log(error)
      })
    },

    addTask(task) {
      const request = axios.post(fbUrl + '.json', task)
      request.then(() => {
        this.tasks.push(task)
      })
      request.catch(error => {
        console.log(error)
      })
    },

    deleteTask(taskId) {
      const request = axios.delete(fbUrl + '/' + taskId + '.json')
      request.then(() => {
        const idx = this.tasks.findIndex(task => task.id === taskId)
        this.tasks.splice(idx, 1)
      })
      request.catch(error => {
        console.log(error)
      })
    },

    toggleLikeTask(task) {
      let changingTask = this.tasks.find(td => td.id === task.id);
      changingTask.isFav = !changingTask.isFav;
    }
  }
})
