import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingTasks: false,
    loadingCreate: false
  }),
})
