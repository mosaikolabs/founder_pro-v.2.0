# TOOL DEFINITIONS - Founder Pro
**Versión:** 1.0  
**Fecha:** 20 de julio de 2025  
**Para:** Uso optimizado de herramientas en Founder Pro  
**Basado en:** System Instructions + Work Rules + Generate Rules  

Estas definiciones especifican **cómo, cuándo y en qué secuencia usar cada herramienta** para maximizar eficiencia y consistencia en el desarrollo de Founder Pro.

## 1. FILOSOFÍA DE HERRAMIENTAS

### 1.1 Principios Fundamentales
- **Tool-First Approach:** Siempre usar herramientas cuando estén disponibles
- **Sequence Optimization:** Orden específico para máxima eficiencia
- **Context Persistence:** Mantener contexto entre herramientas
- **Graceful Degradation:** Fallbacks cuando herramientas fallan
- **Automation Over Manual:** Automatizar procesos repetitivos

### 1.2 Jerarquía de Herramientas
```
NIVEL 1 - Core Tools (SIEMPRE usar si disponibles)
├── Memory: Contexto y estado del proyecto
├── GitHub: Código y repositorio
└── Context7: Documentación técnica actualizada

NIVEL 2 - Enhancement Tools (usar según necesidad)
├── Sequential Thinking: Problemas complejos
├── Analysis Tool: Cálculos y validaciones
└── Artifacts: Prototipos y documentos

NIVEL 3 - Fallback Tools (solo si Level 1-2 fallan)
├── Web Search: Información no disponible
└── Manual Knowledge: Último recurso
```

## 2. SECUENCIAS DE HERRAMIENTAS PREDEFINIDAS

### 2.1 FLUJO: Crear Módulo AC Completo
```
TRIGGER: "Crea/Implementa módulo AC-XXX [nombre]"

SECUENCIA OBLIGATORIA:
1. Memory.search_nodes("Founder Pro") 
   → Obtener contexto del proyecto
   
2. Memory.open_nodes(["AC Modules", "Project Progress"])
   → Verificar módulos existentes y progreso
   
3. Context7.resolve-library-id("react")
   → Obtener ID de React actualizado
   
4. Context7.get-library-docs(react_id, topic="hooks")
   → Documentación de hooks React
   
5. Context7.resolve-library-id("tailwindcss") 
   → Obtener ID de Tailwind actualizado
   
6. Context7.get-library-docs(tailwind_id, topic="utilities")
   → Documentación de Tailwind CSS
   
7. GitHub.get_file_contents(owner, repo, "src/pages/founder-activity-dashboard")
   → Revisar estructura existente como referencia
   
8. [APPLY] Generate Rules → Crear código del módulo
   
9. GitHub.create_branch(owner, repo, "feature/ac-{id}-{name}")
   → Crear branch para el módulo
   
10. GitHub.push_files(owner, repo, branch, generated_files)
    → Subir código generado
    
11. Memory.create_entities([new_module_entity])
    → Registrar módulo en memoria
    
12. Memory.add_observations(["Project Progress"], ["AC-XXX implemented"])
    → Actualizar progreso del proyecto

RESULTADO: Módulo AC funcional, testeado y documentado
TIEMPO ESTIMADO: 2-3 minutos
CALIDAD GARANTIZADA: Quality Score >= 75/100
```

