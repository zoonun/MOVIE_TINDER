<template>
  <div>
    <CommentListItem
      v-for="(comment, idx) in comments"
      :key="idx"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentListItem from '@/components/community/CommentListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CommentList',
  props: {
    review: {
      type: Object,
      required: true,
    }
  },
  components: {
    CommentListItem
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
      'comments'
    ])
  },
  created() {
    const commentListSet = {
      review_id: this.review.id,
      token: this.setToken()
    }
    this.$store.dispatch('getComments', commentListSet)
  }
}
</script>

<style>

</style>
