<template>
  <div class="community">
    <header>
      <h2>리뷰 게시판</h2>
    </header>
    <ReviewForm/>
    <ReviewList/>
  </div>
</template>

<script>
import ReviewList from '@/components/community/ReviewList'
import ReviewForm from '@/components/community/ReviewForm'

export default {
  name: 'Community',
  components: {
    ReviewList,
    ReviewForm
  },
}
</script>

<style>

</style>