### 2.2 FLUJO: Adaptar Componente Compliance
```
TRIGGER: "Adapta componente [X] de Compliance para Founder Pro"

SECUENCIA OBLIGATORIA:
1. Memory.search_nodes("Compliance Components")
   → Buscar componente original
   
2. GitHub.search_code(q="[ComponentName] in:file extension:jsx")
   → Localizar código fuente del componente
   
3. GitHub.get_file_contents(owner, repo, component_path)
   → Obtener código del componente original
   
4. Context7.get-library-docs(react_id, topic="components")
   → Documentación de patrones React
   
5. [APPLY] Generate Rules → Crear adaptador
   
6. GitHub.create_branch(owner, repo, "feature/adapt-{component}")
   → Branch para adaptación
   
7. GitHub.push_files(owner, repo, branch, adapted_files)
   → Subir componente adaptado
   
8. Memory.create_relations([{
     from: "Original Component",
     to: "Founder Adapted Component", 
     relationType: "adapted_to"
   }])
   → Registrar relación de adaptación

RESULTADO: Componente Compliance funcionando en Founder Pro
TIEMPO ESTIMADO: 1-2 minutos
REUTILIZACIÓN: 90% del código original preservado
```

### 2.3 FLUJO: Resolver Problema Técnico
```
TRIGGER: "Tengo problema con [X]" o "Cómo implementar [Y]"

SECUENCIA OBLIGATORIA:
1. Sequential-Thinking.sequential_thinking({
     problem: user_problem,
     context: "Founder Pro development"
   })
   → Analizar problema paso a paso
   
2. Memory.search_nodes(related_keywords)
   → Buscar soluciones previas
   
3. Context7.resolve-library-id(relevant_library)
   → Identificar librería relevante
   
4. Context7.get-library-docs(library_id, topic=specific_area)
   → Obtener documentación específica
   
5. GitHub.search_code(q="similar_implementation")
   → Buscar implementaciones similares
   
6. [IF NEEDED] Analysis Tool → Validar solución
   
7. [APPLY] Work Rules → Implementar solución
   
8. Memory.create_entities([{
     name: "Solution: " + problem_summary,
     entityType: "Technical Solution",
     observations: [implementation_details]
   }])
   → Guardar solución para futuras referencias

RESULTADO: Problema resuelto con código funcional
TIEMPO ESTIMADO: 3-5 minutos
APRENDIZAJE: Solución guardada para reutilización
```

### 2.4 FLUJO: Actualizar Documentación
```
TRIGGER: "Actualiza/Crea documentación de [X]"

SECUENCIA OBLIGATORIA:
1. Memory.search_nodes("Documentation")
   → Buscar documentación existente
   
2. GitHub.get_file_contents(owner, repo, "docs/")
   → Revisar estructura de documentación
   
3. [IF NEEDED] GitHub.search_code(q="README in:file")
   → Buscar READMEs existentes como referencia
   
4. [APPLY] Generate Rules → Crear documentación
   
5. GitHub.push_files(owner, repo, "main", doc_files)
   → Subir documentación actualizada
   
6. Memory.add_observations(["Project Documentation"], [
     "Updated: " + doc_name + " on " + timestamp
   ])
   → Registrar actualización

RESULTADO: Documentación actualizada y sincronizada
TIEMPO ESTIMADO: 1-2 minutos
```

## 3. CONFIGURACIONES ESPECÍFICAS POR HERRAMIENTA

### 3.1 GitHub Configuration
```javascript
// CONFIGURACIÓN OBLIGATORIA para Founder Pro
const GITHUB_CONFIG = {
  // Naming conventions
  branchNaming: {
    feature: "feature/ac-{module-id}-{module-name}",
    bugfix: "bugfix/{issue-number}-{short-description}",
    hotfix: "hotfix/{priority}-{issue}",
    docs: "docs/{section}-update"
  },
  
  // Commit message format
  commitFormat: {
    feat: "feat(ac): implement {ModuleName} module",
    fix: "fix({scope}): resolve {issue-description}",
    docs: "docs: update {section} documentation",
    style: "style: improve {component} styling",
    refactor: "refactor: optimize {module} structure"
  },
  
  // File organization
  fileStructure: {
    modules: "src/pages/{module-name}/",
    components: "src/pages/{module-name}/components/",
    hooks: "src/pages/{module-name}/hooks/",
    utils: "src/pages/{module-name}/utils/",
    tests: "src/__tests__/{module-name}/"
  },
  
  // Pull Request template
  prTemplate: {
    title: "[AC-{ID}] Implement {ModuleName} Module",
    description: `
