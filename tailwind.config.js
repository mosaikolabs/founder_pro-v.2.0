/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Background Colors
        'dark-primary': '#0F172A', // Deep navy slate-900
        'dark-secondary': '#1E293B', // Dark slate-800
        'dark-surface': '#334155', // Medium slate-700
        'dark-elevated': '#475569', // Light slate-600
        
        // Gradient Colors
        'gradient-start': '#0F172A', // Deep navy
        'gradient-mid': '#1E293B', // Dark slate
        'gradient-end': '#312E81', // Deep purple
        'gradient-accent': '#4C1D95', // Purple-800
        
        // Neon Accent Colors
        'neon-green': '#00FF94', // Bright neon green
        'neon-purple': '#7C3AED', // Electric purple
        'neon-blue': '#06B6D4', // Cyan
        'neon-pink': '#EC4899', // Pink
        
        // Text Colors for Dark Theme
        'text-dark-primary': '#F8FAFC', // Light slate-50
        'text-dark-secondary': '#CBD5E1', // Medium slate-300
        'text-dark-muted': '#94A3B8', // Slate-400
        
        // Status Colors (Dark Theme Compatible)
        'success-dark': '#22C55E', // Green-500
        'warning-dark': '#F59E0B', // Amber-500
        'error-dark': '#EF4444', // Red-500
        'info-dark': '#3B82F6', // Blue-500
        
        // Neumorphic Shadow Colors
        'shadow-light': 'rgba(255, 255, 255, 0.1)',
        'shadow-dark': 'rgba(0, 0, 0, 0.3)',
        
        // Keep existing light theme colors for compatibility
        'primary': '#1e3a8a',
        'primary-50': '#eff6ff',
        'primary-100': '#dbeafe',
        'primary-500': '#3b82f6',
        'primary-600': '#2563eb',
        'primary-700': '#1d4ed8',
        'primary-900': '#1e3a8a',
        
        'secondary': '#475569',
        'secondary-50': '#f8fafc',
        'secondary-100': '#f1f5f9',
        'secondary-200': '#e2e8f0',
        'secondary-300': '#cbd5e1',
        'secondary-400': '#94a3b8',
        'secondary-500': '#64748b',
        'secondary-700': '#334155',
        'secondary-800': '#1e293b',
        'secondary-900': '#0f172a',
        
        'accent': '#0ea5e9',
        'accent-50': '#f0f9ff',
        'accent-100': '#e0f2fe',
        'accent-200': '#bae6fd',
        'accent-300': '#7dd3fc',
        'accent-400': '#38bdf8',
        'accent-600': '#0284c7',
        'accent-700': '#0369a1',
        
        'background': '#f8fafc',
        'surface': '#ffffff',
        'text-primary': '#0f172a',
        'text-secondary': '#64748b',
        
        'success': '#059669',
        'success-50': '#ecfdf5',
        'success-100': '#d1fae5',
        'success-500': '#10b981',
        
        'warning': '#d97706',
        'warning-50': '#fffbeb',
        'warning-100': '#fef3c7',
        'warning-500': '#f59e0b',
        
        'error': '#dc2626',
        'error-50': '#fef2f2',
        'error-100': '#fee2e2',
        'error-500': '#ef4444',
        
        'border': '#e2e8f0',
        'border-light': '#f1f5f9',
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        // KPI/Big Numbers
        'kpi': ['2rem', { lineHeight: '2.5rem', fontWeight: '800' }],
        'kpi-lg': ['2.5rem', { lineHeight: '3rem', fontWeight: '800' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      width: {
        'sidebar': '240px',
        'drawer': '30%',
      },
      height: {
        'header': '64px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 15px rgba(0, 0, 0, 0.1)',
        // Neumorphic shadows
        'neumorphic': '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.1)',
        'neumorphic-inset': 'inset 8px 8px 16px rgba(0, 0, 0, 0.3), inset -8px -8px 16px rgba(255, 255, 255, 0.1)',
        'neumorphic-subtle': '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1)',
        'neumorphic-hover': '12px 12px 24px rgba(0, 0, 0, 0.4), -12px -12px 24px rgba(255, 255, 255, 0.15)',
        'glow-neon': '0 0 20px rgba(0, 255, 148, 0.5)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.5)',
      },
      borderRadius: {
        'neumorphic': '12px',
        'neumorphic-lg': '16px',
        'neumorphic-xl': '20px',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%)',
        'gradient-purple': 'linear-gradient(135deg, #1E293B 0%, #4C1D95 100%)',
        'gradient-card': 'linear-gradient(135deg, #334155 0%, #475569 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00FF94 0%, #7C3AED 100%)',
        'gradient-success': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        'gradient-warning': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'gradient-error': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      zIndex: {
        'sidebar': '100',
        'mobile-nav': '200',
        'drawer': '300',
        'modal': '400',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 148, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 255, 148, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}