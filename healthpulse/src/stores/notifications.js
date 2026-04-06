import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import notificationsData from '../data/notifications.json'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref(notificationsData)

  const unreadCount = computed(() =>
    notifications.value.filter((n) => !n.read).length
  )

  const sortedNotifications = computed(() =>
    [...notifications.value].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  )

  function markAsRead(id) {
    const notification = notifications.value.find((n) => n.id === id)
    if (notification) notification.read = true
  }

  function markAllAsRead() {
    notifications.value.forEach((n) => (n.read = true))
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    const now = new Date('2026-03-19T12:00:00')
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return {
    notifications,
    unreadCount,
    sortedNotifications,
    markAsRead,
    markAllAsRead,
    formatDate,
  }
})
