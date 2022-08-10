import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      maxWidth: {
        'screen-xs': '390px',
      },
      colors: {
        primary: {
          DEFAULT: '#e1c8aa',
          light: '#e8d4bd',
        },
        secondary: {
          DEFAULT: '#424242',
        },
      },
    },
  }
})
