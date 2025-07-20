# PROJECT STRUCTURE - Founder Pro
**Versión:** 2.0 (Actualizado con estructura real)  
**Fecha:** 20 de julio de 2025  
**Basado en:** Estructura real de ComplianceHub + Adaptaciones Founder Pro

## 1. ESTRUCTURA REAL DEL PROYECTO

### 1.1 Stack Tecnológico Confirmado ✅
- **Frontend:** React 18 + Vite (build tool)
- **Styling:** Tailwind CSS + CSS custom
- **Routing:** React Router (inferido de Routes.jsx)
- **Estado:** React hooks + Context (inferido)
- **Build:** Vite (moderno y rápido)

### 1.2 Estructura Raíz Actual
```
compliance_management_1752988838077/  # 🔄 RENOMBRAR → founder-pro/
├── 📄 package.json                   # ✅ MANTENER: Dependencies info
├── 📄 package-lock.json              # ✅ MANTENER: Lock dependencies  
├── 📄 vite.config.mjs               # ✅ MANTENER: Vite configuration
├── 📄 tailwind.config.js            # 🔄 ADAPTAR: Theme customization
├── 📄 postcss.config.js             # ✅ MANTENER: PostCSS config
├── 📄 jsconfig.json                 # ✅ MANTENER: JS configuration
├── 📄 index.html                    # 🔄 ADAPTAR: Title, meta tags
├── 📄 favicon.ico                   # 🔄 ADAPTAR: Founder Pro favicon
└── 📄 README.md                     # 🔄 ADAPTAR: Founder Pro docs
```

### 1.3 Carpeta /public (Assets Estáticos)
```
public/
├── 📄 favicon.ico                   # 🔄 ADAPTAR: Founder Pro favicon
├── 📄 manifest.json                 # 🔄 ADAPTAR: App manifest
├── 📄 robots.txt                    # ✅ MANTENER: SEO config
└── 📁 assets/
    └── 📁 images/                   # 🔍 ANALIZAR: 29 screenshots + assets
        ├── no_image.png            # ✅ MANTENER: Placeholder image
        ├── Screenshot_2025-07-09...# 📋 REFERENCIA: 29 pantallas actuales
        └── [28 más screenshots]   # 📋 Base para análisis de adaptación
```

## 2. ESTRUCTURA /src (CÓDIGO PRINCIPAL)

### 2.1 Archivos Raíz de /src
```
src/
├── 📄 index.jsx                     # ✅ MANTENER: Entry point
├── 📄 App.jsx                       # 🔄 ADAPTAR: App principal + routing
└── 📄 Routes.jsx                    # 🔄 ADAPTAR: Configuración de rutas
```

### 2.2 Componentes Base (/src/components)
```
src/components/
├── 📄 AppIcon.jsx                   # 🔄 ADAPTAR: Íconos → Founder Pro
├── 📄 AppImage.jsx                  # ✅ MANTENER: Componente imagen
├── 📄 ErrorBoundary.jsx             # ✅ MANTENER: Error handling
├── 📄 ScrollToTop.jsx               # ✅ MANTENER: UX utility
└── 📁 ui/                          # 🎯 COMPONENTES UI REUTILIZABLES
    ├── 📄 Breadcrumbs.jsx          # ✅ MANTENER: Navegación
    ├── 📄 Button.jsx               # ✅ MANTENER: Botones base
    ├── 📄 Checkbox.jsx             # ✅ MANTENER: Form components
    ├── 📄 ControlDetailDrawer.jsx  # 🔄 ADAPTAR → FounderDetailDrawer.jsx
    ├── 📄 Dropdown.jsx             # ✅ MANTENER: Select components
    ├── 📄 Header.jsx               # 🔄 ADAPTAR: Header con branding Founder Pro
    ├── 📄 Input.jsx                # ✅ MANTENER: Input components
    ├── 📄 ModalPortal.jsx          # ✅ MANTENER: Modal system
    ├── 📄 Select.jsx               # ✅ MANTENER: Select advanced
    └── 📄 Sidebar.jsx              # 🔄 ADAPTAR: Navigation → AC structure
```

