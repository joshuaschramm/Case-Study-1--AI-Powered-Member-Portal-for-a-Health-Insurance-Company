

```markdown
# 💙 HealthPulse — AI-Powered Member Portal for Health Insurance

HealthPulse is an AI-powered self-service portal built for **Meridian Health Partners**, a fictional large health insurance company. The platform empowers members to explore their benefits, search for in-network providers, track claims, monitor wellness goals, and interact with an AI assistant that answers natural-language questions about their health plan — all from a single, intuitive dashboard.

This project was built as a case study for the **Slalom Protogen Academy**, demonstrating accelerated product development using modern frontend technologies and AI-driven customer experience concepts.

---

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Pages & Functionality](#pages--functionality)
- [Data & State Management](#data--state-management)
- [Charts & Visualizations](#charts--visualizations)
- [Theming & Design](#theming--design)
- [Browser Support](#browser-support)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Member Dashboard** — Personalized welcome screen with deductible progress, out-of-pocket max tracking, active claims count, wellness score, monthly spending charts, spending by category breakdowns, and a recent activity feed
- **Benefits Explorer** — Comprehensive plan summary, detailed benefits table covering 10+ service types with in-network and out-of-network coverage, and expandable coverage tier panels for Medical, Pharmacy, and Vision & Dental
- **Provider Search** — Search and filter in-network providers by name, specialty, or condition with distance filtering, star ratings, new-patient availability badges, and detailed provider cards
- **Claims History** — Full claims management with summary KPIs, searchable and filterable data table with 15+ claims, color-coded status chips, and a detailed claim dialog with itemized charges and a status timeline
- **Wellness Center** — Wellness score gauge, preventive care goal tracking with completion statuses, 12-week step activity line chart, and personalized wellness program recommendations with enrollment actions
- **AI Assistant** — Conversational chat interface with suggested question chips, keyword-based mock response logic, typing indicators, and a natural-language interaction experience for benefits questions
- **Responsive Design** — Fully responsive layout optimized for desktop (1200px+) and tablet (768px+)

---

## 📸 Screenshots

> _Screenshots can be added here after the application is built. Recommended screenshots:_
> - Dashboard with deductible progress cards and spending charts
> - Benefits table with coverage details
> - Provider search results grid
> - Claims history data table with status chips
> - Wellness score gauge and step activity chart
> - AI Assistant chat interface with suggested questions

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.x | Frontend framework (Composition API with `<script setup>`) |
| [Vuetify 3](https://vuetifyjs.com/) | ^3.x | Material Design UI component library |
| [Vue Router](https://router.vuejs.org/) | ^4.x | Client-side routing |
| [Pinia](https://pinia.vuejs.org/) | ^2.x | State management |
| [Chart.js](https://www.chartjs.org/) | ^4.x | Charting and data visualization |
| [vue-chartjs](https://vue-chartjs.org/) | ^5.x | Vue 3 wrapper for Chart.js |
| [Material Design Icons](https://materialdesignicons.com/) | `@mdi/font` | Icon set |
| [Vite](https://vitejs.dev/) | ^5.x | Build tool and dev server |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** — v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** — v9.0.0 or higher (included with Node.js)

You can verify your installations by running:

```bash
node --version
npm --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/healthpulse.git
cd healthpulse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173** (default Vite port).

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### 5. Preview the Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
healthpulse/
├── public/                              # Static assets
├── src/
│   ├── App.vue                          # Root component (layout, nav drawer, app bar)
│   ├── main.js                          # Entry point (Vuetify, Chart.js, Pinia, Router)
│   ├── plugins/
│   │   └── vuetify.js                   # Vuetify configuration and custom theme
│   ├── router/
│   │   └── index.js                     # Vue Router route definitions (6 routes)
│   ├── stores/
│   │   ├── memberStore.js               # Member profile, deductible, and OOP data
│   │   ├── claimsStore.js               # Claims data with filtering and aggregate stats
│   │   ├── providerStore.js             # Provider data with search and specialty filtering
│   │   └── chatStore.js                 # Chat messages and mock response logic
│   ├── views/
│   │   ├── DashboardView.vue            # Welcome banner, KPIs, charts, recent activity
│   │   ├── BenefitsView.vue             # Plan summary, benefits table, coverage panels
│   │   ├── ProviderSearchView.vue       # Search bar, filters, provider result cards
│   │   ├── ClaimsView.vue               # Summary cards, filters, data table, detail dialog
│   │   ├── WellnessView.vue             # Score gauge, goals, step chart, programs
│   │   └── AssistantView.vue            # Chat interface with mock AI responses
│   ├── data/
│   │   ├── member.json                  # Mock member profile and plan data
│   │   ├── providers.json               # 9+ in-network provider records
│   │   ├── claims.json                  # 15+ claim records with timelines
│   │   └── wellness.json                # Wellness score, goals, steps, and programs
│   └── components/
│       ├── charts/
│       │   ├── MonthlySpendingChart.vue      # Bar chart — monthly healthcare spending
│       │   ├── SpendingByCategoryChart.vue   # Doughnut chart — spending by service type
│       │   ├── WellnessGaugeChart.vue        # Doughnut chart styled as a score gauge
│       │   └── StepActivityChart.vue         # Line chart — 12-week step averages
│       └── chat/
│           ├── ChatMessage.vue               # Individual chat bubble (bot or user)
│           └── TypingIndicator.vue           # Animated typing dots indicator
├── index.html                           # HTML entry point
├── package.json                         # Project metadata and dependencies
├── vite.config.js                       # Vite build configuration
├── PLAN.md                              # Detailed build plan for Copilot Agent
└── README.md                            # This file
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Build the application for production (output to `dist/`) |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run ESLint to check for code quality issues (if configured) |

