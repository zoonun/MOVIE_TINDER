<template>
  <li class="youtube-list-item">
    <img :src="imgSrc" alt="thumbnail">
  </li>
</template>

<script>
export default {
  name: 'YoutubeListItem',
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      return this.video.snippet.thumbnails.high.url
    }
  }
}
</script>

<style>

</style>
