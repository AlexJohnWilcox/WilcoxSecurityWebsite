export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        accent: '#22c55e',
        'highlight-bg': '#f0fdf4',
        'text-primary': '#1a1a1a',
        'text-body': '#475569',
        'text-muted': '#64748b',
        'text-faint': '#94a3b8',
        border: '#e8e4df',
        'border-button': '#cbd5e1',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
