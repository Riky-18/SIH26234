/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: '#F7F9FC',
        surface: '#FFFFFF',
        brand: {
          DEFAULT: '#2E6F5E',
          light: '#EAF3EF',
          dark: '#24584a',
        },
        info: {
          DEFAULT: '#3B6BC7',
          light: '#EAF0FA',
        },
        warning: {
          DEFAULT: '#E8A93A',
          light: '#FDF3E3',
        },
        danger: {
          DEFAULT: '#E56C6C',
          light: '#FCEAEA',
        },
        success: {
          DEFAULT: '#4CAF7D',
          light: '#E8F6EE',
        },
        content: {
          primary: '#1F2937',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        divider: '#E5E9F0',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.07)',
        'soft-sm': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'card': '18px',
      }
    },
  },
  plugins: [],
};
