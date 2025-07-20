# UI/UX GUIDELINES - Founder Pro
**Versión:** 1.0  
**Fecha:** 20 de julio de 2025  
**Basado en:** Análisis real de FounderActivityDashboard + Documentación BMAD FULL Team  

## 1. PRINCIPIOS DE DISEÑO FUNDAMENTALES

### 1.1 Filosofía Founder Pro
**"Guiar al fundador paso a paso desde la idea hasta el éxito"**

- **Claridad progresiva:** Mostrar solo la información necesaria en cada etapa
- **Orientación a la acción:** Cada elemento debe impulsar al fundador hacia el siguiente paso
- **Retroalimentación continua:** El progreso debe ser visible y motivador
- **Profesionalismo inspirador:** Transmitir confianza y credibilidad sin perder dinamismo

### 1.2 Principios Visuales Confirmados (Basados en código real)
- **Modernidad neumórfica:** Efectos de profundidad con `shadow-neumorphic`
- **Gradientes dinámicos:** `bg-gradient-card`, `bg-gradient-dark` para energia
- **Tipografía jerárquica:** Información escaneada rápidamente
- **Espaciado generoso:** Respiración visual para reducir fatiga cognitiva

## 2. SISTEMA DE DESIGN TOKENS (EXTRAÍDO DE CÓDIGO REAL)

### 2.1 Paleta de Colores Founder Pro ✅
**Basada en clases Tailwind custom encontradas:**

#### Colores Primarios
```css
/* Colores principales confirmados en código */
--neon-green: #00ff88;           /* Éxito, completed, positivo */
--neon-purple: #8b5cf6;          /* En progreso, importante */
--warning-dark: #f59e0b;         /* Advertencia, pending */
--error-dark: #ef4444;           /* Error, overdue, crítico */

/* Colores de fondo */
--dark-primary: #0f172a;         /* Fondo principal oscuro */
--dark-surface: #1e293b;         /* Superficies elevadas */
--dark-elevated: #334155;        /* Elementos destacados */

/* Colores de texto */
--text-dark-primary: #f1f5f9;    /* Texto principal claro */
--text-dark-secondary: #cbd5e1;  /* Texto secundario */
--text-dark-muted: #64748b;      /* Texto menos importante */
```

#### Aplicación por Contexto
- **🟢 Éxito/Completado:** `neon-green` - Tareas terminadas, validaciones exitosas
- **🟣 En Progreso:** `neon-purple` - Actividades actuales, procesos activos  
- **🟡 Pendiente/Atención:** `warning-dark` - Tareas por hacer, deadlines próximos
- **🔴 Crítico/Overdue:** `error-dark` - Problemas, retrasos, bloqueos

### 2.2 Tipografía y Jerarquía ✅
**Extraída del análisis de componentes:**

```css
/* Jerarquía tipográfica confirmada */
.text-4xl     /* H1 - Títulos principales (ej: "Founder Activity Dashboard") */
.text-2xl     /* H2 - Títulos de sección (ej: "Activity Matrix") */
.text-xl      /* H3 - Subtítulos (ej: "Market Research") */
.text-lg      /* H4 - Elementos destacados */
.text-base    /* Texto normal */
.text-sm      /* Texto secundario */
.text-xs      /* Labels, metadatos */

/* Pesos específicos */
.font-bold    /* Títulos principales */
.font-semibold /* Subtítulos y elementos importantes */
.font-medium  /* Texto destacado */
.font-normal  /* Texto regular */
```

### 2.3 Sistema de Espaciado ✅
**Basado en Tailwind CSS + clases custom:**

```css
/* Espaciado interno (padding) */
.p-2, .p-3, .p-4, .p-6, .p-8     /* Componentes pequeños a grandes */

/* Espaciado externo (margin) */
.mb-2, .mb-4, .mb-6, .mb-8       /* Separación vertical entre elementos */
.space-x-2, .space-x-4           /* Separación horizontal en flexbox */

/* Espaciado de layout */
.container.mx-auto.px-4.py-8     /* Contenedor principal con padding generoso */
```

### 2.4 Sistema de Sombras y Efectos ✅
**Extraído del análisis real de FounderActivityDashboard:**

```css
/* Sistema neumórfico confirmado */
.shadow-neumorphic           /* Sombra principal para cards y contenedores */
.shadow-neumorphic-subtle    /* Sombra sutil para elementos internos */
.shadow-neumorphic-hover     /* Efecto hover interactivo */
.shadow-neumorphic-inset     /* Efecto hundido para inputs */
.shadow-glow-neon           /* Efecto glow para elementos activos */

/* Aplicación específica */
.rounded-neumorphic         /* Border radius consistente */
.rounded-neumorphic-lg      /* Border radius para contenedores grandes */
```

