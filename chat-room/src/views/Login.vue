<template>
  <v-container fluid
               class="login-container">
      <v-row justify="center"
             class="mt-16">
        <img src="~@/assets/login.svg">
      </v-row>
      <v-row justify="center">
        <v-col cols="8"
               md="4"
               offset-md="1">
          <v-text-field placeholder="Please enter your username"
                        outlined
                        clearable
                        v-model="userName" />
        </v-col>
        <v-col cols="2">
          <v-btn class="mt-1 ml-1"
                 color="primary"
                 large
                 depressed
                 :disabled="isLoading"
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
  computed: {},
  methods: {
    async login() {
      if (this.userName) {
        try {
          this.isLoading = true
          const result = await this.$store.dispatch('Environment/login', {
            nickname: this.userName
          })
        } catch (e) {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: linear-gradient(to bottom right, #ffffff 55%, #0da0d8);
}
</style>
