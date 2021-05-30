<template>
  <div>
    <input type="text" class="input-box" placeholder="댓글 내용" v-model="commentItem.content">
    <button class="btn btn-create" @click="createComment">댓글 작성</button>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    review: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      commentItem: {
        content: null,
      }
    }
  },
  methods: {
    setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    createComment() {
      const commentItemSet = {
        commentItem: this.commentItem,
        review_id: this.review.id,
        token: this.setToken()
      }
      this.$store.dispatch('createComment', commentItemSet)
      this.commentItem.content = null
    },
  },
}
</script>

<style>

</style>