### 2.3 Páginas Principales (/src/pages) - MAPEO DETALLADO

#### 2.3.1 Dashboard Principal
```
📁 compliance-dashboard-overview/    # 🔄 ADAPTAR → founder-dashboard/
├── 📄 index.jsx                    # 🔄 ADAPTAR: Dashboard principal
└── 📁 components/                  # 🔄 ADAPTAR todos los componentes:
    ├── 📄 AuditTimeline.jsx        # → FounderTimeline.jsx
    ├── 📄 ComplianceStatusBanner.jsx # → FounderStatusBanner.jsx  
    ├── 📄 ControlsMatrix.jsx       # → StrategicMatrix.jsx
    ├── 📄 ExportModal.jsx          # ✅ MANTENER: Modal exportación
    ├── 📄 KPIWidgets.jsx           # 🔄 ADAPTAR: KPIs startup
    ├── 📄 PolicyLibrary.jsx        # → ResourceLibrary.jsx
    └── 📄 TabNavigation.jsx        # ✅ MANTENER: Navegación tabs
```

#### 2.3.2 Dashboard Founder (¡YA EXISTE!)
```
📁 founder-activity-dashboard/       # 🎯 BASE EXISTENTE PARA FOUNDER PRO
├── 📄 index.jsx                    # 🔍 ANALIZAR: Qué está implementado
└── 📁 components/                  # 🔍 COMPONENTES YA FOUNDER-ORIENTED:
    ├── 📄 ActivityDetailModal.jsx  # ✅ PERFECTO: Modal actividades
    ├── 📄 ActivityMatrix.jsx       # ✅ PERFECTO: Matriz actividades
    ├── 📄 KPIWidgets.jsx           # ✅ PERFECTO: KPIs founder
    ├── 📄 MilestoneTracker.jsx     # ✅ PERFECTO: Tracking milestones
    ├── 📄 ProgressHeader.jsx       # ✅ PERFECTO: Header progreso
    ├── 📄 RoadmapTimeline.jsx      # ✅ PERFECTO: Timeline roadmap
    └── 📄 TabNavigation.jsx        # ✅ MANTENER: Navegación
```

#### 2.3.3 Matriz de Controles → Matriz Estratégica
```
📁 controls-matrix-management/       # 🔄 ADAPTAR → strategic-matrix-management/
├── 📄 index.jsx                    # 🔄 ADAPTAR: Matriz principal
└── 📁 components/
    ├── 📄 BulkOperationsToolbar.jsx # → BulkStrategicOperations.jsx
    ├── 📄 FilterSidebar.jsx        # ✅ MANTENER: Filtros laterales
    └── 📄 MatrixGrid.jsx           # 🔄 ADAPTAR: Grid → Strategic ACs
```

#### 2.3.4 Reporting Center → Founder Reporting
```
📁 compliance-reporting-center/      # 🔄 ADAPTAR → founder-reporting-center/
├── 📄 index.jsx                    # 🔄 ADAPTAR: Centro de reportes
├── 📁 components/                  # 🔄 ADAPTAR componentes:
│   ├── 📄 CategorySidebar.jsx      # → ACCategorySidebar.jsx
│   ├── 📄 DataSourcePanel.jsx      # 🔄 ADAPTAR: Fuentes datos startup
│   ├── 📄 EmptyState.jsx           # ✅ MANTENER: Estados vacíos
│   ├── 📄 ExportModal.jsx          # ✅ MANTENER: Exportación
│   ├── 📄 FilterPanel.jsx          # ✅ MANTENER: Panel filtros
│   ├── 📄 Pagination.jsx           # ✅ MANTENER: Paginación
│   ├── 📄 PreviewPanel.jsx         # ✅ MANTENER: Preview reportes
│   ├── 📄 ReportBuilderPanel.jsx   # 🔄 ADAPTAR: Builder startup reports
│   ├── 📄 ScheduleModal.jsx        # ✅ MANTENER: Programación
│   ├── 📄 SearchAndSort.jsx        # ✅ MANTENER: Búsqueda
│   ├── 📄 StarRating.jsx           # ✅ MANTENER: Rating system
│   ├── 📄 TemplateCard.jsx         # 🔄 ADAPTAR: Templates startup
│   └── 📄 TemplateLibrary.jsx      # 🔄 ADAPTAR: Librería templates
├── 📁 constants/
│   └── 📄 templateConstants.js     # 🔄 ADAPTAR: Constantes founder
├── 📁 hooks/
│   └── 📄 useTemplateLibrary.js    # 🔄 ADAPTAR: Hook templates
└── 📁 utils/
    └── 📄 templateUtils.js         # 🔄 ADAPTAR: Utils templates
```

