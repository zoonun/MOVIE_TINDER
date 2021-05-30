<template>
  <div class="movie-card">
    <div class="col-mb-4 movie-item">
      <img >
      <div class="movie-detail">
      </div>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
       <template v-slot:activator="{ on, attrs }">
        <v-img
          :src="imgSrc" class="img-fluid" alt="포스터 없음"
          v-bind="attrs"
          v-on="on"
        >
        </v-img>
      </template>
      <v-card dark
          color="black"
          >
        <v-toolbar
          dark
          color="black"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ movie.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list
          three-line
          subheader
          class="card"
        >
          <v-list-item id="img-info">
              <v-img id="poster" :src="imgSrc" class="img-fluid" alt="포스터 없음"></v-img>
              <div class="divide">
                <div class="movie-info">
                  <h4>제목 : {{ movie.title }}</h4>
                  <h4>개봉일 : {{ movie.release_date }}</h4>
                  <h4>평점 : {{ movie.vote_average }}</h4>
                </div>
                <h5 class="overview">{{ movie.overview }}</h5>
              </div>
          </v-list-item>
        </v-list>
      </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      showModal: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    imgSrc: function () {
      return "https://image.tmdb.org/t/p/w500" + this.movie.poster_path
    },
  }
}
</script>

<style>
  @import '../../assets/styles/common.css';
</style>
