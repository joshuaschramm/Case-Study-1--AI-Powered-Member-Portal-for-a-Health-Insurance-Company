import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const healthPulseTheme = {
  dark: false,
  colors: {
    primary: '#1565C0',
    secondary: '#00897B',
    accent: '#FF6F00',
    error: '#D32F2F',
    info: '#1976D2',
    success: '#388E3C',
    warning: '#F57C00',
    background: '#F5F7FA',
    surface: '#FFFFFF',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'healthPulseTheme',
    themes: {
      healthPulseTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
