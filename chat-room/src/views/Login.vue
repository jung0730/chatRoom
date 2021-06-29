<template>
  <v-container fluid
               class="login">
    <v-row justify="center"
           class="mt-10">
      <img src="~@/assets/login.svg">
    </v-row>
    <v-row justify="center">
      <v-col cols="6"
             md="3"
             offset-md="1">
        <v-text-field v-model.trim="userName"
                      placeholder="Please enter your username"
                      hide-details
                      data-test="userName"
                      @keyup.enter.native="login" />
      </v-col>
      <v-col cols="2">
        <v-btn class="mt-2"
               color="primary"
               medium
               depressed
               :disabled="!userName"
               data-test="btn"
               :loading="isLoading"
               @click.prevent="login">
          Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      isLoading: false
    }
  },
  methods: {
    async login() {
      if (this.userName) {
        try {
          this.isLoading = true
          await this.$store.dispatch('Environment/login', {
            nickname: this.userName
          })
          this.$router.push('/rooms')
        } catch(e) {
          this.$notify(e)
        } finally {
          this.userName = ''
          this.isLoading = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background: linear-gradient(to bottom right, #ffffff 55%, #0da0d8);
}
</style>
