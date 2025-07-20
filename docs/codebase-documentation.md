# Founder Pro - Codebase Documentation
**Versión:** 1.0  
**Fecha:** 20 de julio de 2025  
**Framework:** React + Tailwind CSS  
**Propósito:** Dashboard integral para fundadores de startups  

Este archivo `.claude.md` debe ubicarse en la **raíz del proyecto** para proporcionar contexto completo del codebase a Claude.

---

## 📋 **DESCRIPCIÓN GENERAL DEL PROYECTO**

**Founder Pro** es un dashboard React avanzado diseñado específicamente para fundadores de startups. Proporciona herramientas de gestión estratégica, seguimiento de progreso y optimización de procesos empresariales a través de 11 módulos de actividades core (AC-001 a AC-011).

### **Características Principales:**
- **Dashboard Intuitivo:** Visualización clara del progreso empresarial
- **11 Módulos AC:** Cobertura completa de áreas estratégicas
- **Diseño Neumórfico:** Interfaz moderna con efectos 3D sutiles
- **Mobile-First:** Totalmente responsive y optimizado para móviles
- **Accesibilidad Completa:** WCAG 2.1 AA compliance
- **Reutilización Inteligente:** Adaptación de componentes Compliance existentes

---

## 🏗️ **ARQUITECTURA Y PATRONES**

### **Arquitectura General:**
```
Founder Pro (React SPA)
├── Core Dashboard (founder-activity-dashboard)
├── 11 Módulos AC (AC-001 a AC-011)
├── Componentes UI Reutilizables
├── Adaptadores Compliance → Founder Pro
└── Sistema de Routing y Navegación
```

### **Patrones de Diseño Utilizados:**

#### **1. Component Composition Pattern**
```javascript
// Patrón principal: Composición de componentes reutilizables
const ACModule = () => (
  <FounderLayout>
    <ProgressHeader />
    <KPIWidgets />
    <TabNavigation />
    <ModuleContent />
    <DetailModal />
  </FounderLayout>
);
```

#### **2. Adapter Pattern**
```javascript
// Adaptación de componentes Compliance existentes
const FounderMatrix = createFounderAdapter(
  ComplianceMatrix, 
  ADAPTATION_CONFIG
);
```

#### **3. Hook-based State Management**
```javascript
// Custom hooks para lógica reutilizable
const useFounderData = (founderId) => {
  // Lógica de datos centralizada
  return { data, loading, error, refresh };
};
```

#### **4. Template-based Generation**
```javascript
// Generación automática usando templates predefinidos
const generateACModule = (moduleConfig) => {
  return applyTemplate('ACModuleTemplate', moduleConfig);
};
```

---

## 📁 **ESTRUCTURA DE CARPETAS**

```
founder-pro/
├── public/                          # Assets públicos
├── src/
│   ├── components/                  # Componentes UI globales
│   │   ├── ui/                     # Componentes básicos reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ...
│   │   ├── AppIcon.jsx             # Sistema de iconos
│   │   ├── ErrorBoundary.jsx       # Manejo de errores
│   │   └── ProtectedRoute.jsx      # Autenticación
│   │
│   ├── pages/                       # Páginas principales
│   │   ├── founder-activity-dashboard/  # Dashboard principal
│   │   │   ├── FounderActivityDashboard.jsx
│   │   │   ├── components/         # Componentes del dashboard
│   │   │   │   ├── ProgressHeader.jsx
│   │   │   │   ├── KPIWidgets.jsx
│   │   │   │   ├── TabNavigation.jsx
│   │   │   │   ├── ActivityMatrix.jsx
│   │   │   │   ├── ActivityTimeline.jsx
│   │   │   │   └── ActivityDetailModal.jsx
│   │   │   ├── hooks/              # Custom hooks
│   │   │   │   ├── useFounderData.js
│   │   │   │   └── useActivityData.js
│   │   │   └── utils/              # Utilidades
│   │   │       └── dataMapper.js
│   │   │
│   │   ├── [ac-module-001]/        # Módulo AC individual
│   │   │   ├── StrategicFundamentalsModule.jsx
│   │   │   ├── components/
│   │   │   │   ├── StrategicMatrix.jsx
│   │   │   │   ├── StrategicTimeline.jsx
│   │   │   │   └── StrategicTracker.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useStrategicData.js
│   │   │   └── utils/
│   │   │       └── strategicDataMapper.js
│   │   │
│   │   └── [otros-modulos-ac]/     # AC-002 a AC-011
│   │
│   ├── hooks/                       # Hooks globales
│   │   ├── useAuth.js              # Autenticación
│   │   ├── useLocalStorage.js      # Persistencia local
│   │   └── useTheme.js             # Gestión de tema
│   │
│   ├── utils/                       # Utilidades globales
│   │   ├── cn.js                   # Utility para clases CSS
│   │   ├── api.js                  # Cliente API
│   │   ├── constants.js            # Constantes del proyecto
│   │   └── validators.js           # Validaciones
│   │
│   ├── styles/                      # Estilos globales
│   │   ├── globals.css             # Estilos base + Tailwind
│   │   └── neumorphic.css          # Estilos neumórficos custom
│   │
│   ├── navigation/                  # Sistema de navegación
│   │   ├── founderRoutes.js        # Rutas del dashboard
│   │   └── navigationConfig.js     # Configuración de navegación
│   │
│   ├── App.jsx                     # Componente raíz
│   ├── index.js                    # Entry point
│   └── setupTests.js               # Configuración de testing
│
├── docs/                           # Documentación
│   ├── ai-context/                 # Documentos de contexto para IA
│   ├── components/                 # Documentación de componentes
│   └── setup/                      # Guías de configuración
│
├── __tests__/                      # Tests
│   ├── components/                 # Tests de componentes
│   ├── pages/                      # Tests de páginas
│   └── utils/                      # Tests de utilidades
│
├── .claude.md                      # Este archivo
├── package.json                    # Dependencias y scripts
├── tailwind.config.js              # Configuración Tailwind
├── vite.config.js                  # Configuración del bundler
└── README.md                       # Documentación principal
```

