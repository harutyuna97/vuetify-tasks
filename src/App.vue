<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Tasks app</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      app
    >
      <v-list-item to="/" link title="Home"></v-list-item>
      <v-list-item to="/create" link title="Create"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from "vue";

let drawer = ref(false)
</script>
