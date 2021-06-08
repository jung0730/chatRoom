<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    ws: null
  }),
  computed: {
    userId() { return this.$store.state.Environment.id || '' }
  },
  watch: {
    userId(newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        this.connectWs()
      } else {
        this.ws.close()
      }
    }
  },
  created() {
    this.$store.dispatch('initEnvironment')
  },
  methods: {
    connectWs() {
      this.ws = new WebSocket(`ws://104.214.48.227:8080/api/v1/ws/user/${this.userId}`)
      this.ws.onopen = () => { console.log('user connected') }
      this.ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        if (data.error.message) this.$notify(data.error.message)
      }
      this.ws.onerror = () => { console.log('user error') }
    }
  }
}
</script>