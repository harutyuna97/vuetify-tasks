<template>
  <v-card width="90%" class="mx-auto my-4 pa-4">
    {{task}}
  </v-card>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
}
</script>
