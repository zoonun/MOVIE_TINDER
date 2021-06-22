<template>
  <div class="recommend">
    <header>
      <h2>당신이 좋아할 만한</h2>
      <h4>당신이 가장 좋아하는 장르는 {{ bestGenre }}입니다.</h4>
    </header>
    <div v-if="recommendMovies == null">
      <router-link :to="{ name: 'TinderMain' }">틴더</router-link>
      로 이동해서 영화 소개팅을 진행해 주세요!</div>
    <!-- MovieCards -->
    <div class="popular-list row row-cols-1 row-cols-md-5 gy-3">
      <MovieCard
        v-for="(movie, idx) in recommendMovies"
        :key="idx"
        :movie="movie"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieCard from '@/components/movies/MovieCard'

export default {
  name: 'Recommend',
  components: {
    MovieCard,
  },
  methods: {
    setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
  },
  computed: {
    ...mapGetters([
      'recommendMovies', 'bestGenre'
    ])
  },
  created() {
    this.$store.dispatch('getLikeGenreMovies', this.setToken())
  }
}
</script>

<style>

</style>
