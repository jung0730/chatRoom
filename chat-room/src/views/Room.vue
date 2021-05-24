<template>
  <v-container fluid
               class="room-container">
    <v-container class="chat-container">
      <v-btn elevation="4"
             absolute
             left
             dark
             color="normal"
             class="leave-button"
             fab
             @click="leave">
        Leave
      </v-btn>
      <div ref="messageArea"
           class="message-area">
        <v-row>
          <v-col cols="6">
            <div class="left-dialog-box">
              <v-avatar color="secondaryDark"
                        size="56"
                        class="mr-4">
                Xiang
              </v-avatar>
              <p class="left-dialog-message">
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
              </p>
            </div>
          </v-col>
          <v-col cols="6" 
                 offset="6">
            <div class="right-dialog-box">
              <p class="right-dialog-message">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-col>
          <v-col v-for="(item, index) in messages"
                 :key="index"
                 cols="12">
            <div class="right-dialog-box">
              <div class="right-dialog-message">
                <div v-if="Array.isArray(item)">
                  <div v-for="(file, idx) in item"
                       :key="idx">
                    <img :src="file">
                  </div>
                </div>
                <span v-else>{{ item }}</span>
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
export default {
  name: 'Room',
  components: {
    EditableDiv
  },
  data() {
    return {
      messages: [],
      message: '',
      ws: null
    }
  },
  computed: {
    room() { return this.$store.state.Rooms.createdRoom || {} }
  },
  created() {
    this.ws = new WebSocket('ws://104.214.48.227:8080/api/v1/ws/1')
    this.ws.onopen = (e) => { console.log(e) }
    this.ws.onmessage = (e) => {
      this.messages.push(e.data)
    }
  },
  destroyed() {
    this.ws.close()
  },
  mounted() {
    this.$store.dispatch('Room/getRoom', this.$route.params.roomId)
  },
  methods: {
    sendHandler(files) {
      if (this.message) this.ws.send(this.message)
      if (files.length > 0) this.ws.send(files)
      this.message = ''
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom() {
      this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight
    },
    async leave() {
      await this.$store.dispatch('Room/leave')
      .then(data => {
        this.$router.push('/rooms')
      }).catch(e => {
        // handle error
      })
    }
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
  height: calc(100vh - 150px);
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