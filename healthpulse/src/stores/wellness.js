import { defineStore } from 'pinia'
import wellnessData from '../data/wellness.json'

export const useWellnessStore = defineStore('wellness', {
  state: () => ({
    wellnessScore: wellnessData.wellnessScore,
    goals: wellnessData.goals,
    weeklyActivity: wellnessData.weeklyActivity,
    recommendations: wellnessData.recommendations,
    monthlyScores: wellnessData.monthlyScores,
  }),

  getters: {
    scoreColor: (state) => {
      if (state.wellnessScore >= 80) return '#388E3C'
      if (state.wellnessScore >= 60) return '#FF6F00'
      return '#D32F2F'
    },

    sortedRecommendations: (state) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return [...state.recommendations].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      )
    },

    averageSteps: (state) => {
      const steps = state.weeklyActivity.steps
      return Math.round(steps.reduce((a, b) => a + b, 0) / steps.length)
    },
  },
})