---

## 🔧 **DEPENDENCIAS PRINCIPALES**

### **Dependencies de Producción:**
```json
{
  "react": "^18.2.0",                    // Framework principal
  "react-dom": "^18.2.0",               // DOM rendering
  "react-router-dom": "^6.8.0",         // Routing SPA
  "prop-types": "^15.8.1",              // Validación de props
  "clsx": "^1.2.1",                     // Utility para classes condicionales
  "framer-motion": "^8.5.2",            // Animaciones
  "react-helmet": "^6.1.0",             // Meta tags dinámicos
  "recharts": "^2.5.0",                 // Gráficos y visualizaciones
  "lucide-react": "^0.263.1"            // Iconos
}
```

### **DevDependencies:**
```json
{
  "@vitejs/plugin-react": "^3.1.0",     // Vite React plugin
  "tailwindcss": "^3.2.4",              // CSS framework
  "autoprefixer": "^10.4.13",           // CSS autoprefixer
  "postcss": "^8.4.21",                 // CSS processor
  "eslint": "^8.32.0",                  // Linting
  "prettier": "^2.8.3",                 // Code formatting
  "@testing-library/react": "^13.4.0",  // Testing utilities
  "vitest": "^0.28.2"                   // Test runner
}
```

---

## 🎨 **SISTEMA DE DISEÑO Y ESTILOS**

### **Tailwind CSS Configuration:**
```javascript
// tailwind.config.js - Configuración personalizada
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Founder Pro
        'neon-green': '#00ff88',
        'neon-purple': '#8b5cf6',
        'dark-primary': '#0f172a',
        'dark-secondary': '#1e293b',
        'text-dark-primary': '#f8fafc',
        'text-dark-secondary': '#cbd5e1'
      },
      borderRadius: {
        'neumorphic': '20px',
        'neumorphic-lg': '24px'
      },
      boxShadow: {
        'neumorphic': '8px 8px 16px #0a0f1a, -8px -8px 16px #141f3a',
        'neumorphic-hover': '12px 12px 24px #0a0f1a, -12px -12px 24px #141f3a',
        'glow-neon': '0 0 20px rgba(0, 255, 136, 0.5)'
      }
    }
  },
  plugins: []
};
```

### **Clases CSS Principales:**
```css
/* Componentes neumórficos */
.bg-gradient-dark { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
.bg-gradient-card { background: linear-gradient(145deg, #1e293b, #334155); }
.rounded-neumorphic { border-radius: 20px; }
.shadow-neumorphic { box-shadow: 8px 8px 16px #0a0f1a, -8px -8px 16px #141f3a; }

/* Estados interactivos */
.hover:shadow-glow-neon:hover { box-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
.hover:scale-105:hover { transform: scale(1.05); }
.transition-all { transition: all 0.3s ease; }
```

---

## 🔄 **PATRONES DE COMPONENTES ESTÁNDAR**

