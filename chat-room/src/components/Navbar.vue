<template>
  <v-row>
    <v-col cols="auto" 
           class="ml-auto">
      <v-btn icon
             color="primaryDark"
             @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { removeSessionstorage } from '@/utils/Sessionstorage'
export default {
  name: 'Navbar',
  methods: {
    logout() {
      removeSessionstorage()
      this.$store.dispatch('reset')
      this.$router.push('/login')
    }
  }
}
</script>