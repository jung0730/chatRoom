<template>
  <v-row>
    <v-col cols="auto" 
           :class="checkPage ? 'ml-auto' : 'mr-auto'">
      <v-btn v-if="checkPage"
             icon
             color="primaryDark"
             @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else
             icon
             color="primaryDark"
             @click="back">
        <v-icon>mdi-arrow-left-bold-circle</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { removeSessionstorage } from '@/utils/Sessionstorage'
export default {
  name: 'Navbar',
  props: {
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    checkPage() { return this.page === 'list' }
  },
  methods: {
    back() {
      this.$router.push('/rooms')
    },
    logout() {
      removeSessionstorage()
      this.$store.dispatch('reset')
      this.$router.push('/login')
    }
  }
}
</script>