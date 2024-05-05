// Utilities
import { defineStore } from 'pinia'
import { useNotificationsStore } from './notifications'
import axios from "axios";
import {Constants} from "@/constants/constants";

const fbUrl = 'https://vuetify-tasks-default-rtdb.firebaseio.com/tasks'

const notificationsStore = useNotificationsStore();

const inFlightUrls = new Set();

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),

  getters: {
    tasksWithSpecificSprint() {
      return (sprint) => this.tasks.filter((task) => task.sprint === sprint)
    },
  },

  actions: {

    getTasksList() {
      const url = fbUrl + '.json'
      const inFlight = inFlightUrls.has(url);
      if (inFlight) {
        return;
      }
      this.tasks = [];
      const request = axios.get(url);
      request.then(d => {
        if (d.data) {
          const requestData = Object.keys(d.data).map((key) => [key, d.data[key]]);
          requestData.forEach(reqData => {
            reqData[1].id = reqData[0];
            this.tasks.push(reqData[1]);
          })
        }
      })
      request.catch(error => {
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
      request.finally(() => inFlightUrls.delete(url))
    },

    addTask(task) {
      const url = fbUrl + '.json'
      const inFlight = inFlightUrls.has(url);
      if (inFlight) {
        return;
      }
      inFlightUrls.add(url);
      const request = axios.post(url, task)
      request.then(() => {
        this.tasks.push(task)
        this.router.push('/')
        notificationsStore.messages.push({type: Constants.MessageTypes.SUCCESS, message: 'Task successfully added', show: true})
      })
      request.catch(error => {
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
      request.finally(() => inFlightUrls.delete(url))
    },

    deleteTask(taskId) {
      const url = fbUrl + '/' + taskId + '.json'
      const inFlight = inFlightUrls.has(url);
      if (inFlight) {
        return;
      }
      inFlightUrls.add(url);
      const request = axios.delete(url)
      request.then(() => {
        const idx = this.tasks.findIndex(task => task.id === taskId)
        this.tasks.splice(idx, 1)
        notificationsStore.messages.push({type: Constants.MessageTypes.SUCCESS, message: 'Task successfully deleted', show: true})
      })
      request.catch(error => {
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
      request.finally(() => inFlightUrls.delete(url))
    },

    taskDone(task) {
      const url = fbUrl + '/' + task.id + '.json'
      const inFlight = inFlightUrls.has(url);
      if (inFlight) {
        return;
      }
      inFlightUrls.add(url);
      const request = axios.patch(url, {done: !task.done})
      request.then(() => {
        task.done = !task.done
      })
      request.catch(error => {
        notificationsStore.messages.push({type: Constants.MessageTypes.ERROR, message: error.message, show: true})
      })
      request.finally(() => inFlightUrls.delete(url) )
    },
  }
})
