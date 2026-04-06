<script setup>
import { computed } from 'vue'
import { useWellnessStore } from '../stores/wellness'
import { Line } from 'vue-chartjs'

// Chart.js plugin to create gradient fills
const gradientPlugin = {
  id: 'gradientFill',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart
    if (!chartArea) return
    chart.data.datasets.forEach((dataset, i) => {
      if (dataset._gradientColors) {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, dataset._gradientColors[0])
        gradient.addColorStop(1, dataset._gradientColors[1])
        chart.data.datasets[i].backgroundColor = gradient
      }
    })
  },
}

const wellnessStore = useWellnessStore()

function priorityColor(priority) {
  return { high: 'error', medium: 'warning', low: 'info' }[priority]
}

// Weekly steps chart
const stepsChartData = computed(() => ({
  labels: wellnessStore.weeklyActivity.labels,
  datasets: [
    {
      label: 'Steps',
      data: wellnessStore.weeklyActivity.steps,
      borderColor: '#1565C0',
      backgroundColor: 'rgba(21, 101, 192, 0.1)',
      _gradientColors: ['rgba(21, 101, 192, 0.35)', 'rgba(21, 101, 192, 0.02)'],
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#1565C0',
    },
  ],
}))

const stepsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.y.toLocaleString()} steps`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { callback: (val) => `${(val / 1000).toFixed(0)}k` },
    },
  },
}

// Monthly wellness score trend
const scoreChartData = computed(() => ({
  labels: wellnessStore.monthlyScores.labels,
  datasets: [
    {
      label: 'Wellness Score',
      data: wellnessStore.monthlyScores.scores,
      borderColor: '#00897B',
      backgroundColor: 'rgba(0, 137, 123, 0.1)',
      _gradientColors: ['rgba(0, 137, 123, 0.35)', 'rgba(0, 137, 123, 0.02)'],
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#00897B',
    },
  ],
}))

const scoreChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { min: 0, max: 100 },
  },
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <div class="text-h5 font-weight-bold mb-1">Wellness Dashboard</div>
      <div class="text-body-2 text-medium-emphasis">
        Track your health goals and get personalized recommendations.
      </div>
    </div>

    <!-- Score + Goals Row -->
    <v-row class="mb-6">
      <!-- Wellness Score -->
      <v-col cols="12" md="3">
        <v-card class="rounded-lg pa-4 text-center" height="100%">
          <div class="text-overline text-medium-emphasis mb-3">YOUR WELLNESS SCORE</div>
          <v-progress-circular
            :model-value="wellnessStore.wellnessScore"
            :color="wellnessStore.scoreColor"
            :size="140"
            :width="12"
          >
            <div>
              <div class="text-h3 font-weight-bold">{{ wellnessStore.wellnessScore }}</div>
              <div class="text-caption text-medium-emphasis">/ 100</div>
            </div>
          </v-progress-circular>
          <div class="mt-3 text-body-2 text-medium-emphasis">
            Avg steps: <strong>{{ wellnessStore.averageSteps.toLocaleString() }}</strong> / day
          </div>
        </v-card>
      </v-col>

      <!-- Goals -->
      <v-col cols="12" md="9">
        <v-card class="rounded-lg pa-4" height="100%">
          <div class="text-body-1 font-weight-bold mb-4">Daily Goals</div>
          <v-row>
            <v-col
              v-for="goal in wellnessStore.goals"
              :key="goal.id"
              cols="6"
              md="3"
            >
              <v-card variant="outlined" class="pa-3 rounded-lg text-center">
                <v-icon :color="goal.color" size="28" class="mb-2">{{ goal.icon }}</v-icon>
                <div class="text-body-2 font-weight-medium">{{ goal.title }}</div>
                <div class="text-h6 font-weight-bold mt-1" :style="{ color: goal.color }">
                  {{ goal.current }}
                  <span class="text-caption text-medium-emphasis font-weight-regular">
                    / {{ goal.target }} {{ goal.unit }}
                  </span>
                </div>
                <v-progress-linear
                  :model-value="(goal.current / goal.target) * 100"
                  :color="goal.color"
                  height="6"
                  rounded
                  class="mt-2"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row class="mb-6">
      <v-col cols="12" md="7">
        <v-card class="rounded-lg pa-4" height="100%">
          <div class="text-body-1 font-weight-bold mb-3">Weekly Step Activity</div>
          <div style="height: 260px;">
            <Line :data="stepsChartData" :options="stepsChartOptions" :plugins="[gradientPlugin]" />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card class="rounded-lg pa-4" height="100%">
          <div class="text-body-1 font-weight-bold mb-3">Wellness Score Trend</div>
          <div style="height: 260px;">
            <Line :data="scoreChartData" :options="scoreChartOptions" :plugins="[gradientPlugin]" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Personalized Recommendations -->
    <v-card class="rounded-lg">
      <v-card-title class="d-flex align-center pa-4">
        <v-icon color="accent" class="mr-2">mdi-lightbulb-on</v-icon>
        <span class="text-body-1 font-weight-bold">Personalized Recommendations</span>
      </v-card-title>
      <v-divider />
      <v-row class="pa-4" dense>
        <v-col
          v-for="rec in wellnessStore.sortedRecommendations"
          :key="rec.id"
          cols="12"
          md="6"
          class="d-flex"
        >
          <v-card
            variant="outlined"
            class="pa-4 rounded-lg mb-2 flex-grow-1"
            :style="{ borderColor: `rgb(var(--v-theme-${priorityColor(rec.priority)}))` }"
          >
            <div class="d-flex align-start">
              <v-avatar :color="priorityColor(rec.priority)" variant="tonal" size="40" class="mr-3 flex-shrink-0">
                <v-icon size="20">{{ rec.icon }}</v-icon>
              </v-avatar>
              <div class="flex-grow-1">
                <div class="d-flex align-center mb-1">
                  <span class="text-body-2 font-weight-bold mr-2">{{ rec.title }}</span>
                  <v-chip :color="priorityColor(rec.priority)" size="x-small" variant="tonal">
                    {{ rec.priority }}
                  </v-chip>
                </div>
                <div class="text-caption text-medium-emphasis mb-2">{{ rec.description }}</div>
                <v-btn
                  :color="priorityColor(rec.priority)"
                  variant="tonal"
                  size="small"
                  rounded="lg"
                >
                  {{ rec.actionLabel }}
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
