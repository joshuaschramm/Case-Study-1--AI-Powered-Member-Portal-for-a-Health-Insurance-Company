import { defineStore } from 'pinia'
import providersData from '../data/providers.json'

export const useProvidersStore = defineStore('providers', {
  state: () => ({
    providers: providersData,
    searchQuery: '',
    selectedSpecialty: 'All',
    acceptingOnly: false,
  }),

  getters: {
    specialties: (state) => {
      const specs = [...new Set(state.providers.map((p) => p.specialty))]
      return ['All', ...specs.sort()]
    },

    filteredProviders: (state) => {
      let result = [...state.providers]

      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase()
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.specialty.toLowerCase().includes(q) ||
            p.facilityName.toLowerCase().includes(q)
        )
      }

      if (state.selectedSpecialty !== 'All') {
        result = result.filter((p) => p.specialty === state.selectedSpecialty)
      }

      if (state.acceptingOnly) {
        result = result.filter((p) => p.acceptingNewPatients)
      }

      return result.sort((a, b) => a.distance - b.distance)
    },
  },

  actions: {
    setSearch(query) {
      this.searchQuery = query
    },
    setSpecialty(specialty) {
      this.selectedSpecialty = specialty
    },
    toggleAccepting() {
      this.acceptingOnly = !this.acceptingOnly
    },
  },
})