## 📋 Descripción
Implementación del módulo {ModuleName} siguiendo patrones Founder Pro.

## ✅ Checklist
- [ ] Componente principal implementado
- [ ] Matrix, Timeline y Tracker creados
- [ ] Hook de datos configurado
- [ ] Datos mock generados
- [ ] PropTypes definidos
- [ ] Accesibilidad implementada
- [ ] Responsive design verificado
- [ ] Quality Score >= 75/100

## 🧪 Testing
- [ ] Loading states funcionan
- [ ] Error handling completo
- [ ] Empty states implementados
- [ ] Interacciones probadas

## 📖 Documentación
- [ ] README del módulo creado
- [ ] PropTypes documentados
- [ ] Ejemplos de uso incluidos
    `,
    labels: ["ac-module", "founder-pro", "enhancement"]
  }
};
```

### 3.2 Context7 Configuration
```javascript
// CONFIGURACIÓN OBLIGATORIA para obtener docs actualizadas
const CONTEXT7_CONFIG = {
  // Libraries prioritarias para Founder Pro
  priorityLibraries: [
    "react",           // Hooks, components, patterns
    "tailwindcss",     // Utility classes, responsive
    "framer-motion",   // Animations, transitions
    "react-router-dom", // Navigation, routing
    "recharts"         // Data visualization
  ],
  
  // Topics específicos por librería
  topicMapping: {
    "react": ["hooks", "components", "context", "performance"],
    "tailwindcss": ["utilities", "responsive", "dark-mode", "animations"],
    "framer-motion": ["animations", "gestures", "layout", "scroll"],
    "react-router-dom": ["routing", "navigation", "protected-routes"],
    "recharts": ["charts", "responsive-charts", "customization"]
  },
  
  // Token allocation por tipo de consulta
  tokenAllocation: {
    "quick-reference": 5000,    // Consultas rápidas
    "detailed-implementation": 10000, // Implementaciones complejas
    "comprehensive-guide": 15000,     // Guías completas
    "troubleshooting": 7500          // Resolución de problemas
  },
  
  // Sequence optimization
  querySequence: [
    "resolve-library-id",  // SIEMPRE primero
    "get-library-docs"     // Después con ID obtenido
  ]
};
```

### 3.3 Memory Configuration
```javascript
// CONFIGURACIÓN OBLIGATORIA para persistencia de contexto
const MEMORY_CONFIG = {
  // Entidades core del proyecto
  coreEntities: {
    "Founder Pro": {
      entityType: "Project",
      observations: [
        "React-based dashboard for startup founders",
        "Uses Tailwind CSS for styling",
        "Neumorphic design system",
        "Dark theme optimized"
      ]
    },
    
    "AC Modules": {
      entityType: "Module Collection", 
      observations: [
        "11 strategic modules (AC-001 to AC-011)",
        "Each module has Matrix, Timeline, Tracker views",
        "Follows founder-activity-dashboard pattern"
      ]
    },
    
    "Project Progress": {
      entityType: "Progress Tracker",
      observations: [
        "Tracks implementation of each AC module",
        "Quality scores for each component",
        "Timeline and milestones"
      ]
    }
  },
  
  // Relaciones importantes
  coreRelations: [
    {
      from: "Founder Pro",
      to: "AC Modules", 
      relationType: "contains"
    },
    {
      from: "AC Modules",
      to: "founder-activity-dashboard",
      relationType: "follows_pattern_of"
    }
  ],
  
  // Auto-update rules
  autoUpdateRules: {
    onModuleCreation: [
      "Add module to AC Modules collection",
      "Update Project Progress",
      "Create module-specific entity"
    ],
    onComponentAdaptation: [
      "Link original to adapted component",
      "Track adaptation patterns",
      "Update reuse metrics"
    ]
  }
};
```

