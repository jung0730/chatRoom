<template>
  <v-container fluid
               class="rooms">
    <Navbar :page="'list'" />
    <v-row justify="center">
      <p class="capitalize">
        Hello, {{ nickname }}
      </p>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="isShowDialog"
                width="600"
                overlay-opacity="0.9">
        <template v-slot:activator="{ on, attrs}">
          <v-btn color="primary"
                 large
                 depressed
                 v-bind="attrs"
                 v-on="on">
            Start a room
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-row class="mx-auto">
              <v-select v-model="topicName"
                        :items="topics"
                        class="mt-6"
                        hide-details
                        label="Topic Category"
                        data-test="topic" />
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field v-model.trim="roomName"
                              label="Room Name"
                              data-test="roomName"
                              hide-details
                              @keyup.enter.native="addHandler" />
              </v-col>
              <v-col cols="4">
                <v-btn color="primary"
                       class="mt-2"
                       medium
                       depressed
                       data-test="createBtn"
                       :loading="loading"
                       @click.prevent="addHandler">
                  Let's go!
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center"
           class="search">
      <v-col cols="5"
             sm="4"
             md="2">
        <v-text-field v-model="keyword"
                      append-icon="mdi-magnify"
                      @click:append="search"
                      @keyup.enter.native="search" />
      </v-col>
    </v-row>
    <v-row justify="center"
           class="mt-8">
      <v-col cols="10"
             sm="7"
             md="4">
        <v-card v-for="(room, idx) in rooms"
                :key="idx"
                elevation="2"
                class="mb-8 custom-card">
          <v-card-title data-test="title">
            {{ room.name }}
          </v-card-title>
          <v-card-subtitle data-test="subtitle">
            {{ room.topic }}
          </v-card-subtitle>
          <v-card-text data-test="text">
            Hosted by {{ room.host }}
            <div>
              <v-icon>mdi-account</v-icon>
              {{ room.number }}
            </div>
          </v-card-text>
          <v-btn color="primary"
                 class="custom-card-button"
                 dark
                 absolute
                 right
                 small
                 fab
                 @click="enter(room)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'
export default {
  name: 'Rooms',
  components: {
    Navbar
  },
  data() {
    return {
      topicName: '',
      roomName: '',
      isShowDialog: false,
      keyword: '',
      loading: false
    }
  },
  computed: {
    codes() { return this.$store.state.CodeTable.codes?.clubs_topic || [] },
    topics() { return this.codes.map(el => el.Option) || [] },
    ...mapState('Rooms', ['rooms', 'createdRoom']),
    ...mapState('Environment', ['nickname'])
  },
  async created() {
    await this.$store.dispatch('Room/leave').catch(() => null)
    this.$store.dispatch('Rooms/getRooms').catch(e => this.$notify(e))
    this.$store.dispatch('CodeTable/fetchCodes', ['clubs_topic']).catch(() => null)
  },
  methods: {
    enter(room) {
      this.$router.push(`/room/${room.id}`)
    },
    async search() {
      await this.$store.dispatch('Rooms/setKeyword', this.keyword)
      this.$store.dispatch('Rooms/getRooms').catch(e => this.$notify(e))
    },
    async addHandler() {
      if (this.topicName && this.roomName) {
        try {
          this.loading = true
          await this.$store.dispatch('Rooms/addRoom', {
            topic: this.topicName,
            clubName: this.roomName
          })
          this.$router.push(`/room/${this.createdRoom.id}`)
        } 
        catch(e) {
          this.$notify(e)
        }
        finally {
          this.topicName = ''
          this.roomName = ''
          this.loading = false
          this.isShowDialog = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$gray: #f5f5f5;
$secondaryMedium: #ffd402;
.capitalize {
  text-transform: capitalize
};
.v-dialog__content {
  align-items: flex-start;
}
.rooms {
  height: 100%;
  background: $gray;
  background-image: url('~@/assets/rooms.svg');
  background-repeat: no-repeat;
  background-position: bottom left;
  background-attachment: fixed;
  background-size: clamp(25rem, 45% , 50rem);
  &::before, &::after {
    background: $secondaryMedium;
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
.custom-card {
  text-transform: capitalize;
  &-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &::before {
    content: '';
    background: $secondaryMedium;
    width: 4.2rem;
    height: 1rem;
    position: absolute;
    border-radius: 1.5rem;
    transform: rotate(-20deg) translate(-10px, -6px);
  }
}
</style>