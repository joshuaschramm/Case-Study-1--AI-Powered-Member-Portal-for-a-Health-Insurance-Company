<script setup>
import { useProvidersStore } from '../stores/providers'

const providersStore = useProvidersStore()

function formatDistance(d) {
  return `${d.toFixed(1)} mi`
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <div class="text-h5 font-weight-bold mb-1">Find In-Network Providers</div>
      <div class="text-body-2 text-medium-emphasis">
        Search for doctors, specialists, and facilities covered by your Meridian Gold PPO plan.
      </div>
    </div>

    <!-- Filters -->
    <v-card class="rounded-lg mb-6 pa-4">
      <v-row align="center" dense>
        <v-col cols="12" md="5">
          <v-text-field
            :model-value="providersStore.searchQuery"
            placeholder="Search by name, specialty, or facility..."
            variant="outlined"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-magnify"
            clearable
            rounded="lg"
            @update:model-value="providersStore.setSearch($event || '')"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            :model-value="providersStore.selectedSpecialty"
            :items="providersStore.specialties"
            label="Specialty"
            variant="outlined"
            density="comfortable"
            hide-details
            rounded="lg"
            @update:model-value="providersStore.setSpecialty($event)"
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-switch
            :model-value="providersStore.acceptingOnly"
            label="Accepting Patients"
            color="primary"
            density="comfortable"
            hide-details
            @update:model-value="providersStore.toggleAccepting()"
          />
        </v-col>
        <v-col cols="12" md="2" class="text-right">
          <v-chip color="primary" variant="tonal">
            {{ providersStore.filteredProviders.length }} results
          </v-chip>
        </v-col>
      </v-row>
    </v-card>

    <!-- Provider Cards -->
    <v-row>
      <v-col
        v-for="provider in providersStore.filteredProviders"
        :key="provider.id"
        cols="12"
        md="6"
      >
        <v-card class="rounded-lg" hover>
          <v-card-text class="pa-4">
            <v-row no-gutters>
              <v-col cols="auto" class="mr-4">
                <v-avatar
                  :color="provider.gender === 'Female' ? '#E8EAF6' : '#E3F2FD'"
                  size="56"
                >
                  <v-icon
                    :color="provider.gender === 'Female' ? '#5C6BC0' : '#1565C0'"
                    size="28"
                  >
                    mdi-doctor
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="d-flex align-center mb-1">
                  <span class="text-body-1 font-weight-bold mr-2">{{ provider.name }}</span>
                  <v-chip
                    v-if="provider.networkTier === 'Preferred'"
                    color="primary"
                    size="x-small"
                    variant="tonal"
                  >
                    Preferred
                  </v-chip>
                </div>
                <div class="text-body-2 text-primary font-weight-medium">
                  {{ provider.specialty }}
                </div>
                <div class="text-body-2 text-medium-emphasis">
                  {{ provider.facilityName }}
                </div>

                <!-- Rating -->
                <div class="d-flex align-center mt-2 mb-2">
                  <v-rating
                    :model-value="provider.rating"
                    color="amber"
                    half-increments
                    density="compact"
                    size="16"
                    readonly
                  />
                  <span class="text-body-2 font-weight-medium ml-1">{{ provider.rating }}</span>
                  <span class="text-caption text-medium-emphasis ml-1">
                    ({{ provider.reviewCount }} reviews)
                  </span>
                </div>

                <!-- Details -->
                <div class="d-flex flex-wrap ga-3 text-caption text-medium-emphasis">
                  <span>
                    <v-icon size="14" class="mr-1">mdi-map-marker</v-icon>
                    {{ formatDistance(provider.distance) }}
                  </span>
                  <span>
                    <v-icon size="14" class="mr-1">mdi-phone</v-icon>
                    {{ provider.phone }}
                  </span>
                  <span>
                    <v-icon size="14" class="mr-1">mdi-translate</v-icon>
                    {{ provider.languages.join(', ') }}
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions class="px-4 py-3">
            <v-chip
              :color="provider.acceptingNewPatients ? 'success' : 'error'"
              variant="tonal"
              size="small"
            >
              <v-icon start size="14">
                {{ provider.acceptingNewPatients ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              {{ provider.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting' }}
            </v-chip>
            <v-spacer />
            <v-btn
              v-if="provider.nextAvailable"
              variant="text"
              color="primary"
              size="small"
            >
              <v-icon start size="16">mdi-calendar</v-icon>
              Next: {{ new Date(provider.nextAvailable).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-card
      v-if="providersStore.filteredProviders.length === 0"
      class="rounded-lg text-center pa-8"
    >
      <v-icon size="48" color="medium-emphasis">mdi-account-search-outline</v-icon>
      <div class="text-h6 mt-3">No providers found</div>
      <div class="text-body-2 text-medium-emphasis">Try adjusting your search filters</div>
    </v-card>
  </div>
</template>
