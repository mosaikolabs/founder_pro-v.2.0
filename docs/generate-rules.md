## 5. REGLAS DE VALIDACIÓN AUTOMÁTICA

### 5.1 Checklist de Generación
```javascript
// VALIDACIONES OBLIGATORIAS post-generación
const validateGeneratedCode = (generatedComponent) => {
  const checks = {
    // Estructura básica
    hasCorrectImports: checkImports(generatedComponent),
    usesConstArrowFunction: checkFunctionDeclaration(generatedComponent),
    hasPropTypes: checkPropTypes(generatedComponent),
    hasDefaultProps: checkDefaultProps(generatedComponent),
    
    // Styling
    usesTailwindOnly: checkTailwindUsage(generatedComponent),
    usesFounderClasses: checkFounderClasses(generatedComponent),
    hasHoverEffects: checkHoverEffects(generatedComponent),
    
    // Accesibilidad
    hasAriaLabels: checkAriaLabels(generatedComponent),
    hasTabIndex: checkTabIndex(generatedComponent),
    hasKeyboardHandlers: checkKeyboardHandlers(generatedComponent),
    
    // Funcionalidad
    hasErrorHandling: checkErrorHandling(generatedComponent),
    hasLoadingStates: checkLoadingStates(generatedComponent),
    hasEmptyStates: checkEmptyStates(generatedComponent),
    
    // Founder Pro específico
    followsFounderPattern: checkFounderPattern(generatedComponent),
    usesCorrectIcons: checkIconUsage(generatedComponent),
    hasFounderBranding: checkFounderBranding(generatedComponent)
  };
  
  const passed = Object.values(checks).every(check => check);
  
  if (!passed) {
    const failed = Object.entries(checks)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
    
    throw new Error(`Validación fallida en: ${failed.join(', ')}`);
  }
  
  return true;
};

// Funciones de validación específicas
const checkImports = (code) => {
  const requiredImports = ['React', 'PropTypes', 'Icon'];
  return requiredImports.every(imp => code.includes(`import ${imp}`));
};

const checkFounderPattern = (code) => {
  const patterns = [
    'bg-gradient-dark',
    'bg-gradient-card',
    'rounded-neumorphic',
    'text-text-dark-primary',
    'hover:shadow-glow-neon'
  ];
  return patterns.some(pattern => code.includes(pattern));
};

const checkAccessibility = (code) => {
  const accessibilityFeatures = [
    'aria-label',
    'tabIndex',
    'role=',
    'onKeyDown'
  ];
  return accessibilityFeatures.some(feature => code.includes(feature));
};
```

### 5.2 Métricas de Calidad
```javascript
// MÉTRICAS OBLIGATORIAS para cada componente generado
const calculateQualityScore = (component) => {
  const metrics = {
    // Complejidad cognitiva (máximo 15)
    cognitiveComplexity: calculateCognitiveComplexity(component),
    
    // Líneas de código (máximo 200 por componente)
    linesOfCode: component.split('\n').length,
    
    // Número de props (máximo 10)
    propCount: extractProps(component).length,
    
    // Profundidad de anidación (máximo 5)
    nestingDepth: calculateNestingDepth(component),
    
    // Reutilización de componentes
    componentReuse: calculateReuseScore(component)
  };
  
  const weights = {
    cognitiveComplexity: 0.3,
    linesOfCode: 0.2,
    propCount: 0.2,
    nestingDepth: 0.15,
    componentReuse: 0.15
  };
  
  const score = Object.entries(metrics).reduce((total, [key, value]) => {
    const normalizedScore = normalizeMetric(key, value);
    return total + (normalizedScore * weights[key]);
  }, 0);
  
  return Math.round(score * 100);
};

// Score mínimo aceptable: 75/100
const MIN_QUALITY_SCORE = 75;
```

## 6. AUTOMATIZACIÓN DE GENERACIÓN

