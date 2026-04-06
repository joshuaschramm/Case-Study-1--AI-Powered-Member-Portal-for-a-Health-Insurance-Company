<script setup>
import { useMemberStore } from '../stores/member'
import { useClaimsStore } from '../stores/claims'
import { useWellnessStore } from '../stores/wellness'
import { useRouter } from 'vue-router'

const memberStore = useMemberStore()
const claimsStore = useClaimsStore()
const wellnessStore = useWellnessStore()
const router = useRouter()

const quickActions = [
  { title: 'Ask About Benefits', icon: 'mdi-chat-question', color: 'primary', hex: '#1565C0', to: '/benefits' },
  { title: 'Find a Doctor', icon: 'mdi-magnify', color: 'secondary', hex: '#00897B', to: '/providers' },
  { title: 'View Claims', icon: 'mdi-file-document', color: 'accent', hex: '#FF6F00', to: '/claims' },
  { title: 'Wellness Score', icon: 'mdi-heart-pulse', color: '#7B1FA2', hex: '#7B1FA2', to: '/wellness' },
]

const recentClaims = claimsStore.filteredClaims.slice(0, 3)

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div>
    <!-- Welcome Banner -->
    <v-card variant="flat" class="mb-6 rounded-lg welcome-gradient" dark>
      <v-card-text class="pa-6">
        <v-row align="center">
          <v-col cols="12" md="8">
            <div class="text-h5 font-weight-bold text-white mb-1">
              Welcome back, {{ memberStore.member.firstName }}!
            </div>
            <div class="text-body-1 text-blue-lighten-3">
              {{ memberStore.member.planName }} &mdash; Member ID: {{ memberStore.member.memberId }}
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-md-right">
            <v-btn
              color="white"
              variant="flat"
              class="text-primary"
              prepend-icon="mdi-chat-question"
              size="large"
              rounded="lg"
              @click="router.push('/benefits')"
            >
              Ask a Question
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Quick Actions -->
    <v-row class="mb-6">
      <v-col v-for="action in quickActions" :key="action.title" cols="6" md="3">
        <v-card
          class="text-center pa-4 rounded-lg cursor-pointer hover-elevation"
          :style="{ borderTop: `3px solid ${action.hex}` }"
          @click="router.push(action.to)"
          hover
        >
          <v-icon :color="action.color" size="36" class="mb-2">{{ action.icon }}</v-icon>
          <div class="text-body-2 font-weight-medium">{{ action.title }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Coverage & Spending Row -->
    <v-row class="mb-6">
      <!-- Deductible Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-lg" height="100%">
          <div class="text-overline text-medium-emphasis mb-2">INDIVIDUAL DEDUCTIBLE</div>
          <div class="text-h5 font-weight-bold text-primary mb-1">
            {{ formatCurrency(memberStore.coverage.deductible.met) }}
            <span class="text-body-2 text-medium-emphasis font-weight-regular">
              / {{ formatCurrency(memberStore.coverage.deductible.individual) }}
            </span>
          </div>
          <v-progress-linear
            :model-value="memberStore.deductibleProgress"
            color="primary"
            height="10"
            rounded
            class="mb-2"
          />
          <div class="text-caption text-medium-emphasis">
            {{ formatCurrency(memberStore.deductibleRemaining) }} remaining
          </div>
        </v-card>
      </v-col>

      <!-- Out-of-Pocket Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-lg" height="100%">
          <div class="text-overline text-medium-emphasis mb-2">OUT-OF-POCKET MAX</div>
          <div class="text-h5 font-weight-bold text-secondary mb-1">
            {{ formatCurrency(memberStore.coverage.outOfPocketMax.met) }}
            <span class="text-body-2 text-medium-emphasis font-weight-regular">
              / {{ formatCurrency(memberStore.coverage.outOfPocketMax.individual) }}
            </span>
          </div>
          <v-progress-linear
            :model-value="memberStore.oopProgress"
            color="secondary"
            height="10"
            rounded
            class="mb-2"
          />
          <div class="text-caption text-medium-emphasis">
            {{ formatCurrency(memberStore.oopRemaining) }} remaining
          </div>
        </v-card>
      </v-col>

      <!-- Wellness Score Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-lg text-center" height="100%">
          <div class="text-overline text-medium-emphasis mb-2">WELLNESS SCORE</div>
          <div class="d-flex justify-center align-center mb-2">
            <v-progress-circular
              :model-value="wellnessStore.wellnessScore"
              :color="wellnessStore.scoreColor"
              :size="90"
              :width="8"
            >
              <span class="text-h4 font-weight-bold">{{ wellnessStore.wellnessScore }}</span>
            </v-progress-circular>
          </div>
          <v-btn
            variant="text"
            color="primary"
            size="small"
            @click="router.push('/wellness')"
          >
            View Details →
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Claims & Plan Highlights -->
    <v-row>
      <!-- Recent Claims -->
      <v-col cols="12" md="7">
        <v-card class="rounded-lg">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-file-document-outline</v-icon>
            Recent Claims
            <v-spacer />
            <v-btn variant="text" color="primary" size="small" @click="router.push('/claims')">
              View All
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-list>
            <v-list-item
              v-for="claim in recentClaims"
              :key="claim.id"
              class="py-3"
            >
              <template #prepend>
                <v-avatar
                  :color="claim.status === 'Pending' ? 'warning' : 'success'"
                  size="40"
                  variant="tonal"
                >
                  <v-icon size="20">
                    {{ claim.status === 'Pending' ? 'mdi-clock-outline' : 'mdi-check' }}
                  </v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-medium">
                {{ claim.description }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(claim.date) }} &mdash; {{ claim.provider }}
              </v-list-item-subtitle>
              <template #append>
                <div class="text-right">
                  <div class="text-body-2 font-weight-bold">
                    {{ claim.memberOwes === 0 ? 'No Cost' : formatCurrency(claim.memberOwes) }}
                  </div>
                  <v-chip
                    :color="claim.status === 'Pending' ? 'warning' : 'success'"
                    size="x-small"
                    variant="tonal"
                  >
                    {{ claim.status }}
                  </v-chip>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Plan Highlights -->
      <v-col cols="12" md="5">
        <v-card class="rounded-lg" height="100%">
          <v-card-title class="d-flex align-center">
            <v-icon color="secondary" class="mr-2">mdi-star-circle</v-icon>
            Plan Highlights
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="(highlight, i) in memberStore.planHighlights"
                :key="i"
                class="px-0"
              >
                <template #prepend>
                  <v-icon color="success" size="18" class="mr-2">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title class="text-body-2 text-wrap">
                  {{ highlight }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.hover-elevation:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
.welcome-gradient {
  background: linear-gradient(135deg, #1565C0 0%, #0D47A1 40%, #00897B 100%) !important;
  color: white;
}
</style>
