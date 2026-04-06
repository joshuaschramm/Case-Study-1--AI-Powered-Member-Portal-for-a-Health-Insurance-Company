# PLAN.md — HealthPulse: AI-Powered Member Portal

## Overview

HealthPulse is an AI-powered self-service portal for a fictional health insurance company called "Meridian Health Partners." Members can ask natural-language questions about their benefits, search for in-network providers, view claims history, and receive personalized wellness recommendations. The app is built with Vue 3, Vuetify 3, Material Design Icons, and Chart.js.

---

## Tech Stack

- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **UI Library:** Vuetify 3
- **Icons:** Material Design Icons (`@mdi/font`)
- **Charts:** Chart.js via `vue-chartjs`
- **Routing:** Vue Router 4
- **State Management:** Pinia
- **Build Tool:** Vite
- **Mock Data:** Local JSON files in `/src/data/`

---

## Project Setup Instructions

1. Scaffold a new Vue 3 project using Vite:
   ```bash
   npm create vite@latest healthpulse -- --template vue
   cd healthpulse

2. Install dependencies:
    bash
        Copy
    npm install vuetify@^3 @mdi/font vue-router@^4 pinia chart.js vue-chartjs
    Configure Vuetify in src/plugins/vuetify.js:
    Import Vuetify, its styles, and the MDI font CSS.
    Use a custom light theme with a primary color of #1565C0 (blue), secondary #00897B (teal), accent #FF6F00 (amber), and error #D32F2F (red).
    Configure Vue Router in src/router/index.js.
    Configure Pinia in src/stores/.
    Register all plugins in src/main.js.

    ### Application Layout
- File: src/App.vue
- Use <v-app> as the root wrapper.
- Include a persistent <v-navigation-drawer> on the left side with the following nav items (each with an MDI icon):
- Dashboard (mdi-view-dashboard)
- My Benefits (mdi-shield-check)
- Find a Provider (mdi-hospital-building)
- Claims History (mdi-file-document-outline)
- Wellness (mdi-heart-pulse)
- AI Assistant (mdi-robot-outline)
- Include a <v-app-bar> at the top with:
- The app name "HealthPulse" on the left.
- A <v-avatar> with the member's initials and name "Sarah Mitchell" on the right.
- A notification bell icon (mdi-bell-outline) with a badge count of 3.
- The main content area uses <v-main> with a <router-view>.

### Pages & Components
- Page 1: Dashboard
File: src/views/DashboardView.vue
    Welcome Banner:
    A <v-card> with a gradient background (primary to secondary) displaying: "Welcome back, Sarah!" and a subtitle: "Here's your health plan summary for 2026."
    
    Summary Cards Row:
    Use a <v-row> with four <v-col cols="12" md="3"> columns, each containing a <v-card>:
    Deductible Progress — Icon: mdi-cash-check. Show "$1,200 of $3,000 used". Include a <v-progress-linear> at 40%, color primary.
    Out-of-Pocket Max — Icon: mdi-shield-half-full. Show "$2,800 of $8,000 used". Include a <v-progress-linear> at 35%, color secondary.
    Active Claims — Icon: mdi-file-clock-outline. Show "3 claims in progress". Subtitle: "Last updated: April 3, 2026".
    Wellness Score — Icon: mdi-trophy-outline. Show "82 / 100". Subtitle: "Great progress!"
    
    Charts Row:
    Use a <v-row> with two <v-col cols="12" md="6"> columns:
    Monthly Spending (Bar Chart): Use vue-chartjs <Bar> component. X-axis: Jan–Jun 2026. Y-axis: dollar amounts. Data: [120, 340, 210, 560, 180, 290]. Use primary color for bars.
    Spending by Category (Doughnut Chart): Use vue-chartjs <Doughnut> component. Categories: "Primary Care" (30%), "Prescriptions" (25%), "Specialist" (20%), "Lab Work" (15%), "Other" (10%). Use a palette of: ['#1565C0', '#00897B', '#FF6F00', '#8E24AA', '#E0E0E0'].

    Recent Activity List:
    A <v-card> with title "Recent Activity".
    Use a <v-list> with 5 items from mock data, each showing: an icon, description (e.g., "Office Visit — Dr. Patel"), date, and amount. Use <v-list-item> with prepend-icon and a <v-chip> for status (Paid, Pending, In Review).

### Page 3: Find a Provider
    File: src/views/ProviderSearchView.vue

    Search Bar:
A <v-card> containing:
<v-text-field> with label "Search by name, specialty, or condition" and prepend-inner-icon mdi-magnify.
<v-select> for Specialty filter (options: All, Primary Care, Cardiology, Dermatology, Orthopedics, Pediatrics, Mental Health, OB/GYN).
<v-select> for Distance filter (options: 5 mi, 10 mi, 25 mi, 50 mi).
<v-btn> "Search" with icon mdi-magnify.
Results Grid:
Use <v-row> and <v-col cols="12" md="4"> to display provider cards.
Each provider card (<v-card>) shows:
Provider name (bold title)
Specialty as a <v-chip> with color secondary
Address with icon mdi-map-marker
Phone with icon mdi-phone
Rating: use <v-rating> component (readonly, half-increments)
"Accepting New Patients" badge: <v-chip> color success if true, color error if false
<v-btn> "View Profile" (outlined, color primary)
Populate with at least 9 mock providers from /src/data/providers.json.
Filter Logic:
Implement reactive filtering using computed properties. Filter the provider list by the search text (matching name or specialty) and by the selected specialty dropdown.   

### Page 4: Claims History
File: src/views/ClaimsView.vue

Page Title: "Claims History"

Summary Cards Row:
Three <v-card> components in a <v-row>:
Total Claims YTD: "$4,230.00" with icon mdi-currency-usd.

Pending Claims: "3" with icon mdi-clock-outline.

Approved Claims: "12" with icon mdi-check-circle-outline.

Filters Bar:
<v-text-field> for search with mdi-magnify.
<v-select> for Status filter (All, Approved, Pending, In Review, Denied).
<v-select> for Date Range (All Time, Last 30 Days, Last 90 Days, This Year).

Claims Data Table:
Use <v-data-table> with columns: Claim ID, Date of Service, Provider, Service Description, Billed Amount, Plan Paid, You Owe, Status.
Status column uses <v-chip> with colors: Approved = success, Pending = warning, In Review = info, Denied = error.
Populate with at least 15 rows of mock data from /src/data/claims.json.
Enable sorting on all columns.

Claim Detail Dialog:
Clicking a row opens a <v-dialog> showing the full claim details: Claim ID, dates, provider info, itemized charges, insurance adjustments, explanation of benefits summary, and a timeline of claim status updates using a <v-timeline>.

### Page 5: Wellness
File: src/views/WellnessView.vue

Wellness Score Hero:
A <v-card> with a large centered display of the wellness score "82 / 100" with a circular progress indicator. Use a <Doughnut> chart (vue-chartjs) configured to look like a gauge — filled portion (82%) in secondary color, remaining in light grey. Below it, text: "Keep it up, Sarah! You're in the top 15% of members."

Wellness Goals:
Use <v-row> with four <v-col cols="12" md="3"> cards:
Annual Physical — Status: Completed (mdi-check-circle, color success)
Flu Shot — Status: Completed (mdi-check-circle, color success)
Dental Cleaning — Status: Due Soon (mdi-alert-circle, color warning)
Eye Exam — Status: Overdue (mdi-close-circle, color error)

Activity Tracking Chart:
A <v-card> with a <Line> chart (vue-chartjs) showing weekly step averages over the last 12 weeks. X-axis: "Week 1" through "Week 12". Y-axis: steps. Data: [6200, 7100, 6800, 8400, 9200, 8800, 7600, 10200, 9800, 11000, 10500, 10800]. Color: secondary.

Recommended Programs:
A <v-card> titled "Recommended for You" containing a <v-list> of 4 wellness programs:
"Stress Management Workshop" — mdi-meditation — "Starts April 15"
"Nutrition Coaching" — mdi-food-apple — "Enroll anytime"
"Sleep Improvement Program" — mdi-weather-night — "8-week program"
"Fitness Challenge" — mdi-run — "Join 342 other members"
Each item has a <v-btn> "Enroll" (outlined, color primary).

### Page 6: AI Assistant
File: src/views/AssistantView.vue

Chat Interface Layout:
Full-height layout using d-flex flex-column with height: calc(100vh - 64px).
Chat History Area: A scrollable container (overflow-y: auto, flex-grow: 1) displaying messages.
Bot messages: left-aligned <v-card> with color="grey-lighten-4", prepend <v-avatar> with mdi-robot-outline.
User messages: right-aligned <v-card> with color="primary" and white text.
The first bot message (pre-loaded) should say: "Hi Sarah! 👋 I'm your HealthPulse AI assistant. I can help you understand your benefits, find providers, check claim statuses, and more. What can I help you with today?"

Suggested Questions:
Below the initial bot message, show 4 <v-chip> buttons (outlined, color primary) with suggested questions:
"What's my deductible status?"
"Is my prescription covered?"
"Find a dermatologist near me"
"Explain my last claim"

Input Area:
A <v-text-field> at the bottom with label "Ask me anything about your health plan..." and an append-inner-icon mdi-send that acts as the send button.

Mock Response Logic:
In the component's script, create a function getResponse(userMessage) that uses simple keyword matching to return canned responses:
If message contains "deductible" → respond with deductible details.
If message contains "prescription" or "drug" → respond with pharmacy benefit info.
If message contains "dermatologist" or "provider" → respond with a list of 2 mock providers.
If message contains "claim" → respond with the most recent claim summary.
Default → "I'm not sure I understand. Could you try rephrasing? You can ask me about your benefits, providers, claims, or wellness programs."
Add a 1-second delay (using setTimeout) before showing the bot response to simulate thinking, and show a typing indicator (<v-progress-linear indeterminate>) during the delay.

## Mock Data files
- File: /src/data.member.json

{
  "name": "Sarah Mitchell",
  "memberId": "MHP-2026-88421",
  "plan": "PPO Gold Plan 2026",
  "groupNumber": "GRP-40221",
  "effectiveDate": "2026-01-01",
  "pcp": "Dr. Anita Patel",
  "deductible": { "used": 1200, "total": 3000 },
  "outOfPocketMax": { "used": 2800, "total": 8000 },
  "wellnessScore": 82
}

- File: /src/data/providers.json
Array of at least 9 provider objects with fields: id, name, specialty, address, phone, rating (number 1-5), acceptingNewPatients (boolean), distance (string like "2.3 mi").

- File: /src/data/claims.json
Array of at least 15 claim objects with fields: claimId, dateOfService, provider, service, billedAmount, planPaid, youOwe, status (one of: "Approved", "Pending", "In Review", "Denied"), timeline (array of { date, status, description }).

- File: /src/data/wellness.json
Object containing: score, goals (array of goal objects), weeklySteps (array of 12 numbers), programs (array of program objects).

## Pinia Stores
File: /src/stores/memberStore.js
- State: member (loaded from member.json)
- Getters: deductiblePercentage, oopPercentage, memberInitials

File: /src/stores/claimsStore.js
- State: claims (loaded from claims.json), searchQuery, statusFilter, dateFilter
- Getters: filteredClaims, totalClaimsYTD, pendingCount, approvedCount

File: /src/stores/providerStore.js
- State: providers (loaded from providers.json), searchQuery, specialtyFilter, distanceFilter
- Getters: filteredProviders

File: /src/stores/chatStore.js
- State: messages (array of { role: 'bot' | 'user', text: string })
- Actions: sendMessage(text) — pushes user message, triggers mock response after delay

## Router Configuration
File: /src/router/index.js
Define the following routes:

Path	        Name	    Component
/	            Dashboard	DashboardView.vue
/benefits	    Benefits	BenefitsView.vue
/providers	    Providers	ProviderSearchView.vue
/claims	        Claims	    ClaimsView.vue
/wellness	    Wellness	WellnessView.vue
/assistant	    Assistant	AssistantView.vue

## Vuetify Theme Configuration
File: /src/plugins/vuetify.js

const customTheme = {
  dark: false,
  colors: {
    primary: '#1565C0',
    secondary: '#00897B',
    accent: '#FF6F00',
    error: '#D32F2F',
    warning: '#F9A825',
    info: '#1976D2',
    success: '#2E7D32',
    background: '#F5F5F5',
    surface: '#FFFFFF',
  },
}
