<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routes } from './router'
import { useMemberStore } from './stores/member'

const drawer = ref(true)
const rail = ref(false)
const router = useRouter()
const route = useRoute()
const memberStore = useMemberStore()

const navItems = routes.map((r) => ({
  title: r.meta.title,
  icon: r.meta.icon,
  to: r.path,
}))
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" prominent dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-icon class="ml-2 mr-3" size="32">mdi-hospital-box</v-icon>
      <v-app-bar-title>
        <span class="font-weight-bold">Health</span><span class="font-weight-light">Pulse</span>
      </v-app-bar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
        <v-badge color="error" content="3" floating />
      </v-btn>

      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="ml-2">
            <v-avatar color="secondary" size="36">
              <span class="text-white text-body-2 font-weight-bold">
                {{ memberStore.member.firstName[0] }}{{ memberStore.member.lastName[0] }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list density="compact" width="250">
          <v-list-item>
            <v-list-item-title class="font-weight-bold">{{ memberStore.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ memberStore.member.memberId }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-account-outline" title="My Profile" />
          <v-list-item prepend-icon="mdi-cog-outline" title="Settings" />
          <v-divider />
          <v-list-item prepend-icon="mdi-logout" title="Sign Out" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      color="white"
    >
      <v-list-item
        :title="rail ? '' : 'Meridian Health Partners'"
        :subtitle="rail ? '' : memberStore.member.planName"
        class="py-4"
      >
        <template #prepend>
          <v-avatar color="primary" size="40" class="mr-2">
            <v-icon color="white">mdi-hospital-box</v-icon>
          </v-avatar>
        </template>
        <template #append>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="rail = !rail"
          >
            <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </template>
      </v-list-item>

      <v-divider />

      <v-list nav density="comfortable">
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :title="item.title"
          :prepend-icon="item.icon"
          :active="route.path === item.to"
          active-class="v-list-item--active text-primary"
          rounded="lg"
          color="primary"
          class="mb-1"
        />
      </v-list>

      <template #append>
        <v-divider />
        <v-list-item
          v-if="!rail"
          class="pa-4"
        >
          <v-card variant="tonal" color="primary" class="pa-3 text-center">
            <v-icon size="24" class="mb-1">mdi-headphones</v-icon>
            <div class="text-body-2 font-weight-medium">Need Help?</div>
            <div class="text-caption">Call (800) 555-HLTH</div>
          </v-card>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
html {
  overflow-y: auto !important;
}
</style>