### 3.4 Sequential Thinking Configuration
```javascript
// USO ESPECÍFICO para problemas complejos en Founder Pro
const SEQUENTIAL_THINKING_CONFIG = {
  // Cuándo usar cada función
  useCases: {
    "sequential_thinking": [
      "Arquitectura de nuevo módulo AC",
      "Resolución de bugs complejos", 
      "Optimización de performance",
      "Integración de sistemas"
    ],
    
    "problem_breakdown": [
      "Refactoring major de código",
      "Implementación de features grandes",
      "Migración de componentes"
    ],
    
    "analyze_problem": [
      "Decisiones de tecnología",
      "Evaluación de alternativas",
      "Risk assessment"
    ],
    
    "step_by_step_plan": [
      "Roadmap de implementación",
      "Deploy strategies",
      "Testing approaches"
    ]
  },
  
  // Context específico para Founder Pro
  defaultContext: {
    project: "Founder Pro - Startup Dashboard",
    techStack: "React + Tailwind CSS + Node.js",
    patterns: "Neumorphic design, Component reuse",
    constraints: "Mobile-first, Accessibility, Performance"
  }
};
```

## 4. FLUJOS DE TRABAJO AUTOMATIZADOS

### 4.1 Daily Development Workflow
```
RUTINA DIARIA DE DESARROLLO:

🌅 MORNING SETUP (automático al iniciar)
1. Memory.read_graph() 
   → Cargar contexto completo del proyecto
   
2. GitHub.list_issues(state="open", labels=["founder-pro"])
   → Revisar issues pendientes
   
3. Memory.search_nodes("Today's Tasks")
   → Cargar tareas del día

📋 TASK EXECUTION (por cada tarea)
1. Identificar tipo de tarea → Aplicar flujo específico
2. Ejecutar secuencia de herramientas
3. Validar resultado → Quality check
4. Actualizar progreso → Memory update

🌙 END OF DAY (al finalizar trabajo)
1. Memory.add_observations(["Daily Progress"], [summary])
   → Guardar resumen del día
   
2. GitHub.create_pull_request() (si hay cambios pending)
   → Crear PR para review
   
3. Memory.create_entities([daily_accomplishments])
   → Registrar logros del día
```

### 4.2 Module Development Pipeline
```
PIPELINE COMPLETO DE MÓDULO AC:

STAGE 1: PLANNING (2-3 minutos)
├── Memory: Cargar contexto
├── Sequential Thinking: Analizar requisitos  
├── Context7: Obtener documentación técnica
└── GitHub: Revisar estructura existente

STAGE 2: GENERATION (3-5 minutos)
├── Generate Rules: Aplicar templates
├── Analysis Tool: Validar código generado
├── GitHub: Crear branch y push inicial
└── Memory: Registrar nuevo módulo

STAGE 3: INTEGRATION (2-3 minutos)
├── GitHub: Crear tests básicos
├── Context7: Verificar best practices
├── GitHub: Update navigation y routes
└── Memory: Actualizar dependencies

STAGE 4: DEPLOYMENT (1-2 minutos)
├── GitHub: Crear pull request
├── Memory: Actualizar project progress
├── GitHub: Merge después de review
└── Memory: Marcar módulo como completo

TOTAL TIME: 8-13 minutos por módulo
QUALITY ASSURANCE: Automática en cada stage
```