---

## 📄 Pages & Functionality

### 🏠 Dashboard (`/`)

The personalized landing page for the member. Provides an at-a-glance view of the member's health plan status and recent activity.

- **Welcome Banner** — A gradient card greeting the member by name with a plan summary subtitle
- **Summary KPI Cards** — Four metric cards displayed in a responsive row:
  - *Deductible Progress* — Dollar amount used vs. total with a progress bar (e.g., "$1,200 of $3,000")
  - *Out-of-Pocket Maximum* — Dollar amount used vs. total with a progress bar
  - *Active Claims* — Count of claims currently in progress with last-updated date
  - *Wellness Score* — Numeric score out of 100 with an encouraging subtitle
- **Monthly Spending Bar Chart** — A 6-month bar chart (Jan–Jun 2026) showing healthcare spending by month
- **Spending by Category Doughnut Chart** — Breakdown of spending across Primary Care, Prescriptions, Specialist, Lab Work, and Other
- **Recent Activity List** — The 5 most recent plan activities (office visits, prescriptions, lab work) with status chips (Paid, Pending, In Review)

### 🛡️ My Benefits (`/benefits`)

A comprehensive view of the member's health plan coverage.

- **Plan Summary Card** — Displays plan name (PPO Gold Plan 2026), Member ID, Group Number, effective date, and primary care physician
- **Benefits Table** — A detailed table with 10+ rows covering: Preventive Care, Primary Care Visit, Specialist Visit, Urgent Care, Emergency Room, Generic Prescriptions, Brand Prescriptions, Lab Work, Imaging/X-Ray, and Mental Health. Columns include Service, In-Network Coverage, Out-of-Network Coverage, Your Cost, and Notes
- **Coverage Tier Expansion Panels** — Three expandable panels (Medical, Pharmacy, Vision & Dental) providing narrative summaries of coverage details for each tier

### 🏥 Find a Provider (`/providers`)

A searchable directory of in-network healthcare providers.

