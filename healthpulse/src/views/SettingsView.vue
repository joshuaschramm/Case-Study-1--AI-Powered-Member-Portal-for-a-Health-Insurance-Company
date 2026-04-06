<script setup>
import { ref } from 'vue'

const snackbar = ref(false)
const snackbarMessage = ref('')

// Notification preferences
const notificationPrefs = ref({
  claimUpdates: true,
  appointmentReminders: true,
  wellnessAlerts: true,
  benefitChanges: true,
  promotionalEmails: false,
})

const notificationMethod = ref('both')

// Display preferences
const fontSize = ref('medium')
const compactMode = ref(false)
const showCopayChart = ref(true)

// Privacy & Security
const twoFactorEnabled = ref(false)
const biometricLogin = ref(true)
const shareWellnessData = ref(true)
const dataRetention = ref('1year')

// Language
const language = ref('en')
const languages = [
  { title: 'English', value: 'en' },
  { title: 'Español', value: 'es' },
  { title: '中文', value: 'zh' },
  { title: '한국어', value: 'ko' },
  { title: 'Tiếng Việt', value: 'vi' },
]

function saveSettings() {
  snackbarMessage.value = 'Settings saved successfully!'
  snackbar.value = true
}

function resetDefaults() {
  notificationPrefs.value = {
    claimUpdates: true,
    appointmentReminders: true,
    wellnessAlerts: true,
    benefitChanges: true,
    promotionalEmails: false,
  }
  notificationMethod.value = 'both'
  fontSize.value = 'medium'
  compactMode.value = false
  showCopayChart.value = true
  twoFactorEnabled.value = false
  biometricLogin.value = true
  shareWellnessData.value = true
  dataRetention.value = '1year'
  language.value = 'en'
  snackbarMessage.value = 'Settings reset to defaults.'
  snackbar.value = true
}
</script>

