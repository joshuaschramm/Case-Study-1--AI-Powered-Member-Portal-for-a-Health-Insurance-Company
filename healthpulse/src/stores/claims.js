import { defineStore } from 'pinia'
import claimsData from '../data/claims.json'

export const useClaimsStore = defineStore('claims', {
  state: () => ({
    claims: claimsData,
    filters: {
      status: 'All',
      type: 'All',
      dateRange: null,
    },
  }),

  getters: {
    filteredClaims: (state) => {
      let result = [...state.claims]
      if (state.filters.status !== 'All') {
        result = result.filter((c) => c.status === state.filters.status)
      }
      if (state.filters.type !== 'All') {
        result = result.filter((c) => c.type === state.filters.type)
      }
      return result.sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    totalBilled: (state) =>
      state.claims.reduce((sum, c) => sum + c.billedAmount, 0),

    totalPlanPaid: (state) =>
      state.claims.reduce((sum, c) => sum + c.planPaid, 0),

    totalMemberOwes: (state) =>
      state.claims.reduce((sum, c) => sum + c.memberOwes, 0),

    pendingCount: (state) =>
      state.claims.filter((c) => c.status === 'Pending').length,

    claimTypes: (state) => {
      const types = [...new Set(state.claims.map((c) => c.type))]
      return ['All', ...types]
    },

    monthlySpending: (state) => {
      const months = {}
      state.claims.forEach((claim) => {
        const month = claim.date.substring(0, 7)
        if (!months[month]) months[month] = { planPaid: 0, memberOwes: 0 }
        months[month].planPaid += claim.planPaid
        months[month].memberOwes += claim.memberOwes
      })
      return months
    },
  },

  actions: {
    setStatusFilter(status) {
      this.filters.status = status
    },
    setTypeFilter(type) {
      this.filters.type = type
    },
  },
})