#### 2.3.5 Gestión de Documentos (Control Details → Document Management)
```
📁 control-detail-management/        # 🔄 ADAPTAR → document-management/
├── 📄 index.jsx                    # 🔄 ADAPTAR: Gestión documentos
└── 📁 components/
    ├── 📄 AssignmentHistoryTab.jsx  # → DocumentHistoryTab.jsx
    ├── 📄 BulkOperationsPanel.jsx   # → BulkDocumentOperations.jsx
    ├── 📄 ControlDefinitionTab.jsx  # → DocumentDefinitionTab.jsx
    ├── 📄 EvidenceRequirementsTab.jsx # → DocumentRequirementsTab.jsx
    ├── 📄 ExportModal.jsx           # ✅ MANTENER: Exportación
    ├── 📄 IntegrationStatusPanel.jsx # ✅ MANTENER: Estado integraciones
    ├── 📄 MobileControlLookup.jsx   # → MobileDocumentLookup.jsx
    ├── 📄 NotificationPanel.jsx     # ✅ MANTENER: Notificaciones
    ├── 📄 TestingProceduresTab.jsx  # → ValidationProceduresTab.jsx
    └── 📄 VersionControlPanel.jsx   # ✅ MANTENER: Control versiones
```

#### 2.3.6 Librerías (Controls/Policy → Resources)
```
📁 controls-library-management/      # 🔄 ADAPTAR → resources-library-management/
└── 📁 policy-library-management/   # 🔄 ADAPTAR → knowledge-library-management/
    # Adaptar para recursos y conocimiento de startups
```

#### 2.3.7 Timeline/Scheduler → Roadmap
```
📁 audit-timeline-scheduler/         # 🔄 ADAPTAR → strategic-roadmap-scheduler/
├── 📄 index.jsx                    # 🔄 ADAPTAR: Scheduler principal
└── 📁 components/
    ├── 📄 AuditDetailsModal.jsx     # → MilestoneDetailsModal.jsx
    ├── 📄 BulkActionsPanel.jsx      # → BulkMilestoneActions.jsx
    ├── 📄 FilterPanel.jsx           # ✅ MANTENER: Panel filtros
    └── 📄 TimelineView.jsx          # 🔄 ADAPTAR: Vista timeline founder
```

#### 2.3.8 Administración (MANTENER)
```
📁 system-configuration-dashboard/   # ✅ MANTENER: Config sistema
📁 user-role-administration/         # ✅ MANTENER: Gestión usuarios
📁 user-profile-management/          # ✅ MANTENER: Perfiles usuarios
📄 NotFound.jsx                     # ✅ MANTENER: 404 page
```

### 2.4 Estilos (/src/styles)
```
src/styles/
├── 📄 index.css                    # 🔄 ADAPTAR: Estilos globales
└── 📄 tailwind.css                 # 🔄 ADAPTAR: Customizaciones Tailwind
```

### 2.5 Utilidades (/src/utils)
```
src/utils/
└── 📄 cn.js                        # ✅ MANTENER: Class name utility (probable clsx)
```

## 3. NUEVA ESTRUCTURA PROPUESTA /ai-context

