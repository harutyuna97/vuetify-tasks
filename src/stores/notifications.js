import {defineStore} from "pinia";

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    messages: [],
  }),

  actions: {
    clearClosedMessages() {
      this.messages = this.messages.filter(message => message.show)
    }
  }
})
