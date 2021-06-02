<template>
  <v-container fluid
               class="room-container">
    <Navbar />
    <v-container class="chat-container">
      <!--<v-btn elevation="4"
             absolute
             left
             dark
             color="normal"
             class="leave-button"
             fab
             @click="leave">
        Leave
      </v-btn> -->
      <div ref="messageArea"
           class="message-area">
        <v-row v-for="(item, idx) in messages"
               :key="idx">
          <v-col cols="6"
                 :offset="checkUser(item.nickname) ? 0 : 6">
            <div :class="checkUser(item.nickname) ? 'left-dialog-box' : 'right-dialog-box'">
              <v-tooltip v-if="item.nickname !== nickname"
                         top>
                <template v-slot:activator="{on, attrs}">
                  <v-avatar color="secondaryDark"
                            size="56"
                            class="mr-2"
                            style="text-transform:capitalize"
                            v-bind="attrs"
                            v-on="on">
                    {{ item.nickname.charAt(0) }}
                  </v-avatar>
                </template>
                <span> {{ item.nickname }} </span>
              </v-tooltip>
              <div :class="checkUser(item.nickname) ? 'left-dialog-message' : 'right-dialog-message'">
                <template v-if="item.message.includes('data:image')">
                  <img :src="item.message">
                </template>
                <template v-else>
                  <span>
                    {{ item.message }}
                  </span>
                </template>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <form>
        <editable-div ref="editableComponent"
                      v-model.trim="message"
                      @enter="sendHandler" />
      </form>
    </v-container>
  </v-container>
</template>
<script>
import EditableDiv from '@/components/EditableDiv'
import Navbar from '@/components/Navbar'
export default {
  name: 'Room',
  components: {
    EditableDiv,
    Navbar
  },
  data() {
    return {
      messages: [],
      message: '',
      ws: null
    }
  },
  computed: {
    room() { return this.$store.state.Rooms.createdRoom || {} },
    id() { return this.$store.state.Environment.id || '' },
    nickname() { return this.$store.state.Environment.nickname || '' }
  },
  created() {
    this.ws = new WebSocket(`ws://104.214.48.227:8080/api/v1/ws/${this.$route.params.roomId}?userId=${this.id}`)
    this.ws.onopen = (e) => { console.log(e) }
    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      this.messages.push(data)
    }
    this.ws.onerror = (e) => { console.log('error', e )}
  },
  destroyed() {
    this.ws.close()
  },
  mounted() {
    this.$store.dispatch('Room/getRoom', this.$route.params.roomId)
  },
  methods: {
    checkUser(nickname) {
      return nickname !== this.nickname
    },
    sendHandler(files) {
      if (this.message) this.ws.send(JSON.stringify({ nickname: this.nickname, message: this.message }))
      if (files.length > 0) {
        files.forEach(file => {
          this.ws.send(JSON.stringify({ nickname: this.nickname, message: file }))
        })
      }
      this.message = ''
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom() {
      this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight
    }
    // async leave() {
    //   await this.$store.dispatch('Room/leave')
    //   .then(data => {
    //     this.$router.push('/rooms')
    //   }).catch(e => {
    //     // handle error
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.room-container {
  height: 100%;
  background: #f5f5f5;
}
.chat-container {
  max-width: 64rem;
  background: #ffffff;
  opacity: 0.8;
  border-radius: 1rem;
  position: relative;
  box-shadow: 20px 20px 50px #d9d9d9, -20px -20px 50px #ffffff;
}
.message-area {
  overflow-x: hidden;
  height: calc(100vh - 200px);
}
.left-dialog, .right-dialog {
  &-box {
    display: flex;
  }
  &-message {
    color: #FFFFFF;
    border-radius: 1rem;
    padding: 0.5rem;
    text-align: justify;
    min-width: 2rem;
    white-space: pre-wrap;
  }
}
.left-dialog {
  &-box {
    align-items: baseline;
  }
  &-message {
    background-color: #097BBD;
  }
}
.right-dialog {
  &-box {
    justify-content: flex-end;
  }
  &-message {
    background-color: #0DA0DB;    
  }
}
.leave-button {
  top: 50%;
  transform: translate(-100%, -50%)
}
img {
  width: 15rem;
  object-fit: cover;
}
</style>