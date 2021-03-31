<template>
  <v-container fluid
               fill-height
               class="rooms-container">
    <v-row>
      <!--<v-col offset="10">
        <v-text-field
          label="Search"
          append-icon="mdi-map-marker"/>
      </v-col> -->
      <v-col class="d-flex justify-center">
        <v-btn
          color="primary"
          large
          depressed
          :disabled="isLoading"
          @click.prevent="addRoom">
          Start a room
        </v-btn>
      </v-col>
    </v-row>
    <div class="d-flex flex-column mx-auto">
      <v-card v-for="(card, idx) in cards"
              :key="idx"
              min-width="480"
              elevation="2"
              class="mx-auto mb-8">
        <v-card-title>{{ card.title }}</v-card-title>
        <v-card-text>
          Hosted by {{ card.host }}
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Title 1 test',
          host: 'Beca'
        },
        {
          title: 'Title 2 test',
          host: 'Xiang'
        },
        {
          title: 'Title 3 test',
          host: 'Jacky'
        },
        {
          title: 'Title 4 test',
          host: 'Zhen'
        },
        {
          title: 'Title 5 test',
          host: 'Wei'
        }
      ]
    }
  },
  methods: {
    addRoom() {

    }
  }
}
</script>
<style lang="scss" scoped>
.rooms-container {
  background: #f5f5f5;
  background-image: url('~@/assets/rooms.svg');
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: clamp(25rem, 45% , 50rem)
}
</style>