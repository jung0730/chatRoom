<template>
    <v-container fluid
                 class="rooms-container">
      <v-row justify="end">
        <v-col cols="6"
               class="col-sm-6 col-md-2">
          <v-text-field label="Search"
                        append-icon="mdi-magnify"/>
        </v-col>
      </v-row>
      <v-row justify="center">
          <v-btn
            color="primary"
            large
            depressed
            :disabled="isLoading"
            @click.prevent="addRoom">
            Start a room
          </v-btn>
      </v-row>
      <v-row justify="center"
             class="mt-16">
        <v-col cols="10"
               class="col-sm-7 col-md-4">
          <v-card v-for="(card, idx) in cards"
                  :key="idx"
                  elevation="2"
                  class="mx-auto mb-8 card-deco">
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>
              Hosted by {{ card.host }}
              <v-btn
                  color="primary"
                  class="add-button"
                  dark
                  absolute
                  right
                  small
                  fab>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
  min-height: 100%;
  background: #f5f5f5;
  background-image: url('~@/assets/rooms.svg');
  background-repeat: no-repeat;
  background-position: bottom left;
  background-attachment: fixed;
  background-size: clamp(25rem, 45% , 50rem);
  &::before, &::after {
    background: #FFD402;
    content: '';
    position: absolute;
  }
  &::before {
    width: 7.5rem;
    height: 7.5rem;
    right: 0;
    top: 15%;
    clip-path: polygon(50% 25%, 100% 0%, 100% 75%, 50% 100%);
  }
  &::after {
    width: 8.75rem;
    height: 5rem;
    left: 3%;
    top: 0%;
    clip-path: polygon(50% 0, 100% 0%, 100% 75%, 50% 45%);
  }
}
.card-deco::before {
  content: '';
  background: #FFD402;
  width: 4.2rem;
  height: 1rem;
  position: absolute;
  border-radius: 1.5rem;
  transform: rotate(-20deg) translate(-10px, -6px);
}
.add-button {
  transform: translateY(-30px);
}
</style>