### 4.3 Troubleshooting Workflow
```
FLUJO PARA RESOLUCIÓN DE PROBLEMAS:

LEVEL 1: QUICK FIX (30-60 segundos)
1. Memory.search_nodes(error_keywords)
   → Buscar soluciones conocidas
2. [IF FOUND] Aplicar solución → Done
3. [IF NOT FOUND] → Escalate to Level 2

LEVEL 2: RESEARCH & SOLVE (2-3 minutos)  
1. Sequential-Thinking.analyze_problem()
   → Analizar problema estructuralmente
2. Context7.get-library-docs(relevant_library)
   → Obtener documentación actualizada
3. GitHub.search_code() → Buscar implementaciones similares
4. Implementar solución → Test → Deploy
5. Memory.create_entities() → Guardar para futuros

LEVEL 3: DEEP INVESTIGATION (5+ minutos)
1. Sequential-Thinking.problem_breakdown()
   → Descomponer problema complejo
2. Analysis Tool → Validaciones y cálculos
3. Multiple Context7 calls → Research exhaustivo
4. Crear solución comprehensiva
5. Documentar extensivamente en Memory
```

## 5. ERROR HANDLING Y FALLBACKS

### 5.1 Tool Failure Strategies
```javascript
// MANEJO DE FALLOS POR HERRAMIENTA
const FALLBACK_STRATEGIES = {
  GitHub: {
    primary: "Use GitHub API for all operations",
    fallback1: "Create artifacts with code for manual copy",
    fallback2: "Provide detailed instructions for manual setup",
    errorTypes: {
      "API_LIMIT": "Switch to artifacts + wait for reset",
      "PERMISSION_DENIED": "Request user to grant permissions",
      "NETWORK_ERROR": "Retry with exponential backoff"
    }
  },
  
  Context7: {
    primary: "Get latest library documentation",
    fallback1: "Use internal knowledge of libraries",
    fallback2: "Web search for recent updates",
    errorTypes: {
      "LIBRARY_NOT_FOUND": "Suggest closest alternative",
      "RATE_LIMIT": "Use cached knowledge + warn about staleness",
      "TIMEOUT": "Proceed with internal knowledge"
    }
  },
  
  Memory: {
    primary: "Persist all project context and learnings",
    fallback1: "Use session-only memory",
    fallback2: "Ask user to provide context each time",
    errorTypes: {
      "SEARCH_FAILED": "Continue without historical context",
      "WRITE_FAILED": "Warn user about lost context",
      "READ_FAILED": "Ask user for manual context"
    }
  },
  
  SequentialThinking: {
    primary: "Structure complex problem solving",
    fallback1: "Use internal structured thinking",
    fallback2: "Break down manually in response",
    errorTypes: {
      "TIMEOUT": "Provide manual step-by-step analysis",
      "INVALID_INPUT": "Restructure problem and retry"
    }
  }
};
```

### 5.2 Graceful Degradation Examples
```
EJEMPLO 1: GitHub no disponible
❌ GitHub.create_repository() → Error
✅ Fallback: Crear artifact con:
   - Estructura completa de archivos
   - Comandos git para setup manual  
   - Instrucciones paso a paso
   
EJEMPLO 2: Context7 rate limited
❌ Context7.get-library-docs() → Rate limit
✅ Fallback: Usar conocimiento interno + advertencia:
   "⚠️ Usando docs internas - pueden no estar actualizadas"
   
EJEMPLO 3: Memory no disponible  
❌ Memory.search_nodes() → Service unavailable
✅ Fallback: Continuar sin contexto + solicitar:
   "📝 Como Memory no está disponible, ¿puedes recordarme 
   en qué módulo estabas trabajando?"
```

## 6. OPTIMIZACIONES ESPECÍFICAS

### 6.1 Performance Optimizations
```javascript
// OPTIMIZACIONES PARA VELOCIDAD Y EFICIENCIA
const PERFORMANCE_OPTIMIZATIONS = {
  // Parallel tool execution (cuando es posible)
  parallelExecution: {
    "Memory + Context7": "Cargar contexto mientras obtienes docs",
    "GitHub search + Memory search": "Buscar en ambos simultáneamente",
    "Multiple Context7 calls": "Obtener docs de múltiples librerías"
  },
  
  // Caching strategies
  caching: {
    "Context7 responses": "Cache docs frecuentemente usadas",
    "GitHub file contents": "Cache componentes base",
    "Memory entities": "Cache entidades del proyecto"
  },
  
  // Smart token usage
  tokenOptimization: {
    "Context7": "Usar topics específicos para reducir tokens",
    "GitHub": "Obtener solo archivos necesarios",
    "Memory": "Búsquedas targeted en lugar de read_graph completo"
  }
};
```