<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon variant="text" to="/" class="mr-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div>
        <h1 class="text-h5 font-weight-bold">Settings</h1>
        <p class="text-body-2 text-medium-emphasis">
          Manage your notification preferences, display, and security options
        </p>
      </div>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <!-- Notification Settings -->
        <v-card rounded="lg" elevation="1" class="mb-4">
          <v-card-title>
            <v-icon color="primary" class="mr-2">mdi-bell-outline</v-icon>
            Notification Preferences
          </v-card-title>
          <v-card-text>
            <div class="text-body-2 text-medium-emphasis mb-4">
              Choose which notifications you'd like to receive.
            </div>

            <v-switch
              v-model="notificationPrefs.claimUpdates"
              label="Claim status updates"
              color="primary"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-switch
              v-model="notificationPrefs.appointmentReminders"
              label="Appointment reminders"
              color="primary"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-switch
              v-model="notificationPrefs.wellnessAlerts"
              label="Wellness goal achievements"
              color="primary"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-switch
              v-model="notificationPrefs.benefitChanges"
              label="Benefit and plan change alerts"
              color="primary"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-switch
              v-model="notificationPrefs.promotionalEmails"
              label="Promotional and wellness program emails"
              color="primary"
              density="compact"
              hide-details
              class="mb-4"
            />

            <v-divider class="mb-4" />

            <div class="text-subtitle-2 font-weight-medium mb-2">Delivery Method</div>
            <v-radio-group v-model="notificationMethod" inline hide-details>
              <v-radio label="Email only" value="email" color="primary" />
              <v-radio label="Push only" value="push" color="primary" />
              <v-radio label="Both" value="both" color="primary" />
            </v-radio-group>
          </v-card-text>
        </v-card>

        <!-- Display Settings -->
        <v-card rounded="lg" elevation="1" class="mb-4">
          <v-card-title>
            <v-icon color="secondary" class="mr-2">mdi-palette-outline</v-icon>
            Display Preferences
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="fontSize"
                  :items="[
                    { title: 'Small', value: 'small' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' },
                  ]"
                  label="Font Size"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="language"
                  :items="languages"
                  label="Language"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                />
              </v-col>
            </v-row>

            <v-switch
              v-model="compactMode"
              label="Compact dashboard layout"
              color="secondary"
              density="compact"
              hide-details
              class="mt-4 mb-2"
            />
            <v-switch
              v-model="showCopayChart"
              label="Show copay quick-reference on Benefits page"
              color="secondary"
              density="compact"
              hide-details
            />
          </v-card-text>
        </v-card>

        <!-- Privacy & Security -->
        <v-card rounded="lg" elevation="1" class="mb-4">
          <v-card-title>
            <v-icon color="error" class="mr-2">mdi-shield-lock-outline</v-icon>
            Privacy &amp; Security
          </v-card-title>
          <v-card-text>
            <v-switch
              v-model="twoFactorEnabled"
              color="error"
              density="compact"
              hide-details
              class="mb-2"
            >
              <template #label>
                <div>
                  <span>Two-factor authentication</span>
                  <v-chip
                    v-if="twoFactorEnabled"
                    color="success"
                    size="x-small"
                    class="ml-2"
                  >
                    Enabled
                  </v-chip>
                </div>
              </template>
            </v-switch>
            <v-switch
              v-model="biometricLogin"
              label="Biometric login (Face ID / Touch ID)"
              color="error"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-switch
              v-model="shareWellnessData"
              label="Share wellness data with care team"
              color="error"
              density="compact"
              hide-details
              class="mb-4"
            />

            <v-divider class="mb-4" />

            <v-select
              v-model="dataRetention"
              :items="[
                { title: '6 months', value: '6months' },
                { title: '1 year', value: '1year' },
                { title: '2 years', value: '2years' },
                { title: 'Keep indefinitely', value: 'indefinite' },
              ]"
              label="Data Retention Period"
              variant="outlined"
              density="comfortable"
              hide-details
              hint="How long to keep your activity history"
              persistent-hint
              style="max-width: 320px;"
            />
          </v-card-text>
        </v-card>

        <!-- Actions -->
        <div class="d-flex justify-end ga-3 mb-6">
          <v-btn
            variant="outlined"
            prepend-icon="mdi-refresh"
            @click="resetDefaults"
          >
            Reset Defaults
          </v-btn>
          <v-btn
            color="primary"
            prepend-icon="mdi-content-save-outline"
            @click="saveSettings"
          >
            Save Settings
          </v-btn>
        </div>
      </v-col>

      <!-- Sidebar Help -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="1" variant="tonal" color="primary" class="mb-4">
          <v-card-text class="text-center pa-6">
            <v-icon size="48" color="primary" class="mb-3">mdi-help-circle-outline</v-icon>
            <div class="text-subtitle-1 font-weight-bold mb-2">Need Help?</div>
            <div class="text-body-2 mb-4">
              Our support team is available 24/7 to assist with account and settings questions.
            </div>
            <v-btn variant="flat" color="primary" prepend-icon="mdi-phone">
              (800) 555-HLTH
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card rounded="lg" elevation="1" class="mb-4">
          <v-card-title class="text-subtitle-2">
            <v-icon size="18" class="mr-1">mdi-information-outline</v-icon>
            About HealthPulse
          </v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title class="text-caption text-medium-emphasis">Version</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">1.0.0</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-caption text-medium-emphasis">Last Updated</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">March 19, 2026</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-caption text-medium-emphasis">Plan Year</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">Jan 1 – Dec 31, 2026</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card rounded="lg" elevation="1">
          <v-card-text class="text-center pa-4">
            <v-btn
              variant="text"
              color="primary"
              size="small"
              prepend-icon="mdi-file-document-outline"
            >
              Privacy Policy
            </v-btn>
            <v-btn
              variant="text"
              color="primary"
              size="small"
              prepend-icon="mdi-gavel"
            >
              Terms of Service
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="success" :timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>
