<template>
  <div>
    <v-expansion-panel-header>
      리뷰 : <v-text-field v-model="reviewItem.title"></v-text-field>
      작성자 : <span>{{ review.user.username }}</span>
      작성일 : <span>{{ review.created_at | moment('YYYY-MM-DD HH:mm:ss') }}</span>
      수정일 : <span>{{ review.updated_at | moment('YYYY-MM-DD HH:mm:ss') }}</span>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      영화 : {{ review.movie_title }}</v-expansion-panel-content>
    <v-expansion-panel-content>
      <textarea name="reviewContent" cols="30" rows="10" v-model="reviewItem.content" placeholder="내용"></textarea>
      </v-expansion-panel-content>
    <v-expansion-panel-content>별점 :
      <v-rating
        v-model="reviewItem.rank"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        half-increments
        hover
        large
      ></v-rating>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <h3>Comments</h3>
      <CommentForm :review="review"/>
      <CommentList :review="review"/>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div class="buttons">
        <button class="btn btn-modify" @click="updateReview">리뷰 수정</button>
        <button class="btn btn-delete" @click="deleteReview">리뷰 삭제</button>
      </div>
    </v-expansion-panel-content>
  </div>
</template>

<script>
import CommentForm from '@/components/community/CommentForm'
import CommentList from '@/components/community/CommentList'

export default {
  name: 'ReviewListItem',
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      reviewItem: {
        movie_title: this.review.movie_title,
        title: this.review.title,
        content: this.review.content,
        rank: this.review.rank,
      },
    }
  },
  props: {
    review: {
      type: Object,
      required: true
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
    updateReview() {
      const reviewItemSet = {
        reviewItem: this.reviewItem,
        review_id: this.review.id,
        token: this.setToken()
      }
      this.$store.dispatch('updateReview', reviewItemSet)
    },
    deleteReview() {
      const reviewItemSet = {
        review_id: this.review.id,
        token: this.setToken()
      }
      this.$store.dispatch('deleteReview', reviewItemSet)
    }
  },
  created() {
    console.log(this.review)
  }
}
</script>

<style>

</style>