## 3. COMPONENTES EXISTENTES ANALIZADOS (BASE REAL)

### 3.1 FounderActivityDashboard - MODELO PERFECTO ✅
**Ubicación:** `/src/pages/founder-activity-dashboard/`  
**Estado:** Completamente implementado y funcional

#### Estructura Probada:
```javascript
FounderActivityDashboard/
├── ProgressHeader.jsx      // ✅ Header con progreso global
├── KPIWidgets.jsx         // ✅ Grid de KPIs con hover effects  
├── TabNavigation.jsx      // ✅ Navegación entre vistas
├── RoadmapTimeline.jsx    // ✅ Timeline con fases y actividades
├── ActivityMatrix.jsx     // ✅ Matriz business areas × fases
├── MilestoneTracker.jsx   // ✅ Progress tracking con alerts
└── ActivityDetailModal.jsx // ✅ Modal detallado completo
```

#### Patrones de Diseño Confirmados:
- **Layout Principal:** `bg-gradient-dark` + `container mx-auto px-4 py-8`
- **Cards:** `bg-gradient-card rounded-neumorphic shadow-neumorphic`
- **Estados:** 🟢 neon-green (completed) / 🟣 neon-purple (in-progress) / 🟡 warning-dark (pending)
- **Hover Effects:** `hover:scale-105`, `hover:shadow-neumorphic-hover`
- **Iconografía:** Sistema `AppIcon` con tamaños 14, 16, 18, 20, 24px

### 3.2 UI Components Base ✅
**Ubicación:** `/src/components/ui/`  
**Estado:** Listos para reutilización directa

```javascript
// Componentes validados y funcionando
Button.jsx               // ✅ Sistema completo de botones
Input.jsx               // ✅ Inputs con validación
Select.jsx              // ✅ Selects avanzados
ModalPortal.jsx         // ✅ Sistema modal robusto
Header.jsx              // 🔄 Para adaptar branding
Sidebar.jsx             // 🔄 Para adaptar navegación
```

## 4. ESPECIFICACIONES UI/UX POR PANTALLA (BASADO EN BMAD + CÓDIGO REAL)

### 4.1 🚀 DASHBOARD PRINCIPAL - Especificación Detallada

**Basado en:** `compliance-dashboard-overview` + patrón de `FounderActivityDashboard`

#### Layout Principal:
```html
<!-- Estructura confirmada -->
<div className="min-h-screen bg-gradient-dark">
  <div className="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header Section -->
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-text-dark-primary mb-2">
            Founder Pro Dashboard
          </h1>
          <p className="text-text-dark-secondary text-lg">
            Visión general del progreso de tu startup
          </p>
        </div>
        <Button variant="accent" icon="Download">
          Exportar Reporte
        </Button>
      </div>
    </div>
    
    <!-- KPI Widgets Grid -->
    <FounderKPIWidgets />
    
    <!-- Progress Overview -->
    <ProgressOverview />
    
    <!-- Strategic Matrix Preview -->
    <StrategicMatrixPreview />
  </div>
</div>
```

#### Founder Snapshot (Adaptado de BMAD spec):
```javascript
// Componente FounderSnapshot
const FounderSnapshot = () => (
  <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Estado General */}
      <div className="text-center">
        <div className="text-4xl mb-2">🔥</div>
        <div className="text-sm text-text-dark-muted">Estado General</div>
        <div className="text-lg font-semibold text-neon-green">Alto Rendimiento</div>
      </div>
      
      {/* Founder Score™ */}
      <div className="text-center">
        <div className="text-3xl font-bold text-neon-green mb-1">72%</div>
        <div className="text-sm text-text-dark-muted">Founder Score™</div>
        <div className="text-xs text-text-dark-secondary">Madurez estratégica</div>
      </div>
      
      {/* Controles Activos */}
      <div className="text-center">
        <div className="text-2xl font-bold text-text-dark-primary mb-1">23</div>
        <div className="text-sm text-text-dark-muted">Tareas Activas</div>
        <div className="text-xs text-text-dark-secondary">En progreso</div>
      </div>
      
      {/* Última Actualización */}
      <div className="text-center">
        <div className="text-sm text-text-dark-muted mb-1">Última actualización</div>
        <div className="text-sm font-medium text-text-dark-primary">Hace 2 horas</div>
        <div className="text-xs text-text-dark-secondary">Auto-sync activo</div>
      </div>
    </div>
  </div>
);
```

