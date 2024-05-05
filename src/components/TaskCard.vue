<template>
  <v-card width="90%" class="mx-auto my-4 pa-4">
    <div class="d-flex">
      <v-checkbox
        width="max-content"
        :model-value="task.done"
        @update:modelValue="doneChanged()"
        hide-details
      ></v-checkbox>
      <div class="cardContainer ml-5">
        <h3 :class="{'text-decoration-line-through' : task.done}">{{task.title}}</h3>
        <span>{{task.description}}</span>
        <v-icon icon="mdi-circle-small"></v-icon>
        <v-icon size="x-small" icon="mdi-calendar" ></v-icon>
        <span class="ml-1">{{formattedDate}}</span>
      </div>
      <v-icon
        color="red"
        size="large"
        class="mt-4 cursor-pointer"
        icon="mdi-delete"
        @click="deleteTask"
      ></v-icon>
    </div>
  </v-card>
</template>

<script>
import {useDate} from "vuetify";
import {computed} from "vue";

export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },

  emits: {
    done: () => true,
    deleteTask: () => true
  },

  setup(props, { emit }) {
    const formattedDate = computed(() => {
      return useDate().format(props.task.date, 'fullDate')
    })

    function doneChanged() {
      emit('done')
    }

    function deleteTask() {
      emit('deleteTask')
    }

    return {
      formattedDate,
      doneChanged,
      deleteTask
    }
  }
}
</script>

<style lang="scss">
.cardContainer {
  width: 90%;
}
</style>
