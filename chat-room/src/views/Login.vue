<template>
  <v-container
    fluid
    fill-height
    class="login-container">
      <v-row
        justify="center">
        <v-col
          cols="12">
          <img
            src="~@/assets/login.svg"
            class="mr-auto ml-auto d-flex">
        </v-col>
        <v-col
          cols="5"
          offset="3">
          <v-text-field
            placeholder="Please enter your username"
            outlined
            clearable>
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn
            class="mt-1"
            color="primary"
            large
            depressed
            @click.prevent="sendLoginRequest">
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
      userName: ''
    }
  },
  computed: {

  },
  methods: {
    sendLoginRequest() {

    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  background: linear-gradient(to bottom right, #FFFFFF 55%, #0DA0D8);
}
</style>