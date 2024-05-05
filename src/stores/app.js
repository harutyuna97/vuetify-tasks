// Utilities
import { defineStore } from 'pinia'
import { useNotificationsStore } from './notifications'
import axios from "axios";
import {Constants} from "@/constants/constants";

const fbUrl = 'https://vuetify-tasks-default-rtdb.firebaseio.com/tasks'

const notificationsStore = useNotificationsStore();

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
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
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
    },

    addTask(task) {
      const request = axios.post(fbUrl + '.json', task)
      request.then(() => {
        this.tasks.push(task)
        notificationsStore.messages.push({type: Constants.MessageTypes.SUCCESS, message: 'Task successfully added', show: true})
      })
      request.catch(error => {
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
    },

    deleteTask(taskId) {
      const request = axios.delete(fbUrl + '/' + taskId + '.json')
      request.then(() => {
        const idx = this.tasks.findIndex(task => task.id === taskId)
        this.tasks.splice(idx, 1)
        notificationsStore.messages.push({type: Constants.MessageTypes.SUCCESS, message: 'Task successfully deleted', show: true})
      })
      request.catch(error => {
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
    },
  }
})