### **1. Estructura de Componente AC Module:**
```javascript
// Template estándar para módulos AC
const ACModule = () => {
  // Estados estándar
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Datos del módulo
  const { data, loading, error, refresh } = useModuleData();
  
  // Handlers estándar
  const handleItemClick = (item) => { /* ... */ };
  const handleExport = () => { /* ... */ };
  
  // Render con layout estándar
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProgressHeader />
        <KPIWidgets />
        <TabNavigation />
        <TabContent />
        <DetailModal />
      </div>
    </div>
  );
};
```

### **2. Custom Hook Pattern:**
```javascript
// Patrón estándar para hooks de datos
const useModuleData = (moduleId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    // Lógica de fetching
  }, [moduleId]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refresh: fetchData };
};
```

### **3. Adapter Pattern para Compliance:**
```javascript
// Patrón para adaptar componentes existentes
const FounderAdapter = createFounderAdapter(ComplianceComponent, {
  propMapping: { /* mapeo de props */ },
  dataMapping: { /* transformación de datos */ },
  eventMapping: { /* adaptación de eventos */ }
});
```

---

## 🚀 **SETUP Y DESARROLLO**

### **Instalación:**
```bash
# Clonar repositorio
git clone [repository-url]
cd founder-pro

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con configuraciones específicas

# Iniciar desarrollo
npm run dev
```

### **Scripts Disponibles:**
```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build de producción
  "preview": "vite preview",        // Preview del build
  "test": "vitest",                 // Ejecutar tests
  "test:ui": "vitest --ui",         // Tests con interfaz
  "lint": "eslint src/",            // Linting
  "lint:fix": "eslint src/ --fix",  // Fix automático
  "format": "prettier --write src/" // Formatear código
}
```

### **Configuración de IDE:**
```json
// .vscode/settings.json recomendado
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "html"
  }
}
```

---

## 🧪 **TESTING Y QUALITY ASSURANCE**

### **Estrategia de Testing:**
```
├── Unit Tests (70%)
│   ├── Componentes individuales
│   ├── Custom hooks
│   └── Utility functions
│
├── Integration Tests (20%) 
│   ├── Flujos de usuario completos
│   ├── Interacciones entre componentes
│   └── API integrations
│
└── E2E Tests (10%)
    ├── User journeys críticos
    ├── Responsive behavior
    └── Accessibility compliance
```

### **Quality Gates:**
```javascript
// Métricas mínimas requeridas
const QUALITY_REQUIREMENTS = {
  testCoverage: ">= 80%",
  bundleSize: "< 2MB",
  performanceScore: ">= 90",
  accessibilityScore: ">= 95",
  eslintErrors: "0",
  typeErrors: "0"
};
```

---

## 🚢 **DEPLOYMENT Y OPTIMIZACIÓN**

### **Build Optimization:**
```javascript
// vite.config.js - Optimizaciones de build
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          charts: ['recharts']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### **Performance Optimizations:**
- **Code Splitting:** Lazy loading de módulos AC
- **Tree Shaking:** Eliminación de código no utilizado
- **Bundle Analysis:** Monitoreo del tamaño de bundles
- **Image Optimization:** Optimización automática de assets
- **Service Worker:** Caching inteligente (futuro)

---

## 📚 **RECURSOS ADICIONALES**

### **Documentación Relacionada:**
- `docs/ai-context/PRD.md` - Requisitos del proyecto
- `docs/ai-context/work-rules.md` - Reglas de desarrollo
- `docs/ai-context/generate-rules.md` - Generación automática
- `docs/components/` - Documentación de componentes
- `docs/setup/deployment.md` - Guía de deployment

### **Enlaces Útiles:**
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🔍 **NOTAS PARA CLAUDE**

### **Cuando trabajar en este proyecto:**

1. **SIEMPRE consultar este archivo** antes de hacer cambios significativos
2. **Seguir los patrones establecidos** en lugar de crear nuevos
3. **Usar los templates predefinidos** para nuevos módulos AC
4. **Mantener consistencia** con la estructura de carpetas existente
5. **Validar cambios** contra los quality gates definidos

### **Puntos clave a recordar:**
- **Mobile-First:** Diseñar primero para móvil
- **Accesibilidad:** Incluir aria-labels y navegación por teclado
- **Performance:** Lazy loading y optimización de bundles
- **Consistencia:** Seguir naming conventions y patrones de código
- **Reutilización:** Adaptar componentes existentes antes de crear nuevos

### **Archivos críticos que NO modificar sin confirmación:**
- `src/App.jsx` - Configuración raíz
- `tailwind.config.js` - Configuración de estilos
- `package.json` - Dependencias principales
- `src/navigation/founderRoutes.js` - Routing principal

---

**Última actualización:** 20 de julio de 2025  
**Versión del codebase:** 1.0.0  
**Estado:** En desarrollo activo