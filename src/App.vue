<template>
<v-app id="app" dark>
<v-progress-linear v-if="false" style="z-index:1000" height="5" color="white" :indeterminate="true" class="ma-0"></v-progress-linear>
  <v-navigation-drawer
     v-if="state.loggedIn"
     :mini-variant.sync="mini"
     v-model="drawer"
     fixed
     app
     >
    <v-list dense>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="skyhook-logo.svg" >
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>SKYHOOK</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn
             icon
             @click.stop="mini = !mini"
             >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="true">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="true">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app fixed dense color="primary" v-if="state.loggedIn">
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-badge bottom color="red" overlap>
      <span slot="badge">3</span>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-badge>
    <v-btn flat>
      Mark &nbsp; <v-icon>person</v-icon>
    </v-btn>
  </v-toolbar>
  <v-content>
    <router-view/>
  </v-content>
  <v-footer app fixed v-if="state.loggedIn">
    <span class="pl-2">&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</v-app>
</template>

<script>
import store from './store'

export default {
  name: 'App',
  data () {
    return {
      state: store.state,
      drawer: true,
      mini: true
    }
  }
}
</script>