```
📁 ai-context/                       # 🆕 CREAR: Context Engineering docs
├── 📄 PRD.md                       # ✅ CREADO: Requirements
├── 📄 implementation-plan.md        # ✅ CREADO: Plan implementación  
├── 📄 project-structure.md          # ✅ ESTE DOCUMENTO
├── 📄 ui-ux-guidelines.md          # ⏳ PRÓXIMO: Guías diseño
├── 📄 system-prompt.md             # ⏳ PRÓXIMO: Instrucciones IA
├── 📄 work-rules.md                # ⏳ PRÓXIMO: Reglas trabajo
├── 📄 generate-rules.md            # ⏳ PRÓXIMO: Reglas generación
├── 📄 tool-definitions.md          # ⏳ PRÓXIMO: Definiciones tools
├── 📄 bug-tracking.md              # ⏳ Durante desarrollo
├── 📄 global-state.json            # ⏳ Durante desarrollo
├── 📄 project-memory.md            # ⏳ Durante desarrollo
├── 📄 chat-history.md              # ⏳ Durante desarrollo
├── 📄 context-management.md        # ⏳ Optimización
└── 📄 evaluation-criteria.md       # ⏳ Optimización
```

## 4. NUEVA ESTRUCTURA PROPUESTA /docs

```
📁 docs/                            # 🆕 CREAR: BMAD FULL Team outputs
├── 📄 project-brief.md             # ✅ CREADO: Brief inicial
├── 📄 prd.md                       # ✅ CREADO: PRD completo
├── 📄 front-end-spec.md            # ✅ CREADO: Spec UI/UX
├── 📄 front-end-architecture.md    # ✅ CREADO: Arquitectura
├── 📄 architecture-review.md       # ✅ CREADO: Review arquitectura
└── 📄 .claude.md                   # ⏳ PRÓXIMO: Documentación codebase
```

## 5. ESTRATEGIA DE ADAPTACIÓN BASADA EN ESTRUCTURA REAL

### 5.1 Componentes 100% Reutilizables (✅ MANTENER)
```
src/components/ui/
├── Button.jsx                      # ✅ Botones universales
├── Input.jsx                       # ✅ Inputs universales
├── Select.jsx                      # ✅ Selects universales
├── Checkbox.jsx                    # ✅ Checkboxes universales
├── Dropdown.jsx                    # ✅ Dropdowns universales
├── ModalPortal.jsx                 # ✅ Sistema modal
├── Breadcrumbs.jsx                 # ✅ Navegación
└── [otros componentes UI base]     # ✅ UI primitivos
```

### 5.2 Componentes Adaptación Media (🔄 ADAPTAR)
```
src/components/ui/
├── Header.jsx                      # 🔄 Branding + navegación Founder Pro
├── Sidebar.jsx                     # 🔄 Menú → estructura AC
└── ControlDetailDrawer.jsx         # 🔄 → FounderDetailDrawer.jsx

src/pages/compliance-dashboard-overview/components/
├── KPIWidgets.jsx                  # 🔄 KPIs compliance → startup KPIs
├── ExportModal.jsx                 # 🔄 Exportación → reportes founder
└── TabNavigation.jsx               # 🔄 Tabs → navegación AC
```

### 5.3 Componentes Adaptación Mayor (🔄 TRANSFORMAR)
```
src/pages/compliance-dashboard-overview/components/
├── ComplianceStatusBanner.jsx      # 🔄 → FounderStatusBanner.jsx
├── ControlsMatrix.jsx              # 🔄 → StrategicMatrix.jsx
├── AuditTimeline.jsx               # 🔄 → FounderTimeline.jsx
└── PolicyLibrary.jsx               # 🔄 → ResourceLibrary.jsx

src/pages/controls-matrix-management/components/
├── MatrixGrid.jsx                  # 🔄 → StrategicGrid.jsx (AC-based)
└── BulkOperationsToolbar.jsx       # 🔄 → BulkStrategicOperations.jsx
```

### 5.4 Componentes de Referencia (📋 USAR COMO BASE)
```
📁 founder-activity-dashboard/       # 🎯 YA IMPLEMENTADO - USAR COMO MODELO
├── ActivityMatrix.jsx              # 📋 Modelo para matriz estratégica
├── KPIWidgets.jsx                  # 📋 Modelo para KPIs startup
├── MilestoneTracker.jsx            # 📋 Modelo para tracking
├── RoadmapTimeline.jsx             # 📋 Modelo para roadmap
└── ProgressHeader.jsx              # 📋 Modelo para header progreso
```

## 6. MAPEO DE RUTAS (Routes.jsx)

