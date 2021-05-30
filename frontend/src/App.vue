<template>
  <div id="app">
    <Navbar/>
    <v-app>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/Navbar'

export default {
  name: 'App',
  data() {
    return {
      windowHeight: window.innerHeight,
    }
  },
  components: {
    Navbar
  },
  computed: {
    ...mapActions([
      'checkMovies',
      'checkLogin'
    ]),
  },
  methods: {
    getToken() {
      const token = localStorage.getItem('jwt')
      return token
    },
    setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
  },
  created() {
    this.$store.dispatch('checkLogin', this.getToken())
  },
}

</script>

<style>
  @import './assets/styles/common.css';
  @import './assets/styles/tinder.css';
</style>
