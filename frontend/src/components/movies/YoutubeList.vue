<template>
  <ul class="youtube-list">
    <YoutubeListItem
      v-for="(video, idx) in youtubeVideos"
      :key="idx"
      :video="video"
    />
  </ul>
</template>

<script>
import YoutubeListItem from '@/components/movies/YoutubeListItem'
import { mapState } from 'vuex'

export default {
  name: 'YoutubeList',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    YoutubeListItem
  },
  computed: {
    ...mapState([
      'youtubeVideos'
    ])
  },
  created() {
    this.$store.dispatch('searchYoutube', this.title)
  },
}
</script>

<style>

</style>
