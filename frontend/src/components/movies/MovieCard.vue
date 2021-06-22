<template>
  <div class="col-mb-6 movie-item">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
      <v-img
        :src="imgSrc" alt="포스터 없음"
        v-bind="attrs"
        v-on="on"
      >
      </v-img>
    </template>
    <div class="movie-detail-card">
      <div class="movie-detail-toolbar">
        <v-btn
          icon
          dark
          @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <img id="logo-image" src="@/assets/images/logo.png"/>
      </div>
      <div class="movie-detail-body">
        <div class="movie-detail-poster">
          <img :src="imgSrc" alt="포스터 없음">
        </div>
        <div class="movie-detail-info">
          <!-- info header -->
          <div class="movie-detail-upper">
            <div class="movie-detail-info-header">
              <div class="movie-detail-info-header-left">
                <div class="movie-detail-title">
                  {{ movie.title }}
                </div>
                <div
                v-if="movie.release_date"
                class="movie-release-date">
                  개봉  :  {{ movie.release_date }}
                </div>
                <div
                v-if="movie.genre_ids">
                  <!-- {{ movie.genre_ids }} -->
                </div>
              </div>
              <div class="movie-detail-info-header-right">
                <div class="movie-vote">
                  {{ movie.vote_average }}
                </div>
                <img id="movie-star" src="@/assets/images/star.png">
              </div>
            </div>
            <!-- info overview -->
            <div class="movie-detail-overview-header">
              줄거리
            </div>
            <hr>
            <div
              v-if="movie.overview"
              class="movie-detail-overview-body">
              {{ movie.overview }}
            </div>
            <div v-else
              class="movie-detail-overview-body">
              해당 영화는 줄거리가 제공되지 않습니다.
            </div>
          </div>
          <div class="movie-detail-lower">
            <!-- youtube -->
            <div class="movie-youtube-area">
              관련 영상
              <hr>
              <YoutubeList :title="movie.title"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </v-dialog>
  </div>
</template>

<script>
import YoutubeList from '@/components/movies/YoutubeList'

export default {
  name: 'MovieCard',
  components: {
    YoutubeList
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  computed: {
    imgSrc: function () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
  },
}
</script>

<style>

</style>
