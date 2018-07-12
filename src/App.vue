<template>
<v-app id="app" dark>
  <v-progress-linear v-if="false" style="z-index:1000" height="5" color="white" :indeterminate="true" class="ma-0"></v-progress-linear>
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

<style scoped>
</style>
