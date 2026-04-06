<script setup>
import { ref, computed } from 'vue'
import { useMemberStore } from '../stores/member'

const memberStore = useMemberStore()
const member = computed(() => memberStore.member)
const coverage = computed(() => memberStore.coverage)

const editing = ref(false)
const editForm = ref({
  email: '',
  phone: '',
  address: '742 Evergreen Terrace, Apt 4B, Seattle, WA 98101',
})

const emergencyContact = ref({
  name: 'David Chen',
  relationship: 'Spouse',
  phone: '(555) 345-6789',
})

function startEditing() {
  editForm.value.email = member.value.email
  editForm.value.phone = member.value.phone
  editing.value = true
}

function saveChanges() {
  editing.value = false
}

function cancelEditing() {
  editing.value = false
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon variant="text" to="/" class="mr-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div>
        <h1 class="text-h5 font-weight-bold">My Profile</h1>
        <p class="text-body-2 text-medium-emphasis">
          Manage your personal information and plan details
        </p>
      </div>
    </div>

    <v-row>
      <!-- Profile Card -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="1">
          <div class="profile-header pa-6 text-center">
            <v-avatar color="secondary" size="80" class="mb-3 elevation-4">
              <span class="text-white text-h4 font-weight-bold">
                {{ member.firstName[0] }}{{ member.lastName[0] }}
              </span>
            </v-avatar>
            <h2 class="text-h6 font-weight-bold text-white">
              {{ memberStore.fullName }}
            </h2>
            <p class="text-body-2" style="color: rgba(255,255,255,0.85);">
              {{ member.planName }}
            </p>
            <v-chip color="white" variant="flat" size="small" class="mt-2">
              <v-icon start size="14">mdi-check-circle</v-icon>
              Active Member
            </v-chip>
          </div>

          <v-list density="compact" class="pa-4">
            <v-list-item>
              <template #prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-identifier</v-icon>
              </template>
              <v-list-item-title class="text-caption text-medium-emphasis">Member ID</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-medium text-high-emphasis">
                {{ member.memberId }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-account-group</v-icon>
              </template>
              <v-list-item-title class="text-caption text-medium-emphasis">Group Number</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-medium text-high-emphasis">
                {{ member.groupNumber }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-calendar-check</v-icon>
              </template>
              <v-list-item-title class="text-caption text-medium-emphasis">Effective Date</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-medium text-high-emphasis">
                {{ formatDate(member.effectiveDate) }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon color="primary" size="20" class="mr-3">mdi-stethoscope</v-icon>
              </template>
              <v-list-item-title class="text-caption text-medium-emphasis">Primary Care Physician</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-medium text-high-emphasis">
                {{ member.primaryCarePhysician }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Contact & Personal Info -->
      <v-col cols="12" md="8">
        <!-- Contact Information -->
        <v-card rounded="lg" elevation="1" class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-card-account-details-outline</v-icon>
            Contact Information
            <v-spacer />
            <v-btn
              v-if="!editing"
              variant="tonal"
              color="primary"
              size="small"
              prepend-icon="mdi-pencil-outline"
              @click="startEditing"
            >
              Edit
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row v-if="!editing">
              <v-col cols="12" sm="6">
                <div class="text-caption text-medium-emphasis mb-1">Email Address</div>
                <div class="text-body-1">{{ member.email }}</div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-caption text-medium-emphasis mb-1">Phone Number</div>
                <div class="text-body-1">{{ member.phone }}</div>
              </v-col>
              <v-col cols="12">
                <div class="text-caption text-medium-emphasis mb-1">Mailing Address</div>
                <div class="text-body-1">{{ editForm.address }}</div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-caption text-medium-emphasis mb-1">Date of Birth</div>
                <div class="text-body-1">{{ formatDate(member.dateOfBirth) }}</div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-caption text-medium-emphasis mb-1">Plan Type</div>
                <div class="text-body-1">{{ member.planType }}</div>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editForm.email"
                  label="Email Address"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-email-outline"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editForm.phone"
                  label="Phone Number"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-phone-outline"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editForm.address"
                  label="Mailing Address"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-map-marker-outline"
                />
              </v-col>
              <v-col cols="12" class="d-flex justify-end ga-2">
                <v-btn variant="text" @click="cancelEditing">Cancel</v-btn>
                <v-btn color="primary" @click="saveChanges">Save Changes</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Emergency Contact -->
        <v-card rounded="lg" elevation="1" class="mb-4">
          <v-card-title>
            <v-icon color="error" class="mr-2">mdi-alert-circle-outline</v-icon>
            Emergency Contact
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="text-caption text-medium-emphasis mb-1">Name</div>
                <div class="text-body-1">{{ emergencyContact.name }}</div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-caption text-medium-emphasis mb-1">Relationship</div>
                <div class="text-body-1">{{ emergencyContact.relationship }}</div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-caption text-medium-emphasis mb-1">Phone</div>
                <div class="text-body-1">{{ emergencyContact.phone }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Coverage Summary -->
        <v-card rounded="lg" elevation="1">
          <v-card-title>
            <v-icon color="secondary" class="mr-2">mdi-shield-check-outline</v-icon>
            Coverage Summary
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-card variant="tonal" color="primary" class="pa-4" rounded="lg">
                  <div class="text-caption text-medium-emphasis">Individual Deductible</div>
                  <div class="text-h5 font-weight-bold mt-1">
                    ${{ coverage.deductible.met.toLocaleString() }}
                    <span class="text-body-2 font-weight-regular text-medium-emphasis">
                      / ${{ coverage.deductible.individual.toLocaleString() }}
                    </span>
                  </div>
                  <v-progress-linear
                    :model-value="memberStore.deductibleProgress"
                    color="primary"
                    rounded
                    height="8"
                    class="mt-2"
                  />
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card variant="tonal" color="secondary" class="pa-4" rounded="lg">
                  <div class="text-caption text-medium-emphasis">Out-of-Pocket Maximum</div>
                  <div class="text-h5 font-weight-bold mt-1">
                    ${{ coverage.outOfPocketMax.met.toLocaleString() }}
                    <span class="text-body-2 font-weight-regular text-medium-emphasis">
                      / ${{ coverage.outOfPocketMax.individual.toLocaleString() }}
                    </span>
                  </div>
                  <v-progress-linear
                    :model-value="memberStore.oopProgress"
                    color="secondary"
                    rounded
                    height="8"
                    class="mt-2"
                  />
                </v-card>
              </v-col>
            </v-row>

            <v-table density="comfortable" class="mt-4">
              <thead>
                <tr>
                  <th>Service</th>
                  <th class="text-right">Your Copay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Primary Care Visit</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.primaryCare }}</td>
                </tr>
                <tr>
                  <td>Specialist Visit</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.specialist }}</td>
                </tr>
                <tr>
                  <td>Urgent Care</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.urgentCare }}</td>
                </tr>
                <tr>
                  <td>Emergency Room</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.emergencyRoom }}</td>
                </tr>
                <tr>
                  <td>Generic Rx</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.genericRx }}</td>
                </tr>
                <tr>
                  <td>Preferred Brand Rx</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.preferredBrandRx }}</td>
                </tr>
                <tr>
                  <td>Non-Preferred Brand Rx</td>
                  <td class="text-right font-weight-medium">${{ coverage.copays.nonPreferredBrandRx }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #0A3D8F 100%);
  border-radius: 12px 12px 0 0;
}
</style>
