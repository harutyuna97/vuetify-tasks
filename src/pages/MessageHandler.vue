<template>
  <v-snackbar
    v-for="(message, i) in messages"
    :key="message"
    :style="{'margin-bottom':calcMargin(i)}"
    v-model="message.show"
    @update:modelValue="valueChanged"
    :color="message.type === messageTypes.SUCCESS ? 'green' : 'red'"
    :text="message.message"
    timeout="4000"
  >
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="message.show = false"
        icon="mdi-close"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {useNotificationsStore} from "@/stores/notifications";
import {storeToRefs} from "pinia";
import {Constants} from "@/constants/constants";

export default {
  setup() {
    const store = useNotificationsStore();
    const { messages } = storeToRefs(store);
    const messageTypes = Constants.MessageTypes
    function calcMargin(i) {
      return (i*60) + 'px'
    }

    function valueChanged(event) {
      if (!event) {
        store.clearClosedMessages();
      }
    }
    return {
      messages,
      calcMargin,
      messageTypes,
      valueChanged
    }
  },
}
</script>
