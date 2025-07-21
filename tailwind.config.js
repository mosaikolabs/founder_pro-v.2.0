/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ===== NUEVA PALETA FOUNDER PRO CLEAN =====
        
        // Backgrounds principales
        'bg-primary': '#fafbff',        // Fondo principal suave
        'bg-surface': '#ffffff',        // Cards y superficies
        'bg-glass': 'rgba(255,255,255,0.85)', // Glassmorphism
        'bg-sidebar': 'rgba(255,255,255,0.95)', // Sidebar translúcido
        
        // Sistema de morados (color principal)
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',   // Morado principal
          600: '#7c3aed',   // Hover states
          700: '#6d28d9',   // Active states
          800: '#5b21b6',
          900: '#4c1d95',
        },
        
        // Acentos y gradientes
        accent: {
          pink: '#ec4899',
          blue: '#3b82f6',
          purple: '#8b5cf6'
        },
        
        // Textos (invertidos del tema oscuro)
        text: {
          primary: '#1e293b',     // Texto principal oscuro
          secondary: '#64748b',   // Texto secundario
          muted: '#94a3b8',       // Texto sutil
          light: '#ffffff'        // Texto sobre fondos oscuros
        },
        
        // Estados y funcionales
        success: '#10b981',
        warning: '#f59e0b', 
        error: '#ef4444',
        info: '#3b82f6',
        
        // Grises modernos
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      
      backgroundImage: {
        // Gradientes principales
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        
        // Fondos especiales
        'gradient-card': 'linear-gradient(145deg, #ffffff, #f8fafc)',
        'gradient-glass': 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))',
        'gradient-sidebar': 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
      },
      
      boxShadow: {
        // Sombras glassmorphism
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
        
        // Sombras suaves modernas
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        
        // Cards y elementos
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      
      backdropBlur: {
        'glass': '20px',
      },
      
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      }
    }
  },
  plugins: []
};