### 6.1 Rutas Actuales → Rutas Founder Pro
```javascript
// 🔄 MAPEO DE RUTAS SUGERIDO:
'/compliance-dashboard'          → '/dashboard'
'/founder-activity-dashboard'    → '/founder-dashboard'  // YA EXISTE!
'/controls-matrix'              → '/strategic-matrix'
'/compliance-reporting'         → '/founder-reporting'
'/control-detail'               → '/document-management'
'/controls-library'             → '/resources-library'
'/policy-library'               → '/knowledge-library'
'/audit-timeline'               → '/strategic-roadmap'
'/system-configuration'         → '/system-configuration'  // MANTENER
'/user-role-administration'     → '/user-role-administration'  // MANTENER
'/user-profile'                 → '/user-profile'  // MANTENER
```

## 7. CONFIGURACIÓN DE BUILD Y DESARROLLO

### 7.1 Archivos de Configuración (ADAPTAR MÍNIMO)
```
├── 📄 vite.config.mjs              # ✅ MANTENER: Build config óptimo
├── 📄 tailwind.config.js           # 🔄 ADAPTAR: Theme Founder Pro
├── 📄 postcss.config.js            # ✅ MANTENER: PostCSS processing
└── 📄 package.json                 # 🔄 ADAPTAR: Name, description, scripts
```

### 7.2 Scripts de Package.json (INFERIDOS)
```json
{
  "scripts": {
    "dev": "vite",                  // ✅ MANTENER: Desarrollo local
    "build": "vite build",          // ✅ MANTENER: Build producción
    "preview": "vite preview",      // ✅ MANTENER: Preview build
    "lint": "eslint src",           // ✅ MANTENER: Linting
    "format": "prettier --write ."  // ✅ MANTENER: Formatting
  }
}
```

## 8. VENTAJAS DE LA ESTRUCTURA ACTUAL

### 8.1 Arquitectura Moderna ✅
- **Vite:** Build tool rápido y moderno
- **Tailwind CSS:** Utility-first, fácil customización
- **Estructura modular:** Cada página es autónoma
- **Componentes UI separados:** Reutilización óptima

### 8.2 Base Founder Pro Existente ✅
- **`founder-activity-dashboard`** ya implementado
- **Componentes founder-oriented** ya creados:
  - ActivityMatrix, KPIWidgets, MilestoneTracker, RoadmapTimeline
- **Patrón establecido** para seguir adaptando

### 8.3 Facilidad de Adaptación ✅
- **Separación clara** entre UI y lógica de negocio  
- **Componentes modulares** fáciles de adaptar
- **Sistema de routing** bien estructurado
- **29 screenshots** como referencia visual

## 9. PRÓXIMOS PASOS INMEDIATOS

### 9.1 Investigación Inicial (ANTES DE DESARROLLAR)
1. **Analizar `founder-activity-dashboard`** existente:
   - ¿Qué está implementado?
   - ¿Cómo están los componentes?
   - ¿Sigue el patrón que necesitamos?

2. **Revisar `/src/Routes.jsx`**:
   - Confirmar routing actual
   - Planificar nuevas rutas Founder Pro

3. **Examinar `tailwind.config.js`**:
   - Theme actual
   - Variables customizables

### 9.2 Setup Ambiente Desarrollo
1. **Clonar repositorio** en nueva branch `founder-pro-development`
2. **Crear carpeta `/ai-context`** con documentos Context Engineering
3. **Crear carpeta `/docs`** con outputs BMAD FULL Team
4. **Setup ambiente local** con `npm install` y `npm run dev`

---

## 10. CONCLUSIÓN

La estructura real es **MUCHO MEJOR** de lo esperado:

🎯 **Stack moderno y eficiente** (React + Vite + Tailwind)  
🎯 **Arquitectura modular** perfecta para adaptación  
🎯 **Base Founder Pro existente** (`founder-activity-dashboard`)  
🎯 **Componentes UI reutilizables** bien separados  
🎯 **29 screenshots** como referencia visual exacta  

**La adaptación será más eficiente y menos riesgosa** de lo estimado inicialmente.

---

**Siguiente paso:** UI/UX Guidelines basado en estructura real + análisis de componentes existentes