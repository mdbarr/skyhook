<template>
<div>
  <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" fixed app style="z-index: 6">
    <v-list dense>
      <v-list-tile avatar>
        <v-list-tile-avatar class="skyhook-drawer-icon">
          <img src="skyhook-logo.svg" >
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="skyhook-title">Skyhook</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click.stop="navigate('dashboard')">
        <v-list-tile-action>
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('library')">
        <v-list-tile-action>
          <v-icon>mdi-json</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Shared Code</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('database')">
        <v-list-tile-action>
          <v-icon>mdi-database</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Persistent Data</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('endpoints')">
        <v-list-tile-action>
          <v-icon>mdi-webhook</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Endpoints</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <v-list-tile @click.stop="navigate('tools')">
        <v-list-tile-action>
          <v-icon>mdi-toolbox</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Available Tools</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <v-list-tile @click.stop="navigate('settings')">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar app fixed dense color="primary" style="z-index: 5">
    <v-toolbar-title>
      <slot name="title"></slot>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-badge bottom color="red" overlap>
      <span v-if="state.notifications" slot="badge">{{ state.notifications }}</span>
      <v-btn icon>
        <v-icon>mdi-lighthouse</v-icon>
      </v-btn>
    </v-badge>
    <v-btn flat>
      {{ state.name }} &nbsp; <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-toolbar>
</div>
</template>

<script>
import store from '../store'

export default {
  name: 'skyhook-toolbar',
  props: {
  },
  data () {
    return {
      state: store.state,
      drawer: true,
      mini: true
    }
  },
  methods: {
    navigate (where) {
      console.log('GOING', where)
    }
  }
}
</script>

<style scoped>
.skyhook-drawer-icon {
    cursor: pointer;
}

.skyhook-title {
    font-family: 'Atomic Age', Courier, serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 7px !important;
    margin-left: 6px;
    text-transform: uppercase;
}
</style>
