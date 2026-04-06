import { defineStore } from 'pinia'
import memberData from '../data/member.json'

export const useMemberStore = defineStore('member', {
  state: () => ({
    member: memberData.member,
    coverage: memberData.coverage,
    planHighlights: memberData.planHighlights,
  }),

  getters: {
    fullName: (state) => `${state.member.firstName} ${state.member.lastName}`,
    deductibleProgress: (state) => {
      const { met, individual } = state.coverage.deductible
      return Math.round((met / individual) * 100)
    },
    deductibleRemaining: (state) => {
      const { met, individual } = state.coverage.deductible
      return (individual - met).toFixed(2)
    },
    oopProgress: (state) => {
      const { met, individual } = state.coverage.outOfPocketMax
      return Math.round((met / individual) * 100)
    },
    oopRemaining: (state) => {
      const { met, individual } = state.coverage.outOfPocketMax
      return (individual - met).toFixed(2)
    },
  },
})
