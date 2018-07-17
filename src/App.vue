<template>
<v-app id="app" dark>
  <v-progress-linear v-if="state.loading" style="z-index:1000" height="5" color="white" :indeterminate="true" class="ma-0"></v-progress-linear>
  <router-view/>
</v-app>
</template>

<script>
import store from './store'

export default {
  name: 'App',
  data () {
    return {
      state: store.state
    }
  }
}
</script>

<style>
.skyhook-clickable {
    cursor: pointer;
}
.skyhook-clickable:hover {
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