### 6.1 Comandos de Generación
```javascript
// COMANDO: Generar módulo AC completo
const generateACModule = (moduleConfig) => {
  const {
    moduleName,
    strategicAreas,
    phases,
    kpis,
    dataStructure
  } = moduleConfig;
  
  // 1. Generar estructura de archivos
  const fileStructure = createFileStructure(moduleName);
  
  // 2. Generar componente principal
  const mainComponent = generateFromTemplate('ACModuleTemplate', {
    moduleName,
    kpis
  });
  
  // 3. Generar componentes específicos
  const matrixComponent = generateFromTemplate('MatrixTemplate', {
    moduleName,
    strategicAreas,
    phases
  });
  
  const timelineComponent = generateFromTemplate('TimelineTemplate', {
    moduleName,
    dataStructure
  });
  
  const trackerComponent = generateFromTemplate('TrackerTemplate', {
    moduleName,
    dataStructure
  });
  
  // 4. Generar hook de datos
  const dataHook = generateFromTemplate('DataHookTemplate', {
    moduleName,
    dataStructure
  });
  
  // 5. Generar mapper
  const dataMapper = generateFromTemplate('DataMapperTemplate', {
    moduleName,
    dataStructure
  });
  
  // 6. Generar datos mock
  const mockData = generateMockData(moduleName, strategicAreas, phases);
  
  // 7. Validar todo el código generado
  const components = [
    mainComponent,
    matrixComponent,
    timelineComponent,
    trackerComponent,
    dataHook,
    dataMapper
  ];
  
  components.forEach((component, index) => {
    const isValid = validateGeneratedCode(component);
    const qualityScore = calculateQualityScore(component);
    
    if (!isValid || qualityScore < MIN_QUALITY_SCORE) {
      throw new Error(`Componente ${index} no cumple estándares de calidad`);
    }
  });
  
  return {
    fileStructure,
    components: {
      main: mainComponent,
      matrix: matrixComponent,
      timeline: timelineComponent,
      tracker: trackerComponent,
      hook: dataHook,
      mapper: dataMapper,
      mockData
    }
  };
};
```

### 6.2 Template Engine
```javascript
// MOTOR DE TEMPLATES - Reemplaza variables en templates
const generateFromTemplate = (templateName, variables) => {
  const template = TEMPLATES[templateName];
  
  if (!template) {
    throw new Error(`Template ${templateName} no encontrado`);
  }
  
  let result = template;
  
  // Reemplazar variables {VariableName}
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    result = result.replace(regex, value);
  });
  
  // Reemplazar condicionales {if:condition}...{/if}
  result = processConditionals(result, variables);
  
  // Reemplazar loops {each:arrayName}...{/each}
  result = processLoops(result, variables);
  
  // Validar sintaxis del resultado
  try {
    // Verificar que sea JavaScript válido
    new Function(result);
  } catch (error) {
    throw new Error(`Código generado inválido: ${error.message}`);
  }
  
  return result;
};

// Procesar condicionales en templates
const processConditionals = (template, variables) => {
  const conditionalRegex = /{if:(\w+)}([\s\S]*?){\/if}/g;
  
  return template.replace(conditionalRegex, (match, condition, content) => {
    const shouldInclude = variables[condition];
    return shouldInclude ? content : '';
  });
};

// Procesar loops en templates
const processLoops = (template, variables) => {
  const loopRegex = /{each:(\w+)}([\s\S]*?){\/each}/g;
  
  return template.replace(loopRegex, (match, arrayName, content) => {
    const array = variables[arrayName] || [];
    
    return array.map((item, index) => {
      let itemContent = content;
      
      // Reemplazar variables del item
      Object.entries(item).forEach(([key, value]) => {
        const regex = new RegExp(`{item.${key}}`, 'g');
        itemContent = itemContent.replace(regex, value);
      });
      
      // Reemplazar índice
      itemContent = itemContent.replace(/{index}/g, index);
      
      return itemContent;
    }).join('\n');
  });
};
```

