<template>
<div>
  <skyhook-toolbar>
    <span slot="title"><v-icon>mdi-view-dashboard-outline</v-icon> Dashboard</span>
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
        <v-flex xs12>
          <v-card class="elevation-20">
            <v-card-text>
              <codemirror>
                <i class="mdi mdi-json" style="padding-right: 5px; font-size: 18px; position: relative; bottom: -2px;"></i> Shared Code
              </codemirror>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
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
