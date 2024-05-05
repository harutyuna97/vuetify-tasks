<template>
  <h1 class="ml-10 mt-5">List of tasks</h1>
  <v-card class="rounded-0">
    <v-tabs
      v-model="selectedTab"
      bg-color="primary"
    >
      <v-tab value="ALL">All</v-tab>
      <v-tab value="SPRINT_1">Sprint 1</v-tab>
      <v-tab value="SPRINT_2">Sprint 2</v-tab>
      <v-tab value="SPRINT_3">Sprint 3</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="selectedTab">
        <v-tabs-window-item value="ALL">
          <TaskCard
            v-for="task in tasks"
            :key="task.id"
          ></TaskCard>
        </v-tabs-window-item>

        <v-tabs-window-item value="SPRINT_1">
          Sprint 1
        </v-tabs-window-item>

        <v-tabs-window-item value="SPRINT_2">
          Sprint 2
        </v-tabs-window-item>

        <v-tabs-window-item value="SPRINT_3">
          Sprint 3
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>

import {ref, onMounted} from "vue";
import {useTasksStore} from "@/stores/app";
import {storeToRefs} from "pinia";
import TaskCard from "@/components/TaskCard.vue";

export default {
  components: {TaskCard},
  setup() {
    const selectedTab = ref('ALL');
    const tasksStore = useTasksStore();
    const { tasks } = storeToRefs(tasksStore);

    onMounted(() => {
      tasksStore.getTasksList();
    })

    return {
      selectedTab,
      tasks
    }
  }
}

</script>
