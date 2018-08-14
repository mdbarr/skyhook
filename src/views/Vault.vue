 sdb<template>
<div>
  <skyhook-toolbar>
    <span slot="title"><v-icon>mdi-safe</v-icon> Vault</span>
  </skyhook-toolbar>
  <v-content>
    <v-container fluid fill-height grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-20">
            <v-card-text>
              a Test
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer app fixed>
    <span class="pl-2">&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</div>
</template>

<script>
import store from '../store'
import Toolbar from '../components/Toolbar.vue'

export default {
  name: 'skyhook-tools',
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
