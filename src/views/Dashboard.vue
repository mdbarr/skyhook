<template>
  <v-content>
    <skyhook-toolbar>
      <span slot="title"><v-icon>mdi-view-dashboard-outline</v-icon> Dashboard</span>
    </skyhook-toolbar>
    <v-footer app fixed v-if="state.loggedIn">
      <span class="pl-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-content>
</template>

<script>
import store from '../store'
import Toolbar from '../components/Toolbar.vue'

export default {
  name: 'skyhook-dashboard',
  components: {
    'skyhook-toolbar': Toolbar
  },
  props: {
  },
  data () {
    return {
      state: store.state
    }
  }
}
</script>

<style scoped>
.component {
    color: black;
}
</style>