### 6.3 Generación Automática de Datos Mock
```javascript
// GENERADOR DE DATOS MOCK - Crear datos realistas para desarrollo
const generateMockData = (moduleType, strategicAreas = [], phases = []) => {
  const generators = {
    'strategic-fundamentals': generateStrategicData,
    'legal-corporate': generateLegalData,
    'technology-product': generateTechData,
    'finance-metrics': generateFinanceData,
    'marketing-customers': generateMarketingData,
    'operations-success': generateOperationsData
  };
  
  const generator = generators[moduleType] || generateGenericData;
  return generator(strategicAreas, phases);
};

const generateStrategicData = (areas, phases) => {
  const activities = [];
  const priorities = ['high', 'medium', 'low'];
  const statuses = ['completed', 'in-progress', 'pending', 'blocked'];
  
  areas.forEach(area => {
    phases.forEach(phase => {
      const activityCount = Math.floor(Math.random() * 5) + 1;
      
      for (let i = 0; i < activityCount; i++) {
        activities.push({
          id: `${area.id}-${phase.id}-${i + 1}`,
          name: `${area.name} - ${phase.name} ${i + 1}`,
          description: `Actividad de ${area.name.toLowerCase()} en fase de ${phase.name.toLowerCase()}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          area: area.id,
          phase: phase.id,
          owner: `Founder ${Math.floor(Math.random() * 3) + 1}`,
          progress: Math.floor(Math.random() * 101),
          createdDate: generateRandomDate(-30, 0),
          dueDate: generateRandomDate(0, 60),
          tags: generateRandomTags(area.name),
          estimatedHours: Math.floor(Math.random() * 40) + 5,
          actualHours: Math.floor(Math.random() * 50) + 1
        });
      }
    });
  });
  
  return {
    areas,
    phases,
    activities,
    summary: {
      totalActivities: activities.length,
      completedCount: activities.filter(a => a.status === 'completed').length,
      inProgressCount: activities.filter(a => a.status === 'in-progress').length,
      pendingCount: activities.filter(a => a.status === 'pending').length,
      blockedCount: activities.filter(a => a.status === 'blocked').length
    }
  };
};

// Generar fechas aleatorias
const generateRandomDate = (daysFromNow, daysRange) => {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + daysFromNow);
  
  const randomDays = Math.floor(Math.random() * daysRange);
  baseDate.setDate(baseDate.getDate() + randomDays);
  
  return baseDate.toISOString().split('T')[0];
};

