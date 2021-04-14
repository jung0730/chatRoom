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
             fab>
        Leave
      </v-btn>
      <div class="message-area">
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
          <v-col v-for="(item, idx) in messages"
                 :key="idx"
                 cols="12">
            <div class="right-dialog-box">
              <p class="right-dialog-message">
                {{ item }}
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
      <form>
        <editable-div v-model="message" />
      </form>
    </v-container>
  </v-container>
</template>
<script>
import EditableDiv from '@/components/EditableDiv'
export default {
  components: {
    EditableDiv
  },
  data() {
    return {
      messages: [],
      message: ''
    }
  },
  updated() {
  },
  methods: {
    sendHandler() {
      if (this.message) {
        this.messages.push(this.message)
        this.message = ''
      }
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
  overflow-y: scroll;
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
    text-align: center;
    min-width: 2rem;
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
</style>