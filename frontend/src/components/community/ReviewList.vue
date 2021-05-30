<template>
  <v-row class="review-list-inset">
    <v-expansion-panels inset dark>
      <v-expansion-panel
        v-for="(review, idx) in reviews"
        :key="idx"
      >
      <ReviewListItem
        :review="review"
      />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ReviewListItem from '@/components/community/ReviewListItem'

export default {
  name: 'ReviewList',
  components: {
    ReviewListItem
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
      'reviews'
    ])
  },
  created() {
    this.$store.dispatch('getReviews', this.setToken())
  }
}
</script>

<style>

</style>
