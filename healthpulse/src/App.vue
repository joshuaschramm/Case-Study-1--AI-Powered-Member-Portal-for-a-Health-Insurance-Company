<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { routes } from './router'
import { useMemberStore } from './stores/member'

const drawer = ref(true)
const rail = ref(false)
const router = useRouter()
const route = useRoute()
const { mdAndUp, smAndDown } = useDisplay()
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
    <v-app-bar class="app-bar-gradient" prominent theme="dark">
      <v-app-bar-nav-icon v-if="mdAndUp" @click="drawer = !drawer" />
      <v-icon class="ml-2" style="margin-right: 8px;" size="32">mdi-hospital-box</v-icon>
      <v-app-bar-title style="margin-left: 0; flex: none;">
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

    <!-- Navigation Drawer (desktop/tablet only) -->
    <v-navigation-drawer
      v-if="mdAndUp"
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
      <v-container fluid class="pa-6" :class="{ 'pb-mobile': smAndDown }">
        <router-view />
      </v-container>
    </v-main>

    <!-- Bottom Navigation (mobile only) -->
    <v-bottom-navigation
      v-if="smAndDown"
      grow
      color="primary"
      class="bottom-nav"
    >
      <v-btn
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :active="route.path === item.to"
        size="small"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="text-caption">{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style>
html {
  overflow-y: auto !important;
}
.app-bar-gradient {
  background: linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #0A3D8F 100%) !important;
}
.pb-mobile {
  padding-bottom: 80px !important;
}
.bottom-nav {
  position: fixed !important;
  bottom: 0;
  z-index: 1000;
}
.bottom-nav .v-btn {
  min-width: 0 !important;
}
.bottom-nav .text-caption {
  font-size: 0.625rem !important;
  line-height: 1.2;
  margin-top: 2px;
}
</style>
