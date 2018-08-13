<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark dense color="primary">
            <v-avatar size="40"><img src="skyhook-logo.svg"></v-avatar>
            <v-toolbar-title class="skyhook-title">Skyhook</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store'
export default {
  name: 'Login',
  data () {
    return {
      state: store.state
    }
  },
  methods: {
    login () {
      this.state.loggedIn = true
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style scoped>
.skyhook-title {
    font-family: 'Atomic Age', Courier, serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 10px !important;
    margin-left: 16px;
    text-transform: uppercase;
}
.container {
    background-image: -webkit-radial-gradient(top, circle farthest-corner, #404040 0%, #303030 80%) !important;
}
</style>
