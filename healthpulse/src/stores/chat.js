import { defineStore } from 'pinia'
import benefitsQA from '../data/benefitsQA.json'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [
      {
        id: 1,
        role: 'assistant',
        text: "👋 Hi Sarah! I'm your **HealthPulse Benefits Assistant**. I can help you understand your Meridian Gold PPO plan, look up copays, check your deductible, and more. What would you like to know?",
        timestamp: new Date().toISOString(),
      },
    ],
    isTyping: false,
    qaData: benefitsQA,
  }),

  actions: {
    async sendMessage(text) {
      // Add user message
      this.messages.push({
        id: Date.now(),
        role: 'user',
        text,
        timestamp: new Date().toISOString(),
      })

      // Simulate typing delay
      this.isTyping = true
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

      // Find matching response
      const response = this.findResponse(text)
      this.messages.push({
        id: Date.now() + 1,
        role: 'assistant',
        text: response,
        timestamp: new Date().toISOString(),
      })
      this.isTyping = false
    },

    findResponse(input) {
      const lower = input.toLowerCase()
      for (const qa of this.qaData) {
        if (qa.patterns[0] === 'default') continue
        for (const pattern of qa.patterns) {
          if (lower.includes(pattern)) {
            return qa.response
          }
        }
      }
      // Return default response
      const defaultQA = this.qaData.find((qa) => qa.patterns[0] === 'default')
      return defaultQA ? defaultQA.response : "I'm sorry, I didn't understand that. Could you try rephrasing?"
    },
  },
})