// Generar tags relevantes
const generateRandomTags = (areaName) => {
  const tagsByArea = {
    'Estrategia': ['business-model', 'vision', 'mission', 'objectives'],
    'Legal': ['incorporation', 'contracts', 'compliance', 'ip'],
    'Tecnología': ['development', 'architecture', 'security', 'testing'],
    'Finanzas': ['funding', 'metrics', 'forecasting', 'accounting'],
    'Marketing': ['branding', 'acquisition', 'content', 'analytics'],
    'Operaciones': ['processes', 'team', 'culture', 'systems']
  };
  
  const availableTags = tagsByArea[areaName] || ['general'];
  const tagCount = Math.floor(Math.random() * 3) + 1;
  
  return availableTags
    .sort(() => 0.5 - Math.random())
    .slice(0, tagCount);
};
```

## 7. INTEGRACIÓN CON COMPONENTES EXISTENTES

### 7.1 Patrón de Adaptación Compliance → Founder Pro
```javascript
// ADAPTADOR UNIVERSAL - Convertir cualquier componente Compliance
const createFounderAdapter = (ComplianceComponent, adaptationConfig) => {
  const FounderAdaptedComponent = (founderProps) => {
    // 1. Mapear props de Founder Pro a Compliance
    const mappedProps = mapPropsToCompliance(founderProps, adaptationConfig);
    
    // 2. Configurar theme y styling para Founder Pro
    const founderThemeProps = {
      ...mappedProps,
      theme: 'founder-pro',
      className: `${mappedProps.className || ''} founder-adapted`,
      colors: {
        primary: 'neon-green',
        secondary: 'neon-purple',
        accent: 'emerald-400',
        background: 'dark-primary'
      }
    };
    
    // 3. Adaptar handlers de eventos
    const adaptedHandlers = adaptEventHandlers(
      founderThemeProps, 
      founderProps, 
      adaptationConfig
    );
    
    // 4. Render con wrapper de Founder Pro
    return (
      <div className="founder-component-wrapper">
        {/* Header personalizado de Founder Pro */}
        {founderProps.showFounderHeader && (
          <div className="founder-header mb-4 p-4 bg-gradient-card rounded-neumorphic border border-slate-600">
            <h3 className="text-lg font-semibold text-text-dark-primary flex items-center">
              <Icon name={founderProps.headerIcon || 'Sparkles'} size={20} className="mr-2 text-neon-green" />
              {founderProps.headerTitle || 'Founder Component'}
            </h3>
            {founderProps.headerDescription && (
              <p className="text-sm text-text-dark-secondary mt-1">
                {founderProps.headerDescription}
              </p>
            )}
          </div>
        )}
        
        {/* Componente base adaptado */}
        <ComplianceComponent {...founderThemeProps} {...adaptedHandlers} />
        
        {/* Footer con insights de Founder Pro */}
        {founderProps.showFounderInsights && founderProps.insights && (
          <div className="founder-insights mt-4 p-4 bg-neon-green/10 rounded-neumorphic border border-neon-green/20">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-neon-green mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-neon-green mb-1">
                  Founder Insight
                </h4>
                <p className="text-sm text-text-dark-secondary">
                  {founderProps.insights}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Configurar PropTypes del componente adaptado
  FounderAdaptedComponent.propTypes = {
    ...ComplianceComponent.propTypes,
    showFounderHeader: PropTypes.bool,
    headerIcon: PropTypes.string,
    headerTitle: PropTypes.string,
    headerDescription: PropTypes.string,
    showFounderInsights: PropTypes.bool,
    insights: PropTypes.string
  };
  
  FounderAdaptedComponent.defaultProps = {
    ...ComplianceComponent.defaultProps,
    showFounderHeader: false,
    showFounderInsights: false
  };
  
  return FounderAdaptedComponent;
};

// Función de mapeo de props
const mapPropsToCompliance = (founderProps, config) => {
  const { propMapping = {}, dataMapping = {} } = config;
  
  const mappedProps = { ...founderProps };
  
  // Mapear props según configuración
  Object.entries(propMapping).forEach(([founderProp, complianceProp]) => {
    if (founderProps[founderProp] !== undefined) {
      mappedProps[complianceProp] = founderProps[founderProp];
      delete mappedProps[founderProp];
    }
  });
  
  // Mapear estructura de datos
  if (founderProps.data && dataMapping.transform) {
    mappedProps.data = dataMapping.transform(founderProps.data);
  }
  
  return mappedProps;
};

// Adaptar event handlers
const adaptEventHandlers = (props, originalProps, config) => {
  const { eventMapping = {} } = config;
  const adaptedHandlers = {};
  
  Object.entries(eventMapping).forEach(([complianceEvent, founderEvent]) => {
    if (originalProps[founderEvent]) {
      adaptedHandlers[complianceEvent] = (data) => {
        // Transformar datos del evento si es necesario
        const transformedData = config.eventDataTransform 
          ? config.eventDataTransform(data, complianceEvent)
          : data;
          
        originalProps[founderEvent](transformedData);
      };
    }
  });
  
  return adaptedHandlers;
};
```

### 7.2 Configuraciones de Adaptación Predefinidas
```javascript
// CONFIGURACIONES PARA ADAPTAR COMPONENTES ESPECÍFICOS
const ADAPTATION_CONFIGS = {
  'ComplianceMatrix': {
    propMapping: {
      'strategicAreas': 'departments',
      'phases': 'controls',
      'onAreaPhaseClick': 'onCellClick'
    },
    dataMapping: {
      transform: (founderData) => ({
        departments: founderData.areas || [],
        controls: founderData.phases || [],
        matrix: founderData.matrix || []
      })
    },
    eventMapping: {
      'onCellClick': 'onAreaPhaseClick'
    },
    eventDataTransform: (data, eventType) => {
      if (eventType === 'onCellClick') {
        return {
          area: data.department,
          phase: data.control
        };
      }
      return data;
    }
  },
  
  'StatusWidget': {
    propMapping: {
      'founderScore': 'score',
      'businessImpact': 'impact'
    },
    dataMapping: {
      transform: (founderData) => ({
        ...founderData,
        theme: 'founder-pro'
      })
    }
  },
  
  'TaskList': {
    propMapping: {
      'activities': 'tasks',
      'onActivityClick': 'onTaskClick'
    },
    dataMapping: {
      transform: (founderData) => ({
        tasks: founderData.activities?.map(activity => ({
          ...activity,
          type: 'founder-activity'
        })) || []
      })
    }
  }
};

// Uso de adaptación predefinida
const AdaptedComplianceMatrix = createFounderAdapter(
  ComplianceMatrix, 
  ADAPTATION_CONFIGS.ComplianceMatrix
);
```

## 8. GENERACIÓN AUTOMÁTICA DE RUTAS Y NAVEGACIÓN

### 8.1 Template de Rutas
```javascript
// TEMPLATE: Generar rutas automáticamente para módulos AC
const generateModuleRoutes = (moduleConfig) => {
  const { moduleName, moduleId, requiresAuth = true } = moduleConfig;
  
  return `
// Auto-generated routes for ${moduleName}
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy loading del módulo
const ${moduleName}Module = React.lazy(() => import('./${moduleName}Module'));

// Componentes de layout
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorBoundary from '../../components/ErrorBoundary';
${requiresAuth ? "import ProtectedRoute from '../../components/ProtectedRoute';" : ''}

const ${moduleName}Routes = () => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route 
            path="/" 
            element={
              ${requiresAuth ? `
              <ProtectedRoute>
                <${moduleName}Module />
              </ProtectedRoute>
              ` : `<${moduleName}Module />`}
            } 
          />
          <Route 
            path="/overview" 
            element={
              ${requiresAuth ? `
              <ProtectedRoute>
                <${moduleName}Module defaultTab="overview" />
              </ProtectedRoute>
              ` : `<${moduleName}Module defaultTab="overview" />`}
            } 
          />
          <Route 
            path="/timeline" 
            element={
              ${requiresAuth ? `
              <ProtectedRoute>
                <${moduleName}Module defaultTab="timeline" />
              </ProtectedRoute>
              ` : `<${moduleName}Module defaultTab="timeline" />`}
            } 
          />
          <Route 
            path="/tracker" 
            element={
              ${requiresAuth ? `
              <ProtectedRoute>
                <${moduleName}Module defaultTab="tracker" />
              </ProtectedRoute>
              ` : `<${moduleName}Module defaultTab="tracker" />`}
            } 
          />
        </Routes>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ${moduleName}Routes;
`;
};
```

### 8.2 Actualización Automática de Navigation
```javascript
// TEMPLATE: Actualizar navegación principal automáticamente
const updateMainNavigation = (moduleConfig) => {
  const { moduleName, moduleId, icon, order = 999 } = moduleConfig;
  
  const navigationEntry = {
    id: moduleId,
    name: moduleName,
    href: `/${moduleId.toLowerCase()}`,
    icon: icon || 'Package',
    order,
    category: 'founder-activities'
  };
  
  return `
// Agregar esta entrada al archivo src/navigation/founderRoutes.js
{
  id: '${navigationEntry.id}',
  name: '${navigationEntry.name}',
  href: '${navigationEntry.href}',
  icon: '${navigationEntry.icon}',
  order: ${navigationEntry.order},
  category: '${navigationEntry.category}'
}`;
};
```

## 9. CHECKLIST FINAL DE GENERACIÓN

### 9.1 Validación Pre-Deploy
```markdown
## Checklist Obligatorio - Generación de Código Founder Pro

### ✅ Estructura y Arquitectura
- [ ] Componente principal sigue template ACModuleTemplate
- [ ] Estructura de archivos correcta (components/, hooks/, utils/)
- [ ] Imports organizados según Work Rules
- [ ] PropTypes definidos para todos los componentes
- [ ] DefaultProps configurados apropiadamente

### ✅ Funcionalidad Core
- [ ] Estados estándar implementados (loading, error, data)
- [ ] Event handlers con prefijo "handle"
- [ ] Progress calculation funcional
- [ ] KPI widgets configurados
- [ ] Tab navigation implementada
- [ ] Modal de detalle funcional

### ✅ UI/UX y Styling
- [ ] Solo clases Tailwind CSS utilizadas
- [ ] Clases específicas Founder Pro aplicadas
- [ ] Efectos hover y transiciones incluidos
- [ ] Responsive design implementado
- [ ] Dark theme aplicado consistentemente

### ✅ Accesibilidad
- [ ] aria-label en elementos interactivos
- [ ] tabIndex configurado apropiadamente
- [ ] Keyboard navigation implementada
- [ ] Focus states visibles
- [ ] Screen reader friendly

### ✅ Integración y Datos
- [ ] Hook de datos personalizado creado
- [ ] Data mapper implementado
- [ ] Datos mock generados
- [ ] Adaptación de componentes existentes (si aplica)
- [ ] Error handling completo

### ✅ Testing y Calidad
- [ ] Código pasa todas las validaciones automáticas
- [ ] Quality score >= 75/100
- [ ] Loading y error states funcionan
- [ ] Empty states implementados
- [ ] No hay TODOs ni placeholders

### ✅ Documentación y Deploy
- [ ] Rutas generadas y configuradas
- [ ] Navegación actualizada
- [ ] README del módulo creado
- [ ] Tests unitarios básicos incluidos
- [ ] Performance optimizado
```

### 9.2 Comando Final de Generación
```javascript
// COMANDO MAESTRO - Ejecutar generación completa
const generateCompleteACModule = async (moduleSpec) => {
  try {
    console.log(`🚀 Iniciando generación de ${moduleSpec.moduleName}...`);
    
    // 1. Validar especificación del módulo
    validateModuleSpec(moduleSpec);
    
    // 2. Generar todos los archivos
    const generatedFiles = await generateACModule(moduleSpec);
    
    // 3. Ejecutar validaciones
    await runValidations(generatedFiles);
    
    // 4. Generar rutas y navegación
    const routes = generateModuleRoutes(moduleSpec);
    const navUpdate = updateMainNavigation(moduleSpec);
    
    // 5. Crear documentación
    const documentation = generateModuleDocumentation(moduleSpec);
    
    // 6. Preparar package para deploy
    const deployPackage = {
      ...generatedFiles,
      routes,
      navigation: navUpdate,
      documentation,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
    
    console.log(`✅ ${moduleSpec.moduleName} generado exitosamente!`);
    console.log(`📊 Quality Score: ${calculateQualityScore(deployPackage)}/100`);
    
    return deployPackage;
    
  } catch (error) {
    console.error(`❌ Error generando ${moduleSpec.moduleName}:`, error);
    throw error;
  }
};

// Uso del comando maestro
const moduleSpec = {
  moduleName: 'StrategicFundamentals',
  moduleId: 'AC-001',
  icon: 'Compass',
  strategicAreas: [
    { id: 'strategy', name: 'Estrategia', icon: 'Target' },
    { id: 'legal', name: 'Legal', icon: 'Scale' },
    { id: 'tech', name: 'Tecnología', icon: 'Code' }
  ],
  phases: [
    { id: 'ideation', name: 'Ideación', icon: 'Lightbulb' },
    { id: 'validation', name: 'Validación', icon: 'TestTube' },
    { id: 'launch', name: 'Lanzamiento', icon: 'Rocket' }
  ],
  requiresAuth: true,
  order: 1
};

generateCompleteACModule(moduleSpec)
  .then(result => console.log('Deploy package ready:', result))
  .catch(error => console.error('Generation failed:', error));
```

---

## 📋 **RESUMEN DE GENERATE RULES**

🎯 **Templates:** 5 templates principales para generación consistente  
🎯 **Transformación:** PRD → Código automático con validación  
🎯 **Adaptación:** Reutilización inteligente de componentes Compliance  
🎯 **Validación:** Checklist automático + quality score  
🎯 **Integración:** Rutas, navegación y documentación automática  

**Con estas Generate Rules, puedes crear módulos AC completos de Founder Pro de forma automática, consistente y de alta calidad.**

---

**Estado del proyecto:**
- ✅ **System Instructions** (COMPLETADO)
- ✅ **Work Rules** (COMPLETADO) 
- ✅ **Generate Rules** (COMPLETADO)
- ⏳ **Tool Definitions** (próximo)

**Siguiente paso:** Crear Tool Definitions para completar las Reglas Operativas.# GENERATE RULES - Founder Pro
**Versión:** 1.0  
**Fecha:** 20 de julio de 2025  
**Para:** Generación automática de código Founder Pro  
**Basado en:** System Instructions + Work Rules + Patrones existentes  

Estas reglas definen **cómo generar código específico** para Founder Pro, incluyendo templates, patrones y transformaciones automáticas del PRD a implementación.

## 1. METODOLOGÍA DE GENERACIÓN

### 1.1 Flujo de Generación Obligatorio
```
PRD.md → Generate Rules → Código Funcional
   ↓         ↓              ↓
Requisito → Template →   Implementación
         → Patrón →     Completa
         → Validación → Testeada
```

### 1.2 Principios de Generación
- **Template-first:** Usar templates predefinidos para consistencia
- **Pattern-based:** Seguir patrones de FounderActivityDashboard
- **Validation-driven:** Cada generación debe pasar checklist de calidad
- **Complete-output:** Generar código 100% funcional, no placeholders

## 2. TEMPLATES DE COMPONENTES

### 2.1 Template: Componente Principal de Módulo AC
```javascript
// TEMPLATE: ACModuleTemplate.jsx
// Usar para: Cualquier módulo AC nuevo (AC-001 a AC-011)

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// UI Components (OBLIGATORIO usar existentes)
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Founder Components (REUTILIZAR de founder-activity-dashboard)
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';

// AC-specific components (GENERAR según necesidad)
import AC{ModuleName}Matrix from './components/{ModuleName}Matrix';
import AC{ModuleName}Timeline from './components/{ModuleName}Timeline';
import AC{ModuleName}Tracker from './components/{ModuleName}Tracker';

// Hooks y utils
import { use{ModuleName}Data } from './hooks/use{ModuleName}Data';
import { map{ModuleName}Data } from './utils/{ModuleName}DataMapper';

const {ModuleName}Module = () => {
  // Estados estándar (OBLIGATORIO para todos los módulos)
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Datos del módulo (usar hook personalizado)
  const { data, loading, error, refresh } = use{ModuleName}Data();

  // Progreso calculado (PATRÓN OBLIGATORIO)
  const overallProgress = useMemo(() => {
    if (!data?.activities) return 0;
    const completedCount = data.activities.filter(
      activity => activity.status === 'completed'
    ).length;
    return Math.round((completedCount / data.activities.length) * 100);
  }, [data]);

  // KPI data (ADAPTAR según módulo)
  const kpiData = useMemo(() => {
    // Calcular KPIs específicos del módulo
    return {
      completedTasks: data?.activities?.filter(a => a.status === 'completed').length || 0,
      pendingTasks: data?.activities?.filter(a => a.status === 'pending').length || 0,
      criticalTasks: data?.activities?.filter(a => a.priority === 'high').length || 0
    };
  }, [data]);

  // Event handlers (PATRÓN OBLIGATORIO)
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting {ModuleName} data...');
    // TODO: Implementar exportación real
  };

  const handleRefreshData = () => {
    refresh();
  };

  // Render tab content (PATRÓN OBLIGATORIO)
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AC{ModuleName}Matrix data={data} onItemClick={handleItemClick} />;
      case 'timeline':
        return <AC{ModuleName}Timeline data={data} onItemClick={handleItemClick} />;
      case 'tracker':
        return <AC{ModuleName}Tracker data={data} />;
      default:
        return <AC{ModuleName}Matrix data={data} onItemClick={handleItemClick} />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-green"></div>
            <span className="ml-3 text-text-dark-secondary">Cargando {ModuleName}...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-12">
            <Icon name="AlertTriangle" size={48} className="text-error-dark mb-4 mx-auto" />
            <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
              Error al cargar {ModuleName}
            </h4>
            <p className="text-text-dark-secondary mb-6">
              {error.message}
            </p>
            <Button variant="outline" onClick={handleRefreshData}>
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>{ModuleName} - Founder Pro</title>
        <meta name="description" content="Gestión de {ModuleName} para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-text-dark-primary mb-2">
                {ModuleName}
              </h1>
              <p className="text-text-dark-secondary text-lg">
                Gestiona y optimiza el {ModuleName.toLowerCase()} de tu startup
              </p>
            </div>
            <Button
              variant="accent"
              icon="Download"
              onClick={handleExportData}
              className="hover:shadow-glow-neon"
            >
              Exportar Datos
            </Button>
          </div>

          <ProgressHeader progress={overallProgress} />
        </div>

        {/* KPI Widgets */}
        <KPIWidgets data={kpiData} />

        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          tabs={[
            { id: 'overview', label: 'Visión General' },
            { id: 'timeline', label: 'Cronograma' },
            { id: 'tracker', label: 'Seguimiento' }
          ]}
        />

        {/* Tab Content */}
        <div className="mt-8">
          {renderTabContent()}
        </div>

        {/* Detail Modal */}
        <ActivityDetailModal
          activity={selectedItem}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      </div>
    </div>
  );
};

{ModuleName}Module.propTypes = {
  // Props específicas si las hay
};

export default {ModuleName}Module;