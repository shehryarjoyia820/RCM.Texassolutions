/** Tailwind config for the Texas Solutions RCM theme. Scans theme + plugin PHP and front-end TS. */
module.exports = {
  content: ['./wordpress/rcm-theme/**/*.php', './wordpress/rcm-core/**/*.php', './src/js/**/*.ts', './src/content/pages.ts'],
  safelist: ['is-open', 'rotate-180', 'line-through'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        navy: { 50: '#f1f5fb', 100: '#e1e9f5', 200: '#c3d2ea', 300: '#93acd5', 400: '#5d7fba', 500: '#3a5d9c', 600: '#294681', 700: '#1f3768', 800: '#162a52', 900: '#0f1f3f', 950: '#0a1530' },
        teal: { 50: '#effcfa', 100: '#c8f4ef', 200: '#93e8df', 300: '#57d3c9', 400: '#27b8af', 500: '#0e9c95', 600: '#097d79', 700: '#0b6462', 800: '#0e5050', 900: '#0f4243' },
        sky: { 50: '#f0f7ff', 100: '#dfeeff', 500: '#2f7fe0', 600: '#1f66c2' },
        ink: { DEFAULT: '#0f1f3f', muted: '#4a5873', subtle: '#647089' },
        line: '#e3e8f0',
        canvas: '#f7f9fc',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,31,63,.05), 0 8px 24px -12px rgba(15,31,63,.12)',
        lift: '0 2px 4px rgba(15,31,63,.06), 0 24px 48px -20px rgba(15,31,63,.25)',
      },
      borderRadius: { xl: '14px', '2xl': '20px', '3xl': '28px' },
      maxWidth: { prose: '70ch' },
    },
  },
  plugins: [],
};
