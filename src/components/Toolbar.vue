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
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('library')">
        <v-list-tile-action>
          <v-icon>mdi-book-open-variant</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Library</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('datastore')">
        <v-list-tile-action>
          <v-icon>mdi-store</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Datastore</v-list-tile-title>
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
      <v-list-tile @click.stop="navigate('modules')">
        <v-list-tile-action>
          <v-icon>mdi-cube-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Modules</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('vault')">
        <v-list-tile-action>
          <v-icon>mdi-safe</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Vault</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="navigate('settings')">
        <v-list-tile-action>
          <v-icon>mdi-settings-outline</v-icon>
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
      this.$router.push({ name: where })
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
