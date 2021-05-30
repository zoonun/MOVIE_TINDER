<template>
  <div>
    <div class="authForm">
      <h2>회원가입</h2>
        <div class="signupInput">
          <div>
            <input class="form-control" id="email" v-model="credentials.email" type="email" placeholder="이메일 주소 또는 전화번호">
          </div>
          <div>
            <input class="form-control" id="username" v-model="credentials.username" type="text" placeholder="아이디">
          </div>
          <div>
            <input class="form-control" id="password" v-model="credentials.password" type="password" placeholder="비밀번호">
          </div>
          <div>
            <input class="form-control" id="passwordConfirmation" v-model="credentials.passwordConfirmation" type="password" placeholder="비밀번호 확인">
          </div>
        </div>
        <button @click="signup" class="btn submitBtn">회원가입</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
        email: null,
      }
    }
  },
  methods: {
    signup() {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials,
      })
      .then(
        this.$router.push({ name:'Login' })
      )
      .catch(
        err => console.log(err)
      )
    }
  }
}
</script>

<style>
  @import '../../assets/styles/common.css';
</style>
