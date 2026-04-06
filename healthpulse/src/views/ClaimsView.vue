<script setup>
import { computed, ref, onMounted } from 'vue'
import { useClaimsStore } from '../stores/claims'
import { useMemberStore } from '../stores/member'
import { Bar } from 'vue-chartjs'

const claimsChartRef = ref(null)

const claimsStore = useClaimsStore()
const memberStore = useMemberStore()

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function statusColor(status) {
  return status === 'Pending' ? 'warning' : 'success'
}

function typeIcon(type) {
  const icons = {
    'Office Visit': 'mdi-doctor',
    'Specialist Visit': 'mdi-stethoscope',
    Diagnostic: 'mdi-radiology-box',
    Prescription: 'mdi-pill',
    'Lab Work': 'mdi-test-tube',
    Telehealth: 'mdi-video',
  }
  return icons[type] || 'mdi-file-document'
}

// Chart data
const chartData = computed(() => {
  const spending = claimsStore.monthlySpending
  const labels = Object.keys(spending).sort().map((m) => {
    const [y, mo] = m.split('-')
    return new Date(y, mo - 1).toLocaleDateString('en-US', { month: 'short' })
  })
  const planPaid = Object.keys(spending).sort().map((m) => spending[m].planPaid)
  const memberOwes = Object.keys(spending).sort().map((m) => spending[m].memberOwes)

  return {
    labels,
    datasets: [
      {
        label: 'Plan Paid',
        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: canvasCtx, chartArea } = chart
          if (!chartArea) return '#1565C0'
          const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, '#1976D2')
          gradient.addColorStop(1, '#0D47A1')
          return gradient
        },
        data: planPaid,
        borderRadius: 4,
      },
      {
        label: 'Your Cost',
        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: canvasCtx, chartArea } = chart
          if (!chartArea) return '#FF6F00'
          const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, '#FFB74D')
          gradient.addColorStop(1, '#E65100')
          return gradient
        },
        data: memberOwes,
        borderRadius: 4,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: $${ctx.parsed.y.toFixed(2)}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (val) => `$${val}`,
      },
    },
  },
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <div class="text-h5 font-weight-bold mb-1">Claims History</div>
      <div class="text-body-2 text-medium-emphasis">
        View and track all your claims under the {{ memberStore.member.planName }} plan.
      </div>
    </div>

    <!-- Summary Cards -->
    <v-row class="mb-6">
      <v-col cols="6" md="3">
        <v-card class="pa-4 rounded-lg text-center">
          <div class="text-overline text-medium-emphasis">TOTAL BILLED</div>
          <div class="text-h6 font-weight-bold">{{ formatCurrency(claimsStore.totalBilled) }}</div>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="pa-4 rounded-lg text-center">
          <div class="text-overline text-medium-emphasis">PLAN PAID</div>
          <div class="text-h6 font-weight-bold text-primary">{{ formatCurrency(claimsStore.totalPlanPaid) }}</div>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="pa-4 rounded-lg text-center">
          <div class="text-overline text-medium-emphasis">YOUR COST</div>
          <div class="text-h6 font-weight-bold text-accent">{{ formatCurrency(claimsStore.totalMemberOwes) }}</div>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card class="pa-4 rounded-lg text-center">
          <div class="text-overline text-medium-emphasis">PENDING</div>
          <div class="text-h6 font-weight-bold text-warning">{{ claimsStore.pendingCount }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <!-- Chart -->
      <v-col cols="12" md="5">
        <v-card class="rounded-lg pa-4" height="100%">
          <div class="text-body-1 font-weight-bold mb-3">Monthly Spending Breakdown</div>
          <div style="height: 250px;">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>

      <!-- Filters + Claims Table -->
      <v-col cols="12" md="7">
        <v-card class="rounded-lg">
          <v-card-title class="d-flex align-center flex-wrap ga-3 pa-4">
            <span class="text-body-1 font-weight-bold">All Claims</span>
            <v-spacer />
            <v-chip-group
              :model-value="claimsStore.filters.status"
              mandatory
              selected-class="text-primary"
              @update:model-value="claimsStore.setStatusFilter($event)"
            >
              <v-chip value="All" size="small" variant="outlined">All</v-chip>
              <v-chip value="Processed" size="small" variant="outlined">Processed</v-chip>
              <v-chip value="Pending" size="small" variant="outlined">Pending</v-chip>
            </v-chip-group>
          </v-card-title>

          <v-divider />

          <v-list>
            <v-list-item
              v-for="claim in claimsStore.filteredClaims"
              :key="claim.id"
              class="py-3"
            >
              <template #prepend>
                <v-avatar color="primary" variant="tonal" size="42">
                  <v-icon size="20">{{ typeIcon(claim.type) }}</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium text-body-2">
                {{ claim.description }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ formatDate(claim.date) }} &bull; {{ claim.provider }}
                &bull; <span class="font-weight-medium">{{ claim.type }}</span>
              </v-list-item-subtitle>

              <template #append>
                <div class="text-right">
                  <div class="text-body-2 font-weight-bold mb-1">
                    {{ claim.memberOwes === 0 ? '$0.00' : formatCurrency(claim.memberOwes) }}
                  </div>
                  <v-chip
                    :color="statusColor(claim.status)"
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
    </v-row>
  </div>
</template>