#### KPIs del Día (Basado en BMAD spec + patrón real):
```javascript
// Reutilizar KPIWidgets.jsx existente con nuevos datos
const startupKPIs = [
  {
    id: 'revenue',
    title: 'Ingresos Hoy',
    value: '$12,500',
    trend: '+8%',
    icon: 'DollarSign',
    color: 'neon-green',
    gradient: 'from-neon-green to-emerald-400'
  },
  {
    id: 'users',
    title: 'Usuarios Activos',
    value: '3,210',
    trend: '+3%',
    icon: 'Users',
    color: 'neon-purple',
    gradient: 'from-neon-purple to-purple-400'
  },
  {
    id: 'customers',
    title: 'Clientes Nuevos',
    value: '+48',
    trend: '+10%',
    icon: 'UserPlus',
    color: 'neon-green',
    gradient: 'from-neon-green to-emerald-400'
  },
  {
    id: 'runway',
    title: 'Runway Financiero',
    value: '14 meses',
    trend: '—',
    icon: 'TrendingUp',
    color: 'warning-dark',
    gradient: 'from-warning-dark to-yellow-400'
  }
];
```

### 4.2 ⛳ MATRIZ ESTRATÉGICA - Especificación Detallada

**Basado en:** `ActivityMatrix.jsx` expandido + BMAD spec

#### Expansión de 6 áreas a 11 ACs:
```javascript
// Áreas estratégicas expandidas
const strategicAreas = [
  { 
    id: 'estrategia-fundamentos', 
    name: 'Estrategia & Fundamentos',
    icon: 'Compass',
    description: 'Modelo de negocio y visión'
  },
  { 
    id: 'legal-corporativo', 
    name: 'Legal & Corporativo',
    icon: 'Scale',
    description: 'Estructura y cumplimiento'
  },
  { 
    id: 'tecnologia-producto', 
    name: 'Tecnología & Producto',
    icon: 'Code',
    description: 'Desarrollo y roadmap'
  },
  { 
    id: 'finanzas-metricas', 
    name: 'Finanzas & Métricas',
    icon: 'Calculator',
    description: 'KPIs y unit economics'
  },
  { 
    id: 'alianzas-negocios', 
    name: 'Alianzas & Negocios',
    icon: 'Handshake',
    description: 'Partners y canales'
  },
  { 
    id: 'marketing-clientes', 
    name: 'Marketing & Clientes',
    icon: 'Megaphone',
    description: 'Adquisición y branding'
  },
  { 
    id: 'operaciones-exito', 
    name: 'Operaciones & Éxito',
    icon: 'Settings',
    description: 'Procesos y retención'
  },
  { 
    id: 'riesgos-sostenibilidad', 
    name: 'Riesgos & Sostenibilidad',
    icon: 'Shield',
    description: 'Contingencia y ESG'
  },
  { 
    id: 'sintesis-ejecucion', 
    name: 'Síntesis & Ejecución',
    icon: 'Target',
    description: 'Integración y OKRs'
  },
  { 
    id: 'recursos-conocimientos', 
    name: 'Recursos & Conocimientos',
    icon: 'BookOpen',
    description: 'Playbooks y biblioteca'
  },
  { 
    id: 'crecimiento-vision', 
    name: 'Crecimiento & Visión',
    icon: 'TrendingUp',
    description: 'Escalamiento futuro'
  }
];

// Fases mantenidas del modelo existente
const phases = [
  { id: 'ideation', name: 'Ideation', status: 'completed' },
  { id: 'validation', name: 'Validation', status: 'in-progress' },
  { id: 'launch', name: 'Launch', status: 'pending' },
  { id: 'growth', name: 'Growth', status: 'pending' },
  { id: 'scaling', name: 'Scaling', status: 'pending' }
];
```

### 4.3 📘 GESTIÓN DE DOCUMENTOS - Especificación Detallada

**Basado en:** BMAD spec + patrón de cards existente

