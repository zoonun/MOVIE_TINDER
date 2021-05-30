<template>
  <div>
    <v-text-field v-model="commentItem.content"></v-text-field>
    <span>댓글 작성일 : {{ comment.created_at | moment('YYYY-MM-DD HH:mm:ss') }}</span>
    <span>댓글 수정일 : {{ comment.updated_at | moment('YYYY-MM-DD HH:mm:ss') }}</span>
    <button class="btn btn-primary" @click="updateComment">댓글 수정</button>
    <button class="btn btn-danger" @click="deleteComment">댓글 삭제</button>
  </div>
</template>

<script>
export default {
  name: 'CommentListItem',
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      commentItem: {
        content: this.comment.content
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
    updateComment() {
      const commentItemSet = {
        commentItem: this.commentItem,
        comment_id: this.comment.id,
        token: this.setToken()
      }
      console.log(this.comment.id)
      this.$store.dispatch('updateComment', commentItemSet)
    },
    deleteComment() {
      const commentItemSet = {
        comment_id: this.comment.id,
        token: this.setToken()
      }
      this.$store.dispatch('deleteComment', commentItemSet)
    }
  },
}
</script>

<style>

</style>
