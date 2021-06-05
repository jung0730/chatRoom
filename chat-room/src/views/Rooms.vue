<template>
  <v-container fluid
               class="rooms-container">
    <Navbar />
    <v-row justify="center">
      <p style="text-transform: capitalize">
        Hello, {{ nickname }}
      </p>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="isShowDialog"
                width="600"
                overlay-opacity="0.9"
                data-test="dialog">
        <template v-slot:activator="{ on, attrs}">
          <v-btn color="primary"
                 large
                 depressed
                 data-test="btn"
                 v-bind="attrs"
                 v-on="on">
            Start a room
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-row class="mx-auto"
                   style="width:100%">
              <v-select v-model="topicName"
                        :items="topics"
                        class="mt-6"
                        label="Topic Category" />
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field v-model.trim="roomName"
                              label="Room Name"
                              clearable />
              </v-col>
              <v-col cols="3">
                <v-btn class="mt-1 ml-1"
                       color="primary"
                       large
                       depressed
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
      <v-text-field v-model="keyword"
                    label="Search"
                    append-icon="mdi-magnify"
                    @keyup.enter.native="search" />
    </v-row>
    <v-row justify="center"
           class="mt-8">
      <v-col cols="10"
             sm="7"
             md="4">
        <v-card v-for="(room, idx) in rooms"
                :key="idx"
                elevation="2"
                class="mx-auto mb-8 card-deco">
          <v-card-title>
            {{ room.name }} ({{ room.number }} people online now)
          </v-card-title>
          <v-card-subtitle
            style="text-transform: capitalize">
            {{ room.topic }}
          </v-card-subtitle>
          <v-card-text>
            Hosted by
            <span style="text-transform: capitalize">
              {{ room.host }}
            </span>
          </v-card-text>
          <v-btn color="primary"
                 class="add-button"
                 dark
                 absolute
                 right
                 small
                 fab
                 @click="enter(room.id)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from '@/components/Navbar'
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
      ws: null
    }
  },
  computed: {
    userId() { return this.$store.state.Environment.id || ''},
    rooms() { return this.$store.state.Rooms.rooms || [] },
    nickname() { return this.$store.state.Environment.nickname || '' },
    roomId() { return this.$store.state.Rooms.createdRoom.id || '' },
    codes() { return this.$store.state.CodeTable.codes?.clubs_topic || [] },
    topics() { return this.codes.map(el => el.Option) || []}
  },
  async created() {
    await this.$store.dispatch('Rooms/getRooms').catch(e => this.$notify(e.message))
    await this.$store.dispatch('CodeTable/fetchCodes', ['clubs_topic']).catch(e => this.$notify(e.message))
    this.connectWs()
  },
  methods: {
    connectWs() {
      if ('WebSocket' in window) {
        this.ws = new WebSocket(`ws://104.214.48.227:8080/api/v1/ws/user/${this.userId}`)
        this.ws.onopen = () => { console.log('user connected') }
        this.ws.onmessage = (e) => {
          const data = JSON.parse(e.data)
          if (data.error.message) this.$notify(data.error.message)
        }
      } else {
        this.$notify('WebSocket not supported by your browser!')
      }
    },
    enter(id) {
      this.$router.push(`/room/${id}`)
    },
    async search() {
      await this.$store.dispatch('Rooms/setKeyword', this.keyword)
      this.$store.dispatch('Rooms/getRooms').catch(e => this.$notify(e.message))
    },
    async addHandler() {
      if (this.topicName && this.roomName) {
        await this.$store.dispatch('Rooms/addRoom', {
          topic: this.topicName,
          clubName: this.roomName
        }).then(data => {
          this.topicName = ''
          this.roomName = ''
          this.$router.push(`/room/${this.roomId}`)
        }).catch(e => {
          this.$notify(e.message)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rooms-container {
  height: 100%;
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
.card-deco {
  min-height: 8rem;
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
  position: absolute;
  top: 0;
  transform: translateY(100%);
}
.v-dialog__content {
  align-items: flex-start;
}
.search {
  width: 20%;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>