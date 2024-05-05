<template>
  <div class="mt-10">
    <v-sheet class="mx-auto" width="80%">
      <v-form v-model="isFormValid" @submit.prevent>
        <v-text-field
          v-model="requestData.title"
          :rules="titleRules"
          label="Title"
        ></v-text-field>
        <v-textarea
          v-model="requestData.description"
          :rules="descriptionRules"
          label="Description"
        ></v-textarea>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="center"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Deadline"
              v-model="changeDateFormat"
              readonly
            ></v-text-field>
          </template>

          <v-card>
            <v-date-picker
              color="primary"
              v-model="requestData.date"
              :min="new Date()"
              @update:modelValue="menu = false"
            ></v-date-picker>
          </v-card>
        </v-menu>
        <v-select
          label="Select a sprint"
          :items="sprintList"
          :rules="sprintRules"
          item-title="label"
          item-value="value"
        ></v-select>
        <v-radio-group label="Priority" v-model="requestData.priority">
          <v-radio label="Minor" value="MINOR" color="green"></v-radio>
          <v-radio label="Major" value="MAJOR" color="yellow"></v-radio>
          <v-radio label="Critical" value="CRITICAL" color="red"></v-radio>
        </v-radio-group>

        <v-btn :disabled="!isFormValid" class="my-4" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import {ref} from "vue";
import {useDate} from "vuetify";

export default {
  setup() {
    const requestData = ref({
      title: null,
      description: null,
      date: new Date(),
      sprint: null,
      priority: 'MINOR'
    })

    const titleRules = [
      value => !!value || 'This field is required',
    ]

    const descriptionRules = [
      value => !!value || 'This field is required',
    ]

    const sprintRules = [
      value => !!value || 'This field is required',
    ]

    const menu = ref(false)
    const isFormValid = ref(false)

    const sprintList = ref([
      {label: 'Sprint 1', value: 'SPRINT_1'},
      {label: 'Sprint 2', value: 'SPRINT_2'},
      {label: 'Sprint 3', value: 'SPRINT_3'}
    ])

    return {
      requestData,
      titleRules,
      descriptionRules,
      menu,
      isFormValid,
      sprintRules,
      sprintList
    }
  },
  computed: {
    changeDateFormat() {
      if (!this.requestData.date) {
        return null
      }
      const [month, day, year] = useDate().format(this.requestData.date, 'keyboardDate').split('/')
      return `${day}-${month}-${year}`
    }
  }
}

</script>
