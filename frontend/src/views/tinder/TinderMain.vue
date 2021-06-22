<template>
  <div class="tinder-div">
    <header>
      <h2>영화 Tinder</h2>
      <br>
      <h4>좋아하는 영화라면 오른쪽, 싫어하는 영화라면 왼쪽으로 슬라이딩 해주세요.</h4>
      <small>호감도를 바탕으로 영화 추천 서비스를 제공합니다.</small>
      <br>
      <h5>호감을 표시한 영화 : </h5>
    </header>
    <v-btn color="#831010" dark @click="submitGenres">
      호감도 저장하기
    </v-btn>
    <br>
    <Tinder
      ref="tinder"
      key-name="poster_path"
      :queue.sync="queue"
      :max="3"
      :offset-y="10"
      allow-down
      @submit="onSubmit"
    >
      <template
        slot-scope="scope">
        <div
          class="pic"
          :style="{
            'background-image': `url(https://image.tmdb.org/t/p/w500${scope.data.poster_path})`
          }"
        />
      </template>
      <img class="like-pointer" slot="like" src="../../assets/images/like-txt.png" />
      <img class="nope-pointer" slot="nope" src="../../assets/images/nope-txt.png" />
      <img class="super-pointer" slot="super" src="../../assets/images/super-txt.png" />
      <img class="down-pointer" slot="down" src="../../assets/images/rewind-txt.png" />
      <img class="rewind-pointer" slot="rewind" src="../../assets/images/rewind-txt.png" />
    </Tinder>
    <div class="btns">
      <img src="../../assets/images/rewind.png" @click="decide('rewind')" />
      <img src="../../assets/images/nope.png" @click="decide('nope')" />
      <img src="../../assets/images/super-like.png" @click="decide('super')" />
      <img src="../../assets/images/like.png" @click="decide('like')" />
      <img src="../../assets/images/help.png" @click="decide('help')" />
    </div>
  </div>
</template>

<script>
import Tinder from '@/components/tinder/Tinder'
import { mapGetters } from 'vuex'

export default {
  name: 'TinderMain',
  components: { Tinder },
  data: () => ({
    queue: [],
    offset: 0,
    history: []
  }),
  created() {
    // 랜덤 무비가 있을 때 mock을 실행해야 함.
    // watch를 쓰거나, async - await를 쓰는 방법 or promise로 .then 아래에 보여주기
    this.$store.dispatch('getRandomMovies', this.setToken())
  },
  watch: {
    // 해결!! watch
    randomMovies() {
      this.mock()
    }
  },
  computed: {
    ...mapGetters([
      'randomMovies', 'genres'
    ])
  },
  methods: {
    submitGenres() {
      const genreItems = {
        genres: this.genres,
        token: this.setToken()
      }
      this.$store.dispatch('submitGenres', genreItems)
    },
    setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    mock(count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ poster_path: this.randomMovies[this.offset].poster_path, movie: this.randomMovies[this.offset]})
        this.offset++
      }
      if (append) {
        this.queue = this.queue.concat(list)
      } else {
        this.queue.unshift(...list)
      }
    },
    onSubmit({ item, type }) {
      // submit의 타입이 like인 경우 dispatch
      if (type === 'like') {
        this.$store.dispatch('movieLike', item.movie.genre_ids)
      } else if (type === 'nope') {
        this.$store.dispatch('movieNope', item.movie.genre_ids)
      }
      if (this.queue.length < 3) {
        this.mock()
      }
      this.history.push(item)
    },
    async decide(choice) {
      if (choice === 'rewind') {
        if (this.history.length) {
          // this.$refs.tinder.rewind([this.history.pop()])
          // this.$refs.tinder.rewind(this.history)
          // this.history = []
          this.$refs.tinder.rewind(
            this.history.splice(-Math.ceil(Math.random() * 3))
          )
          // this.queue.unshift(this.history.pop())
          // this.queue.push(this.history.pop())
          // this.queue.splice(1, 0, this.history.pop())
          // this.queue.unshift(this.history.pop())
          // this.queue.unshift(...this.history)
        }
      } else if (choice === 'help') {
        // help일 경우 뭘 띄울까
      } else if (choice === 'like') {
        // 여기서는 state에 push 해주기
        this.$store.dispatch('movieLike', this.$refs.tinder.list[0].movie.genre_ids)
        this.$refs.tinder.decide(choice)
      } else if (choice === 'nope') {
        // 여기서는 pop 해주기
        this.$store.dispatch('movieNope', this.$refs.tinder.list[0].movie.genre_ids)
        this.$refs.tinder.decide(choice)
      } else {
        this.$refs.tinder.decide(choice)
      }
    }
  }
}
</script>

<style>

</style>