- **Search Bar** — Text input for searching by name, specialty, or condition
- **Filters** — Specialty dropdown (All, Primary Care, Cardiology, Dermatology, Orthopedics, Pediatrics, Mental Health, OB/GYN) and Distance dropdown (5 mi, 10 mi, 25 mi, 50 mi)
- **Provider Result Cards** — A responsive grid of 9+ provider cards, each showing:
  - Provider name and specialty chip
  - Address and phone number with icons
  - Star rating (readonly, half-increments)
  - "Accepting New Patients" badge (green if yes, red if no)
  - "View Profile" action button
- **Reactive Filtering** — Results update in real-time as the member types in the search field or changes filter dropdowns

### 📋 Claims History (`/claims`)

Full claims tracking and management.

- **Summary Cards** — Three KPI cards: Total Claims YTD (dollar amount), Pending Claims (count), Approved Claims (count)
- **Filters** — Text search, Status filter (All, Approved, Pending, In Review, Denied), and Date Range filter (All Time, Last 30 Days, Last 90 Days, This Year)
- **Claims Data Table** — A sortable table with 15+ rows and columns: Claim ID, Date of Service, Provider, Service Description, Billed Amount, Plan Paid, You Owe, and Status. Status uses color-coded chips (Approved = green, Pending = yellow, In Review = blue, Denied = red)
- **Claim Detail Dialog** — Clicking any row opens a modal showing: full claim details, itemized charges, insurance adjustments, explanation of benefits summary, and a visual timeline of claim status updates (e.g., Submitted → Under Review → Approved → Payment Sent)

### ❤️ Wellness (`/wellness`)

Health and wellness tracking with goal management and program recommendations.

- **Wellness Score Gauge** — A doughnut chart styled as a circular gauge showing the member's score (82/100) with the filled portion in teal and a motivational message ("Keep it up, Sarah! You're in the top 15% of members.")
- **Wellness Goals** — Four goal cards tracking preventive care milestones:
  - *Annual Physical* — Completed (green check)
  - *Flu Shot* — Completed (green check)
  - *Dental Cleaning* — Due Soon (yellow alert)
  - *Eye Exam* — Overdue (red alert)
- **Step Activity Chart** — A 12-week line chart showing weekly average step counts, demonstrating an upward fitness trend
- **Recommended Programs** — Four personalized wellness program suggestions (Stress Management Workshop, Nutrition Coaching, Sleep Improvement Program, Fitness Challenge) with descriptions and "Enroll" action buttons

### 🤖 AI Assistant (`/assistant`)

A conversational chat interface for natural-language health plan questions.

- **Chat Interface** — Full-height layout with a scrollable message history area. Bot messages appear left-aligned with a robot avatar; user messages appear right-aligned with the primary color background
- **Welcome Message** — A pre-loaded greeting from the AI assistant introducing its capabilities
- **Suggested Questions** — Four clickable chip buttons below the welcome message: "What's my deductible status?", "Is my prescription covered?", "Find a dermatologist near me", "Explain my last claim"
- **Mock Response Logic** — Keyword-based matching that returns contextual responses:
  - "deductible" → Deductible balance and progress details
  - "prescription" / "drug" → Pharmacy benefit information
  - "dermatologist" / "provider" → Two mock provider suggestions
  - "claim" → Most recent claim summary
  - Default → A friendly fallback suggesting how to rephrase
- **Typing Indicator** — A 1-second simulated delay with an animated progress bar before each bot response to mimic real AI processing

---

## 🗃️ Data & State Management

### Mock Data

All data is served from local JSON files in `/src/data/`. No external APIs, databases, or backend services are required. The application is entirely self-contained.

| File | Records | Description |
|---|---|---|
| `member.json` | 1 | Member profile: Sarah Mitchell, PPO Gold Plan 2026, deductible and OOP tracking, wellness score |
| `providers.json` | 9+ | In-network providers with name, specialty, address, phone, rating, distance, and new-patient status |
| `claims.json` | 15+ | Claim records with IDs, dates, providers, services, amounts, statuses, and status change timelines |
| `wellness.json` | 1 | Wellness score, 4 preventive care goals, 12 weeks of step data, and 4 recommended programs |

