<template>
  <v-tabs
    v-model="selectedTab"
    bg-color="primary"
    align-tabs="title"
  >
    <v-tab value="ALL">All</v-tab>
    <v-tab value="SPRINT_ONE">Sprint 1</v-tab>
    <v-tab value="SPRINT_TWO">Sprint 2</v-tab>
    <v-tab value="SPRINT_THREE">Sprint 3</v-tab>
  </v-tabs>

  <v-card-text>
    <v-tabs-window v-model="selectedTab" v-if="!loadingTasks">
      <v-tabs-window-item value="ALL">
        <div v-if="tasks.length">
          <TaskCard
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @done="taskDone(task)"
            @deleteTask="deleteTask(task.id)"
          ></TaskCard>
        </div>
        <div v-else>
          <NoTasksPage/>
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="SPRINT_ONE">
        <div v-if="filteredTasks('SPRINT_ONE').length">
          <TaskCard
            v-for="task in filteredTasks('SPRINT_ONE')"
            :key="task.id"
            :task="task"
            @done="taskDone(task)"
            @deleteTask="deleteTask(task.id)"
          ></TaskCard>
        </div>
        <div v-else>
          <NoTasksPage />
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="SPRINT_TWO">
        <div v-if="filteredTasks('SPRINT_TWO').length">
          <TaskCard
            v-for="task in filteredTasks('SPRINT_TWO')"
            :key="task.id"
            :task="task"
            @done="taskDone(task)"
            @deleteTask="deleteTask(task.id)"
          ></TaskCard>
        </div>
        <div v-else>
          <NoTasksPage />
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="SPRINT_THREE">
        <div v-if="filteredTasks('SPRINT_THREE').length">
          <TaskCard
            v-for="task in filteredTasks('SPRINT_THREE')"
            :key="task.id"
            :task="task"
            @done="taskDone(task)"
            @deleteTask="deleteTask(task.id)"
          ></TaskCard>
        </div>
        <div v-else>
          <NoTasksPage />
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
    <LoadingHandler v-else/>
  </v-card-text>
</template>

<script>

import {computed, onMounted, ref} from "vue";
import {useTasksStore} from "@/stores/app";
import {storeToRefs} from "pinia";
import TaskCard from "@/components/TaskCard.vue";
import NoTasksPage from "@/pages/NoTasksPage.vue";
import {useLoadingStore} from "@/stores/loading";
import LoadingHandler from "@/pages/LoadingHandler.vue";

export default {
  components: {LoadingHandler, NoTasksPage, TaskCard},
  setup() {
    const selectedTab = ref('ALL');
    const tasksStore = useTasksStore();
    const { tasks } = storeToRefs(tasksStore);
    const loadingStore = useLoadingStore();
    const { loadingTasks } = storeToRefs(loadingStore)

    function taskDone (task) {
      tasksStore.taskDone(task)
    }
    function deleteTask (taskId) {
      tasksStore.deleteTask(taskId)
    }

    onMounted(() => {
      tasksStore.getTasksList();
    })

    const filteredTasks = computed(() => {
      return (sprint) => tasksStore.tasksWithSpecificSprint(sprint)
    })

    return {
      selectedTab,
      tasks,
      taskDone,
      deleteTask,
      filteredTasks,
      loadingTasks
    }
  }
}

</script>
