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
import { removeLocalstorage } from '@/utils/Localstorage'
export default {
  name: 'Navbar',
  methods: {
    logout() {
      removeLocalstorage()
      this.$store.dispatch('reset')
      this.$router.push('/login')
    }
  }
}
</script>