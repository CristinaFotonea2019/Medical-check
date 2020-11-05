
<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <v-layout align-space-around justify-space-between row fill-height>
        <MedicalMenu/>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import MedicalMenu from './components/MedicalMenu.vue';
import axios from "axios";
/* eslint-disable */
export default {
  name: "App",
  components: {
    MedicalMenu
  },
    created() {
    console.log("Pana aici");
    this.$vuetify.theme.themes.light.primary = "#CE2727";
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
