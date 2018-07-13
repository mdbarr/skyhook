<template>
  <v-content>
    <skyhook-toolbar>
      <span slot="title"><v-icon>mdi-view-dashboard-outline</v-icon> Dashboard</span>
    </skyhook-toolbar>

    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
          <codemirror></codemirror>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-footer app fixed v-if="state.loggedIn">
      <span class="pl-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-content>
</template>

<script>
import store from '../store'
import Toolbar from '../components/Toolbar.vue'
import CodeMirror from '../components/CodeMirror.vue'

export default {
  name: 'skyhook-dashboard',
  components: {
    'skyhook-toolbar': Toolbar,
    'codemirror': CodeMirror
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
