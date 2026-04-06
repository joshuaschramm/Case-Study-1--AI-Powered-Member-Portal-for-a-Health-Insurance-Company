<script setup>
import { ref, nextTick } from 'vue'
import { useChatStore } from '../stores/chat'
import { marked } from 'marked'

const chatStore = useChatStore()
const userInput = ref('')
const chatContainer = ref(null)

const suggestedQuestions = [
  'What is my deductible?',
  'How much are my copays?',
  'Do I need a referral for a specialist?',
  'What does telehealth cost?',
  'Tell me about mental health coverage',
  'What preventive care is covered?',
]

async function sendMessage() {
  const text = userInput.value.trim()
  if (!text) return
  userInput.value = ''
  await chatStore.sendMessage(text)
  await nextTick()
  scrollToBottom()
}

function askSuggested(question) {
  userInput.value = question
  sendMessage()
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

function renderMarkdown(text) {
  return marked.parse(text, { breaks: true })
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}
</script>

<template>
  <div>
    <v-row>
      <!-- Chat Area -->
      <v-col cols="12" md="8">
        <v-card class="rounded-lg d-flex flex-column" style="height: 75vh;">
          <!-- Chat Header -->
          <v-card-title class="d-flex align-center bg-primary pa-4">
            <v-avatar color="white" size="38" class="mr-3">
              <v-icon color="primary">mdi-robot-happy</v-icon>
            </v-avatar>
            <div>
              <div class="text-white font-weight-bold text-body-1">Benefits Assistant</div>
              <div class="text-blue-lighten-3 text-caption">
                <v-icon size="8" color="success" class="mr-1">mdi-circle</v-icon>
                Online — Ask me about your plan
              </div>
            </div>
          </v-card-title>

          <!-- Messages -->
          <v-card-text
            ref="chatContainer"
            class="flex-grow-1 overflow-y-auto pa-4"
            style="background: #f5f7fa;"
          >
            <div
              v-for="msg in chatStore.messages"
              :key="msg.id"
              class="mb-4 d-flex"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div class="d-flex align-end" :class="msg.role === 'user' ? 'flex-row-reverse' : ''">
                <v-avatar
                  :color="msg.role === 'assistant' ? 'primary' : 'secondary'"
                  size="32"
                  class="mx-2 flex-shrink-0"
                >
                  <v-icon size="18" color="white">
                    {{ msg.role === 'assistant' ? 'mdi-robot-happy' : 'mdi-account' }}
                  </v-icon>
                </v-avatar>
                <div>
                  <v-card
                    :color="msg.role === 'user' ? 'primary' : 'white'"
                    :class="msg.role === 'user' ? 'text-white' : ''"
                    class="pa-3 rounded-lg"
                    max-width="520"
                    elevation="1"
                  >
                    <div
                      class="text-body-2 chat-content"
                      v-html="renderMarkdown(msg.text)"
                    />
                  </v-card>
                  <div
                    class="text-caption text-medium-emphasis mt-1"
                    :class="msg.role === 'user' ? 'text-right' : ''"
                  >
                    {{ formatTime(msg.timestamp) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="chatStore.isTyping" class="mb-4 d-flex justify-start">
              <div class="d-flex align-end">
                <v-avatar color="primary" size="32" class="mx-2">
                  <v-icon size="18" color="white">mdi-robot-happy</v-icon>
                </v-avatar>
                <v-card color="white" class="pa-3 rounded-lg" elevation="1">
                  <div class="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </v-card>
              </div>
            </div>
          </v-card-text>

          <!-- Input -->
          <v-divider />
          <v-card-actions class="pa-4">
            <v-text-field
              v-model="userInput"
              placeholder="Ask about your benefits..."
              variant="outlined"
              density="comfortable"
              hide-details
              rounded="lg"
              @keyup.enter="sendMessage"
            >
              <template #append-inner>
                <v-btn
                  icon
                  color="primary"
                  size="small"
                  variant="flat"
                  :disabled="!userInput.trim()"
                  @click="sendMessage"
                >
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" md="4">
        <!-- Suggested Questions -->
        <v-card class="rounded-lg mb-4">
          <v-card-title class="text-body-1">
            <v-icon color="accent" class="mr-2" size="20">mdi-lightbulb-outline</v-icon>
            Suggested Questions
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-2">
            <v-chip
              v-for="q in suggestedQuestions"
              :key="q"
              class="ma-1"
              color="primary"
              variant="outlined"
              size="small"
              @click="askSuggested(q)"
            >
              {{ q }}
            </v-chip>
          </v-card-text>
        </v-card>

        <!-- Quick Copay Reference -->
        <v-card class="rounded-lg">
          <v-card-title class="text-body-1">
            <v-icon color="secondary" class="mr-2" size="20">mdi-cash-fast</v-icon>
            Quick Copay Reference
          </v-card-title>
          <v-divider />
          <v-list density="compact">
            <v-list-item>
              <template #prepend>
                <v-icon color="primary" size="18">mdi-doctor</v-icon>
              </template>
              <v-list-item-title class="text-body-2">Primary Care</v-list-item-title>
              <template #append>
                <span class="font-weight-bold text-body-2">$25</span>
              </template>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="secondary" size="18">mdi-stethoscope</v-icon>
              </template>
              <v-list-item-title class="text-body-2">Specialist</v-list-item-title>
              <template #append>
                <span class="font-weight-bold text-body-2">$50</span>
              </template>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="warning" size="18">mdi-hospital</v-icon>
              </template>
              <v-list-item-title class="text-body-2">Urgent Care</v-list-item-title>
              <template #append>
                <span class="font-weight-bold text-body-2">$75</span>
              </template>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="error" size="18">mdi-ambulance</v-icon>
              </template>
              <v-list-item-title class="text-body-2">Emergency</v-list-item-title>
              <template #append>
                <span class="font-weight-bold text-body-2">$250</span>
              </template>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="success" size="18">mdi-video</v-icon>
              </template>
              <v-list-item-title class="text-body-2">Telehealth</v-list-item-title>
              <template #append>
                <span class="font-weight-bold text-primary text-body-2">$0</span>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.chat-content :deep(p) {
  margin-bottom: 0.5rem;
}
.chat-content :deep(p:last-child) {
  margin-bottom: 0;
}
.chat-content :deep(ul), .chat-content :deep(ol) {
  padding-left: 1.2rem;
  margin-bottom: 0.5rem;
}
.chat-content :deep(strong) {
  font-weight: 700;
}

.typing-dots {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}
.typing-dots span {
  width: 8px;
  height: 8px;
  background: #90a4ae;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}
</style>