### Pinia Stores

State management is handled by 4 Pinia stores:

| Store | Responsibility |
|---|---|
| `memberStore` | Member profile data, deductible/OOP calculations, and computed percentages and initials |
| `claimsStore` | Claims data with search query, status filter, date range filter, filtered claims getter, and aggregate stats (total YTD, pending count, approved count) |
| `providerStore` | Provider data with search query, specialty filter, distance filter, and filtered providers getter |
| `chatStore` | Chat message history (array of bot/user messages) and `sendMessage` action that triggers keyword-matched mock responses after a simulated delay |

---

## 📊 Charts & Visualizations

All charts are built with [Chart.js](https://www.chartjs.org/) via the [vue-chartjs](https://vue-chartjs.org/) wrapper. The following Chart.js components are registered globally in `main.js`:

- `CategoryScale`
- `LinearScale`
- `BarElement`
- `ArcElement`
- `PointElement`
- `LineElement`
- `Title`
- `Tooltip`
- `Legend`

### Charts Used

| Chart | Type | Location | Description |
|---|---|---|---|
| Monthly Spending | Bar | Dashboard | 6-month healthcare spending (Jan–Jun 2026) in primary blue |
| Spending by Category | Doughnut | Dashboard | 5-category breakdown (Primary Care, Prescriptions, Specialist, Lab Work, Other) |
| Wellness Score Gauge | Doughnut | Wellness | Circular gauge showing 82/100 score with teal fill and grey remainder |
| Step Activity | Line | Wellness | 12-week weekly step averages showing fitness trend in teal |

### Chart Color Palette

| Dataset | Color |
|---|---|
| Primary bars/lines | `#1565C0` (primary blue) |
| Secondary lines/fills | `#00897B` (teal) |
| Category 1 — Primary Care | `#1565C0` |
| Category 2 — Prescriptions | `#00897B` |
| Category 3 — Specialist | `#FF6F00` |
| Category 4 — Lab Work | `#8E24AA` |
| Category 5 — Other | `#E0E0E0` |

---

## 🎨 Theming & Design

### Vuetify Theme Configuration

The app uses a custom light theme configured in `/src/plugins/vuetify.js`:

| Color | Hex | Usage |
|---|---|---|
| Primary | `#1565C0` | Buttons, links, navigation highlights, primary charts (blue) |
| Secondary | `#00897B` | Wellness elements, secondary charts, teal accents |
| Accent | `#FF6F00` | Attention-grabbing elements, amber highlights |
| Error | `#D32F2F` | Error states, denied claims, overdue goals |
| Warning | `#F9A825` | Warning states, pending claims, due-soon goals |
| Info | `#1976D2` | Informational elements, in-review claims |
| Success | `#2E7D32` | Success states, approved claims, completed goals |
| Background | `#F5F5F5` | Page background (light grey) |
| Surface | `#FFFFFF` | Card backgrounds (white) |

### Design Principles

- **Clean & Professional** — A healthcare-appropriate design with a calming blue and teal palette that conveys trust and reliability
- **Information Density** — Dashboard and claims views pack meaningful data into organized layouts without overwhelming the user
- **Status Communication** — Consistent use of color-coded chips and icons across all pages to communicate claim statuses, goal progress, and provider availability at a glance
- **Accessible Navigation** — A persistent left-side navigation drawer with clear icons and labels for all six sections
- **Material Design** — All components follow Material Design 3 guidelines via Vuetify 3
- **Consistent Iconography** — All icons use the Material Design Icons (`@mdi/font`) library exclusively

### Key UI Components

| Component | Vuetify Element | Usage |
|---|---|---|
| Navigation | `<v-navigation-drawer>` | Persistent left sidebar with 6 nav items |
| App Bar | `<v-app-bar>` | Top bar with app name, notifications, and user avatar |
| KPI Cards | `<v-card>` + `<v-progress-linear>` | Deductible, OOP, claims, and wellness metrics |
| Data Tables | `<v-data-table>` | Claims history and benefits coverage |
| Provider Cards | `<v-card>` + `<v-rating>` | Provider search results with star ratings |
| Status Chips | `<v-chip>` | Color-coded claim statuses and goal states |
| Expansion Panels | `<v-expansion-panels>` | Coverage tier details |
| Chat Bubbles | `<v-card>` | Bot and user message styling |
| Dialogs | `<v-dialog>` | Claim detail view with timeline |
| Timelines | `<v-timeline>` | Claim status change history |

---

## 🌐 Browser Support

| Browser | Supported | Notes |
|---|---|---|
| Chrome | ✅ Latest 2 versions | Full support |
| Firefox | ✅ Latest 2 versions | Full support |
| Safari | ✅ Latest 2 versions | Full support |
| Edge | ✅ Latest 2 versions | Full support |
| Internet Explorer | ❌ Not supported | No ES module or modern CSS support |

---

## ⚠️ Known Limitations

| Limitation | Details |
|---|---|
| **No backend / API** | All data is static mock data from JSON files. No CRUD operations persist between sessions. |
| **No authentication** | The app assumes a logged-in member (Sarah Mitchell). There is no login flow or session management. |
| **AI Assistant is keyword-based** | The chat assistant uses simple keyword matching, not a real AI/NLP model. Responses are canned and limited to a few topics. |
| **No real claims processing** | Claims cannot be submitted, appealed, or modified. The data is read-only. |
| **No real provider booking** | The "View Profile" button on provider cards is non-functional. In a production app, this would link to a scheduling system. |
| **No map integration** | The provider search does not include an interactive map. Distance values are mock data. |
| **Wellness data is static** | Step counts and wellness scores do not update. In a production app, these would integrate with wearable device APIs. |
| **Mobile optimization** | The app is optimized for desktop (1200px+) and tablet (768px+). Mobile phone layouts (< 768px) may require additional responsive work. |

---

## 🤝 Contributing

This project was built as a Protogen Academy case study. If you'd like to extend or improve it:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

### Code Style Guidelines

- Use Vue 3 Composition API with `<script setup>` syntax exclusively
- Use Vuetify 3 components for all UI elements
- Use MDI icons exclusively (`@mdi/font`)
- Follow the existing file and folder structure
- Keep components focused and reusable
- Use Pinia stores for all shared state

### Potential Enhancements

- [ ] Integrate a real conversational AI backend (e.g., OpenAI API, Azure Bot Service) for the AI Assistant
- [ ] Add an interactive map to the provider search using Mapbox or Google Maps
- [ ] Implement member authentication with JWT tokens and role-based access
- [ ] Add claims submission and appeal workflows
- [ ] Integrate with wearable device APIs (Apple Health, Fitbit) for real wellness data
- [ ] Add provider appointment scheduling
- [ ] Build a mobile-first responsive layout for phone screens
- [ ] Add PDF export for Explanation of Benefits (EOB) documents
- [ ] Implement push notifications for claim status updates
- [ ] Add multilingual support (i18n) for diverse member populations
- [ ] Add end-to-end tests with Cypress or Playwright
- [ ] Add unit tests with Vitest for Pinia stores and chat response logic

---

## 📄 License

This project is for educational and demonstration purposes as part of the Slalom Protogen Academy. It is not intended for commercial use.

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Slalom](https://www.slalom.com/) — Protogen Academy program and accelerated product development methodology
- [Vuetify](https://vuetifyjs.com/) — Material Design component framework for Vue
- [Chart.js](https://www.chartjs.org/) — Flexible and lightweight charting library
- [vue-chartjs](https://vue-chartjs.org/) — Vue 3 integration for Chart.js
- [Material Design Icons](https://materialdesignicons.com/) — Comprehensive icon library
```