#### Estructura de Document Card:
```javascript
const DocumentCard = ({ document }) => (
  <div className="bg-dark-primary rounded-neumorphic p-6 shadow-neumorphic-subtle border border-slate-700 hover:shadow-neumorphic-hover transition-all duration-300 group hover:scale-[1.02]">
    {/* Header con estado */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-text-dark-primary group-hover:text-neon-green transition-colors duration-300 mb-2">
          {document.name}
        </h3>
        <div className="flex items-center space-x-3 mb-2">
          {/* Estado visual */}
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
            ${getStatusStyle(document.status)}
          `}>
            <Icon name={getStatusIcon(document.status)} size={12} className="mr-1" />
            {document.status}
          </span>
          
          {/* Versión */}
          <span className="text-xs text-text-dark-muted">
            {document.version}
          </span>
          
          {/* AC asociado */}
          <span className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">
            {document.strategicArea}
          </span>
        </div>
      </div>
    </div>
    
    {/* Contenido */}
    <div className="mb-4">
      <p className="text-sm text-text-dark-secondary mb-3">
        {document.summary}
      </p>
      
      <div className="flex items-center justify-between text-xs text-text-dark-muted">
        <span>Owner: {document.owner}</span>
        <span>Actualizado: {document.lastUpdate}</span>
      </div>
      
      {document.nextReview && (
        <div className="mt-2 text-xs text-warning-dark">
          Próxima revisión: {document.nextReview}
        </div>
      )}
    </div>
    
    {/* Acciones */}
    <div className="flex items-center justify-end space-x-2">
      <button className="p-2 rounded-lg hover:bg-dark-surface/50 transition-colors duration-200 text-text-dark-muted hover:text-neon-green">
        <Icon name="Download" size={16} />
      </button>
      <button className="p-2 rounded-lg hover:bg-dark-surface/50 transition-colors duration-200 text-text-dark-muted hover:text-neon-green">
        <Icon name="Share" size={16} />
      </button>
      <button className="p-2 rounded-lg hover:bg-dark-surface/50 transition-colors duration-200 text-text-dark-muted hover:text-neon-green">
        <Icon name="Edit" size={16} />
      </button>
      <button className="p-2 rounded-lg hover:bg-dark-surface/50 transition-colors duration-200 text-text-dark-muted hover:text-error-dark">
        <Icon name="Trash2" size={16} />
      </button>
    </div>
  </div>
);
```

### 4.4 🗂️ ROADMAP ESTRATÉGICO - YA IMPLEMENTADO ✅

**Base existente:** `RoadmapTimeline.jsx` + `MilestoneTracker.jsx`  
**Estado:** Completamente funcional, solo necesita integración

#### Especificación para integración:
- ✅ **RoadmapTimeline:** Vista principal con fases y actividades
- ✅ **MilestoneTracker:** Tracking de hitos con progress bars
- ✅ **Filtros:** Por AC, prioridad, estado, responsable
- ✅ **Vistas múltiples:** Timeline, Calendar, List
- 🔄 **Expansión:** Adaptar a 11 ACs en lugar de 6 áreas

### 4.5 🔁 FOUNDER REPORTING CENTER - Especificación Detallada

**Basado en:** `compliance-reporting-center` + BMAD spec

#### Data Sources Cards (Adaptado):
```javascript
const founderDataSources = [
  {
    id: 'leads',
    title: 'Lead Sources',
    subtitle: 'CRM, formularios, campañas activas',
    icon: 'Users',
    gradient: 'from-neon-green to-emerald-400',
    records: '1,200 registros',
    status: 'connected'
  },
  {
    id: 'analytics',
    title: 'Web & SEO Analytics',
    subtitle: 'Google Analytics, Search Console, Ahrefs',
    icon: 'TrendingUp',
    gradient: 'from-neon-purple to-purple-400',
    records: '850 registros',
    status: 'connected'
  },
  {
    id: 'revenue',
    title: 'Revenue Streams',
    subtitle: 'Stripe, PayPal, ecommerce, SaaS',
    icon: 'DollarSign',
    gradient: 'from-warning-dark to-yellow-400',
    records: '680 registros',
    status: 'pending'
  },
  {
    id: 'usage',
    title: 'Product Usage',
    subtitle: 'Apps, SaaS, plataformas',
    icon: 'Activity',
    gradient: 'from-error-dark to-red-400',
    records: '420 registros',
    status: 'disconnected'
  }
];
```

## 5. NAVEGACIÓN PRINCIPAL - ESPECIFICACIÓN DETALLADA

### 5.1 Sidebar Adaptation (Basado en BMAD spec)

**Mapeo de Compliance → Founder Pro:**
```javascript
const navigationMapping = [
  { 
    old: 'Compliance Overview', 
    new: '🚀 DASHBOARD',
    route: '/founder-dashboard',
    submenu: []
  },
  { 
    old: 'IT Compliance', 
    new: '🧭 ESTRATEGIA Y FUNDAMENTOS',
    route: '/estrategia-fundamentos',
    submenu: [
      'Estrategia & Modelo de Negocio',
      'Crecimiento & Visión a Largo Plazo'
    ]
  },
  { 
    old: 'Financial Compliance', 
    new: '⚖️ LEGAL & CORPORATIVO',
    route: '/legal-corporativo',
    submenu: [
      'Documentación Legal & Estructura',
      'Cumplimiento Normativo & Contratos'
    ]
  },
  // ... continuar mapeo para todos los 11 ACs
];
```

## 6. PATRONES DE INTERACCIÓN Y MICROANIMACIONES

### 6.1 Hover Effects (Confirmados en código):
```css
/* Efectos de hover confirmados */
.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:scale-\[1\.02\]:hover { transform: scale(1.02); }
.hover\:shadow-neumorphic-hover:hover { /* sombra específica */ }
.hover\:shadow-glow-neon:hover { /* efecto glow */ }

