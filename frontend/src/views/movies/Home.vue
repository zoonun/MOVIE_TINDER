<template>
  <div class="home">
    <header>
      <h2>요즘 인기있는</h2>
    </header>
    <!-- MovieCards -->
    <div class="popular-list row row-cols-1 row-cols-md-5 gy-3">
      <MovieCard
        v-for="(movie, idx) in movies"
        :key="idx"
        :movie="movie"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieCard from '@/components/movies/MovieCard'

export default {
  name: 'Home',
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
      'movies', 'genre_names'
    ])
  },
  created() {
    this.$store.dispatch('getMovies', this.setToken())
    this.$store.dispatch('getGenres', this.setToken())
  },

}
</script>

<style>

</style>
