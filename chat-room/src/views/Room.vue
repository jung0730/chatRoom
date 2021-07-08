<template>
  <v-container fluid
               class="room">
    <Navbar :page="'room'" />
    <v-container class="chat">
      <div ref="messageArea"
           class="message">
        <v-progress-circular v-if="isLoading"
                             color="secondaryDark"
                             indeterminate
                             size="40"
                             class="message-progress" />
        <v-row v-for="(item, idx) in messages"
               :key="idx">
          <v-col cols="6"
                 :offset="checkUser(item.nickname) ? 0 : 6">
            <div :class="checkUser(item.nickname) ? 'message-left-dialog' : 'message-right-dialog'">
              <v-tooltip v-if="item.nickname !== nickname"
                         top>
                <template v-slot:activator="{on, attrs}">
                  <v-avatar color="secondaryDark"
                            size="56"
                            class="mr-2 message-avatar"
                            v-bind="attrs"
                            v-on="on">
                    {{ item.nickname.charAt(0) }}
                  </v-avatar>
                </template>
                <span> {{ item.nickname }} </span>
              </v-tooltip>
              <div :class="checkUser(item.nickname) ? 'message-left-dialog-text' : 'message-right-dialog-text'">
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
import { removeSessionstorage } from '@/utils/Sessionstorage'
import { mapState } from 'vuex'
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
      roomWs: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState('Environment', ['id', 'nickname', 'notification']) 
  },
  watch: {
    notification(newVal, oldVal) {
      if (newVal) {
        this.redirect(newVal)
        this.$store.dispatch('Environment/setNotification', '')
      }
    }
  },
  async created() {
    await this.$store.dispatch('Room/getRoom', this.$route.params.roomId).catch(e => {
      this.redirect(e)
    })
    this.connectRoomWs()
  },
  beforeDestroy() {
    this.roomWs.close()
  },
  methods: {
    redirect(msg) {
      this.$notify(msg)
      this.$router.go(-1)
    },
    checkUser(nickname) {
      return nickname !== this.nickname
    },
    sendHandler(files) {
      if (this.message) this.sendWs(this.message)
      if (files.length > 0) {
        files.forEach(file => {
          this.isLoading = true
          this.sendWs(file)
        })
      }
    },
    scrollToBottom() {
      this.$refs.messageArea.scrollTop = this.$refs.messageArea.scrollHeight
    },
    sendWs(payload) {
      this.roomWs.send(JSON.stringify({ nickname: this.nickname, message: payload }))
    },
    connectRoomWs() {
      if ('WebSocket' in window) {
        this.roomWs = new WebSocket(`ws://104.214.48.227:8080/api/v1/ws/club/${this.$route.params.roomId}?userId=${this.id}`)
        this.roomWs.onopen = () => { console.log('room connected') }
        this.roomWs.onmessage = (e) => {
          const data = JSON.parse(e.data)
          this.messages.push(data)
          this.isLoading = false
          this.message = ''
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.room {
  height: 100%;
  background: $gray;
}
.chat {
  max-width: 64rem;
  background: white;
  opacity: 0.8;
  border-radius: 1rem;
  position: relative;
  box-shadow: 20px 20px 50px $darkGray, -20px -20px 50px $white;
}
.message {
  overflow-x: hidden;
  height: calc(100vh - 200px);
  position: relative;
  img {
    width: 15rem;
    object-fit: cover;
  }
  &-progress {
    position: sticky;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  &-avatar {
    text-transform: capitalize;
  }
  &-left-dialog {
    &-text {
      background-color: $primaryDark;
    }
  }
  &-right-dialog {
    justify-content: flex-end;
    &-text {
      background-color: $primary;
    }
  }
}
.message-left-dialog, .message-right-dialog {
  display: flex;
  align-items: center;
  &-text {
    color: $white;
    border-radius: 1rem;
    padding: 0.5rem;
    text-align: justify;
    min-width: 2rem;
    white-space: pre-wrap;
  }
}
</style>