/* Transiciones suaves */
.transition-all.duration-300 { transition: all 0.3s ease; }
.transition-colors.duration-200 { transition: color 0.2s ease; }
.transition-transform.duration-300 { transition: transform 0.3s ease; }
```

### 6.2 Estados de Carga y Feedback:
```javascript
// Patrón confirmado en ActivityDetailModal
const LoadingState = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-green"></div>
    <span className="ml-3 text-text-dark-secondary">Cargando...</span>
  </div>
);

// Success state
const SuccessState = ({ message }) => (
  <div className="flex items-center p-4 bg-neon-green/20 border border-neon-green/50 rounded-lg">
    <Icon name="CheckCircle" size={20} className="text-neon-green mr-3" />
    <span className="text-neon-green">{message}</span>
  </div>
);
```

## 7. RESPONSIVE DESIGN SPECIFICATIONS

### 7.1 Breakpoints (Tailwind CSS):
```css
/* Breakpoints confirmados */
sm: '640px',   /* Mobile landscape */
md: '768px',   /* Tablet */
lg: '1024px',  /* Desktop */
xl: '1280px',  /* Large desktop */
2xl: '1536px'  /* Extra large */
```

### 7.2 Grid Systems:
```javascript
// Grid responsivo confirmado en KPIWidgets
className="grid grid-cols-1 md:grid-cols-3 gap-6"

// Grid para matriz estratégica
className="grid grid-cols-1 lg:grid-cols-2 gap-8"

// Layout principal
className="container mx-auto px-4 py-8 max-w-7xl"
```

## 8. ACCESIBILIDAD Y USABILIDAD

### 8.1 Contraste y Legibilidad:
- **Ratio mínimo:** 4.5:1 para texto normal
- **Ratio mínimo:** 3:1 para texto grande y elementos UI
- **Colores confirmados** cumplen con estándares WCAG

### 8.2 Navegación por Teclado:
```css
/* Focus states */
.focus\:outline-none:focus { outline: none; }
.focus\:ring-2:focus { ring: 2px solid; }
.focus\:ring-neon-green:focus { ring-color: var(--neon-green); }
```

## 9. ESTADOS ESPECIALES Y EDGE CASES

### 9.1 Empty States (Basado en MilestoneTracker):
```javascript
const EmptyState = ({ title, description, actionText, onAction }) => (
  <div className="text-center py-12">
    <Icon name="Package" size={48} className="text-text-dark-muted mb-4 mx-auto" />
    <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
      {title}
    </h4>
    <p className="text-text-dark-secondary mb-6">
      {description}
    </p>
    {actionText && (
      <Button 
        variant="accent" 
        onClick={onAction}
        className="hover:shadow-glow-neon"
      >
        {actionText}
      </Button>
    )}
  </div>
);
```

### 9.2 Error States:
```javascript
const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <Icon name="AlertTriangle" size={48} className="text-error-dark mb-4 mx-auto" />
    <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
      Algo salió mal
    </h4>
    <p className="text-text-dark-secondary mb-6">
      {error.message}
    </p>
    <Button variant="outline" onClick={onRetry}>
      Intentar de nuevo
    </Button>
  </div>
);
```

---

## 📋 **CONCLUSIÓN:**

Los UI/UX Guidelines están basados en:

🎯 **Código real analizado:** Patrones confirmados de `FounderActivityDashboard`  
🎯 **Documentación BMAD:** Especificaciones detalladas validadas  
🎯 **Stack moderno:** Tailwind CSS + efectos neumórficos optimizados  
🎯 **Componentes probados:** Sistema UI robusto y funcional  
🎯 **Patrones establecidos:** Modelo replicable para nuevos módulos  

**Estos guidelines proporcionan la base visual y de interacción completa para implementar Founder Pro manteniendo consistencia y calidad.**

---

**Siguiente paso:** System Instructions para desarrollo con IA