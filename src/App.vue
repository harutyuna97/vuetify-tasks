<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="cursor-pointer" @click="$router.push('/')">Tasks app</v-app-bar-title>
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
    <MessageHandler/>
  </v-app>
</template>

<script setup>
import {ref} from "vue";
import MessageHandler from "@/pages/MessageHandler.vue";

let drawer = ref(false)
</script>
