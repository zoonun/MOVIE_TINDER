<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <img id="navbar-logo" src="@/assets/images/logo.png" alt="netflix_logo">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Recommend' }">추천</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Community' }">커뮤니티</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'TinderMain' }">틴더</router-link>
          </li>
        </ul>
        <!-- 로그인 했을 경우 -->
        <ul v-if="isLogin" class="navbar-nav">
          <li class="nav-item-right">
            <router-link class="nav-link" @click.native="logout" to="#">로그아웃</router-link>
          </li>
        </ul>
        <!-- 로그아웃 했을 경우 -->
        <ul v-else class="navbar-nav">
          <li class="nav-item-right">
            <router-link class="nav-link" :to="{ name: 'Login' }">로그인</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
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
  computed: {
    ...mapActions([
      'checkLogin'
    ]),
    ...mapState([
      'isLogin'
    ])
  },
  created() {
    this.$store.dispatch('checkLogin', this.getToken())
  }
}
</script>

<style>
  @import './assets/styles/common.css';
</style>