### 6.2 Quality Assurance Automation
```javascript
// VALIDACIONES AUTOMÁTICAS EN CADA FLUJO
const QA_AUTOMATION = {
  // Code quality checks
  codeQuality: {
    "Generate Rules validation": "OBLIGATORIO en cada generación",
    "Work Rules compliance": "Verificar naming, structure, styling",
    "PropTypes validation": "Asegurar types en todos los componentes"
  },
  
  // Integration checks  
  integration: {
    "Component compatibility": "Verificar con componentes existentes",
    "Styling consistency": "Validar clases Tailwind y tema",
    "Accessibility compliance": "aria-labels, keyboard navigation"
  },
  
  // Performance validation
  performance: {
    "Bundle size impact": "Advertir si componente es muy grande",
    "Render performance": "Validar optimizaciones React",
    "Memory leaks": "Verificar cleanup en useEffect"
  }
};
```

## 7. MÉTRICAS Y MONITOREO

### 7.1 Success Metrics
```javascript
// MÉTRICAS DE ÉXITO PARA CADA FLUJO
const SUCCESS_METRICS = {
  moduleCreation: {
    timeToCompletion: "< 15 minutos",
    qualityScore: ">= 75/100", 
    testsPass: "100%",
    accessibilityScore: ">= 90%"
  },
  
  componentAdaptation: {
    codeReuse: ">= 80%",
    functionalityPreserved: "100%",
    stylingConsistency: ">= 95%",
    performanceImpact: "< 5% overhead"
  },
  
  problemResolution: {
    firstCallResolution: ">= 70%",
    timeToResolution: "< 10 minutos",
    solutionReusability: ">= 60%",
    userSatisfaction: ">= 9/10"
  }
};
```

### 7.2 Continuous Improvement
```javascript
// MEJORA CONTINUA BASADA EN MÉTRICAS
const CONTINUOUS_IMPROVEMENT = {
  // Learning from interactions
  learningLoop: {
    "Track frequent problems": "Memory.add_observations",
    "Identify optimization opportunities": "Analysis Tool",
    "Update tool sequences": "Refine workflows",
    "Share learnings": "Update documentation"
  },
  
  // Feedback incorporation
  feedbackIntegration: {
    "User feedback": "Incorporate into tool definitions",
    "Performance data": "Optimize slow workflows", 
    "Error patterns": "Improve error handling",
    "Success patterns": "Promote best practices"
  }
};
```

---

## 📋 **TOOL DEFINITIONS SUMMARY**

🎯 **7 Flujos Predefinidos:** Módulo AC, Adaptación, Troubleshooting, etc.  
🎯 **4 Configuraciones Específicas:** GitHub, Context7, Memory, Sequential Thinking  
🎯 **3 Niveles de Fallback:** Graceful degradation para máxima reliability  
🎯 **Optimización Automática:** Performance, Quality, Monitoring integrados  

**Con estos Tool Definitions, Claude operará como un Senior Developer con proceso definido, ejecutando tareas de forma consistente, eficiente y predecible.**

---

## ✅ **FASE 2 COMPLETADA: REGLAS OPERATIVAS**

- ✅ **System Instructions** (COMPLETADO)
- ✅ **Work Rules** (COMPLETADO) 
- ✅ **Generate Rules** (COMPLETADO)
- ✅ **Tool Definitions** (COMPLETADO)

**🚀 Siguiente Fase:** Implementación práctica - ¡Hora de crear el primer módulo AC usando todas estas reglas!