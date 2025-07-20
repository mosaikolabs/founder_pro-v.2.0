# Context Management Rules - Founder Pro
**Versión:** 1.0  
**Fecha:** 20 de julio de 2025  
**Propósito:** Optimización y gestión inteligente del contexto para máxima eficiencia  
**Framework:** Ingeniería de Contexto - Fase 5  

Estas reglas definen **cómo gestionar, comprimir y optimizar el contexto** para mantener eficiencia máxima mientras se preserva información crítica del proyecto.

---

## 🧠 **FILOSOFÍA DE GESTIÓN DE CONTEXTO**

### **Principios Fundamentales:**
- **Information Hierarchy:** No toda información tiene la misma importancia
- **Context Compression:** Mantener esencia, eliminar redundancia
- **Smart Prioritization:** Información más reciente y relevante tiene prioridad
- **Graceful Degradation:** Sistema debe funcionar con contexto limitado
- **Active Memory Management:** Contexto es un recurso que se debe gestionar activamente

### **Niveles de Información:**
```
NIVEL 1 - CRÍTICO (Always Keep)
├── Decisiones arquitectónicas fundamentales
├── Constraints y limitaciones no negociables
├── Patterns y templates validados
└── Success criteria y quality standards

NIVEL 2 - IMPORTANTE (Keep When Possible)
├── Learnings y best practices específicos
├── Configuraciones de herramientas
├── Workflows y sequences optimizadas
└── Context de colaboración actual

NIVEL 3 - ÚTIL (Compress/Summarize)
├── Detalles de implementación específicos
├── Conversaciones de brainstorming
├── Iteraciones y refinements menores
└── Examples y casos de uso detallados

NIVEL 4 - PRESCINDIBLE (Archive/Remove)
├── Debug sessions temporales
├── Experiments fallidos
├── Conversaciones off-topic
└── Information duplicada
```

---

## 📏 **LÍMITES DE CONTEXTO Y UMBRALES**

### **Context Window Management:**
```javascript
const CONTEXT_LIMITS = {
  // Token limits por tipo de sesión
  shortSession: 32000,      // Tareas específicas
  mediumSession: 64000,     // Desarrollo de módulos
  longSession: 128000,      // Planning y architecture
  
  // Reservas obligatorias
  systemInstructions: 8000,   // Siempre incluir
  currentTask: 4000,          // Context inmediato
  recentHistory: 8000,        // Últimas decisiones
  emergencyBuffer: 4000,      // Para unexpected complexity
  
  // Distribution óptima
  frameworks: 30,             // % para documentos framework
  currentWork: 40,            // % para trabajo actual
  history: 20,                // % para context histórico
  buffer: 10                  // % reserva para flexibilidad
};
```

### **Trigger Points para Context Management:**
- **80% de límite:** Iniciar compression preventiva
- **90% de límite:** Compression agresiva automática
- **95% de límite:** Emergency context reduction
- **100% de límite:** Activar graceful degradation mode

---

## 🔄 **ESTRATEGIAS DE COMPRESIÓN**

### **1. Hierarchical Compression**
```markdown
ANTES (Verbose):
## Decision: React vs Vue
**Context:** Evaluating frontend frameworks for Founder Pro
**Options Considered:** 
- React: Pros [detailed list], Cons [detailed list]
- Vue: Pros [detailed list], Cons [detailed list]  
- Angular: Pros [detailed list], Cons [detailed list]
**Discussion:** [5 paragraphs of detailed discussion]
**Decision:** React 18.2.0
**Rationale:** [3 paragraphs explaining why]

DESPUÉS (Compressed):
**DECISION:** React 18.2.0 for Founder Pro
**REASON:** Better ecosystem + hooks performance + team familiarity
**DATE:** 2025-07-20
**STATUS:** Confirmed, implemented
```

### **2. Pattern-Based Summarization**
```markdown
ANTES (Multiple Examples):
Example 1: useFounderData hook pattern...
Example 2: useStrategyData hook pattern...
Example 3: useLegalData hook pattern...

DESPUÉS (Pattern Summary):
**PATTERN:** Custom Data Hooks
**TEMPLATE:** const use[Module]Data = (id) => { useState, useEffect, return {data, loading, error, refresh} }
**USAGE:** Applied to all AC modules
**VALIDATION:** Proven in founder-activity-dashboard
```

### **3. Timeline Compression**
```markdown
ANTES (Detailed Timeline):
10:00 - Started discussing project vision
10:15 - Refined scope to 11 modules  
10:30 - Decided on React architecture
10:45 - Chose Tailwind CSS for styling
[continues with 20+ timestamps]

DESPUÉS (Milestone Summary):
**SESSION_001 OUTCOMES:**
- Scope: 11 AC modules dashboard
- Tech: React + Tailwind + Neumorphic
- Strategy: Adapter pattern for component reuse  
- Process: Framework-first development
- Status: Framework 85% complete, ready for implementation
```

---

## 🎯 **PRIORITIZATION MATRICES**

### **Information Priority Matrix:**
```
                HIGH RELEVANCE    LOW RELEVANCE
HIGH FREQUENCY  │ ALWAYS KEEP   │ COMPRESS     │
                │ Core patterns │ Examples     │
                │ Active work   │ Minor details│
                ├───────────────┼──────────────┤
LOW FREQUENCY   │ SUMMARIZE     │ ARCHIVE      │
                │ Key decisions │ Old experiments│
                │ Major learnings│ Debug sessions│
```

### **Document Priority for Context Loading:**
```javascript
const DOCUMENT_PRIORITY = {
  // Tier 1: Always load (CRITICAL)
  tier1: [
    'system-instructions.md',    // How Claude should behave
    'work-rules.md',             // Daily development rules
    'global-state.json',         // Current project state
    'project-memory.md'          // Key decisions and patterns
  ],
  
  // Tier 2: Load when relevant (IMPORTANT)  
  tier2: [
    'tool-definitions.md',       // When using tools
    'generate-rules.md',         // When generating code
    '.claude.md',                // When coding
    'chat-history.md'            // For session continuity
  ],
  
  // Tier 3: Load on demand (USEFUL)
  tier3: [
    'PRD.md',                    // For vision questions
    'ui-ux-guidelines.md',       // For design questions
    'implementation-plan.md',    // For planning questions
    'bug-tracking.md'            // For quality issues
  ],
  
  // Tier 4: Reference only (ARCHIVE)
  tier4: [
    'project-structure.md',      // Stable, rarely changes
    'evaluation-criteria.md'     // For reviews only
  ]
};
```

---

## 📋 **CONTEXT LOADING SEQUENCES**

### **Sequence 1: New Session Startup**
```markdown
CONTEXT LOADING PRIORITY:
1. system-instructions.md (FULL) - Claude behavior
2. global-state.json (FULL) - Current status  
3. work-rules.md (COMPRESSED) - Key patterns only
4. project-memory.md (RECENT) - Last 30 days of decisions
5. chat-history.md (LAST SESSION) - Immediate context
6. [Load others on demand based on task]

ESTIMATED TOKENS: ~25,000 (75% of typical session)
REMAINING CAPACITY: ~7,000 for active work
```

### **Sequence 2: Development Task**
```markdown
CONTEXT LOADING PRIORITY:
1. system-instructions.md (COMPRESSED)
2. global-state.json (CURRENT_TASK section only)
3. work-rules.md (FULL) - Need all development rules
4. generate-rules.md (RELEVANT_TEMPLATES) - For the specific task
5. .claude.md (ARCHITECTURE_ONLY) - Technical context
6. tool-definitions.md (SPECIFIC_WORKFLOW) - For task type

ESTIMATED TOKENS: ~20,000 (60% of session)
REMAINING CAPACITY: ~12,000 for implementation
```

### **Sequence 3: Planning/Architecture Session**
```markdown
CONTEXT LOADING PRIORITY:
1. system-instructions.md (FULL)
2. PRD.md (FULL) - Need complete vision
3. project-memory.md (FULL) - All key decisions
4. global-state.json (FULL) - Complete status
5. implementation-plan.md (CURRENT_PHASE)
6. chat-history.md (LAST_3_SESSIONS)

ESTIMATED TOKENS: ~30,000 (90% of session)
REMAINING CAPACITY: ~2,000 for planning work
```

---

## 🔧 **AUTOMATED COMPRESSION RULES**

### **Auto-Compression Triggers:**
```javascript
const AUTO_COMPRESSION_RULES = {
  // Time-based compression
  age_30_days: "compress_to_summary",
  age_90_days: "compress_to_key_points",
  age_1_year: "archive_with_search_tags",
  
  // Size-based compression  
  document_over_10k_tokens: "compress_examples_keep_patterns",
  document_over_20k_tokens: "compress_to_essential_info_only",
  
  // Frequency-based compression
  not_accessed_30_days: "move_to_tier_lower",
  accessed_daily: "keep_full_context",
  
  // Relevance-based compression
  superseded_by_newer_version: "archive_old_version",
  pattern_established_and_validated: "compress_to_pattern_summary"
};
```

### **Smart Summarization Patterns:**
```markdown
PATTERN: Decision Documentation
BEFORE: [Long discussion] → [Multiple options] → [Detailed analysis] → [Decision] → [Rationale]
AFTER: **DECISION:** [What] **REASON:** [Why] **DATE:** [When] **STATUS:** [Current]

PATTERN: Implementation Details  
BEFORE: [Step-by-step process] → [Code examples] → [Variations] → [Edge cases]
AFTER: **PATTERN:** [Template] **USAGE:** [When to use] **RESULT:** [Outcome]

PATTERN: Conversation History
BEFORE: [Full transcript] → [Back and forth] → [Multiple topics]
AFTER: **OUTCOMES:** [Decisions] **CONTEXT:** [Key background] **NEXT:** [Actions]
```

---

## 📊 **CONTEXT QUALITY METRICS**

### **Efficiency Metrics:**
```javascript
const CONTEXT_METRICS = {
  // Token efficiency
  informationDensity: tokens_used / information_conveyed,
  compressionRatio: original_size / compressed_size,
  retrievalSpeed: time_to_find_relevant_info,
  
  // Quality metrics
  completenessScore: critical_info_preserved / total_critical_info,
  accuracyScore: correct_info / total_info,
  relevanceScore: useful_info / total_info_loaded,
  
  // Usage metrics
  accessFrequency: times_accessed / time_period,
  updateFrequency: times_updated / time_period,
  searchSuccess: successful_searches / total_searches
};
```

### **Quality Targets:**
```
EXCELLENT (90-100%):
├── Information Density: >80 info units per 1000 tokens
├── Compression Ratio: >3:1 without loss
├── Retrieval Speed: <5 seconds to find info
└── Completeness: >95% critical info preserved

GOOD (70-89%):
├── Information Density: 60-80 info units per 1000 tokens  
├── Compression Ratio: 2-3:1 with minimal loss
├── Retrieval Speed: 5-15 seconds
└── Completeness: 85-95% critical info preserved

ACCEPTABLE (50-69%):
├── Information Density: 40-60 info units per 1000 tokens
├── Compression Ratio: 1.5-2:1 with acceptable loss  
├── Retrieval Speed: 15-30 seconds
└── Completeness: 70-85% critical info preserved
```

---

## 🚀 **OPTIMIZATION STRATEGIES**

### **1. Progressive Loading**
```markdown
STAGE 1 - IMMEDIATE (0-5 seconds):
Load critical context for current task
├── System instructions (compressed)
├── Current task context
├── Immediate history (last action)
└── Essential patterns for task

STAGE 2 - BACKGROUND (5-15 seconds):
Load supporting context  
├── Related documentation
├── Recent decisions
├── Tool configurations
└── Quality standards

STAGE 3 - ON-DEMAND (15+ seconds):
Load detailed context only when needed
├── Full documentation
├── Historical conversations  
├── Detailed examples
└── Archive materials
```

### **2. Smart Caching**
```javascript
const CACHING_STRATEGY = {
  // Cache frequently accessed info
  hotCache: {
    duration: "session_length",
    items: ["current_patterns", "active_decisions", "tool_configs"]
  },
  
  // Cache medium frequency info
  warmCache: {
    duration: "24_hours", 
    items: ["recent_learnings", "project_status", "team_context"]
  },
  
  // Cache infrequently accessed info
  coldCache: {
    duration: "7_days",
    items: ["historical_decisions", "archived_patterns", "old_examples"]
  }
};
```

### **3. Context Prediction**
```markdown
PREDICTIVE LOADING BASED ON PATTERNS:

IF task_type = "implement_AC_module"
THEN preload: [generate-rules.md, work-rules.md, tool-definitions.md]

IF task_type = "architectural_decision"  
THEN preload: [project-memory.md, PRD.md, implementation-plan.md]

IF task_type = "debugging_issue"
THEN preload: [bug-tracking.md, .claude.md, chat-history.md]

IF task_type = "documentation_update"
THEN preload: [relevant_docs, global-state.json, context-management.md]
```

---

## 🔍 **SEARCH AND RETRIEVAL OPTIMIZATION**

### **Smart Search Strategies:**
```markdown
SEARCH HIERARCHY:
1. **Exact Match:** Look for exact terms in tier 1 documents
2. **Semantic Match:** Related concepts in tier 2 documents  
3. **Pattern Match:** Similar patterns in tier 3 documents
4. **Historical Match:** Archive search in tier 4 documents

SEARCH OPTIMIZATION:
├── Use document tags and categories
├── Prioritize recent and frequently accessed
├── Weight by document importance tier
└── Return summary + link to full context
```

### **Context Tags System:**
```javascript
const CONTEXT_TAGS = {
  // Functional tags
  'architecture': ['react', 'tailwind', 'neumorphic', 'components'],
  'process': ['workflow', 'tools', 'sequence', 'validation'],
  'quality': ['testing', 'accessibility', 'performance', 'standards'],
  
  // Temporal tags  
  'current': ['active', 'in-progress', 'immediate'],
  'recent': ['last-week', 'last-month', 'this-quarter'],
  'historical': ['archive', 'superseded', 'reference-only'],
  
  // Priority tags
  'critical': ['must-know', 'blocking', 'high-impact'],
  'important': ['should-know', 'relevant', 'medium-impact'], 
  'optional': ['nice-to-know', 'background', 'low-impact']
};
```

---

## 🛡️ **GRACEFUL DEGRADATION STRATEGIES**

### **Context Reduction Levels:**
```markdown
LEVEL 1 - MINOR REDUCTION (90% → 80%):
├── Compress examples to patterns
├── Summarize lengthy discussions
├── Remove duplicate information
└── Archive outdated details

LEVEL 2 - MODERATE REDUCTION (80% → 60%):
├── Keep only tier 1 & 2 documents
├── Compress tier 2 to summaries
├── Remove all examples and details
└── Keep only recent decisions

LEVEL 3 - MAJOR REDUCTION (60% → 40%):
├── Keep only tier 1 documents (compressed)
├── Current task context only
├── Essential patterns and rules
└── Emergency recovery information

LEVEL 4 - EMERGENCY MODE (40% → 20%):
├── System instructions only
├── Current task essentials
├── Contact information for human
└── Recovery procedures
```

### **Recovery Procedures:**
```markdown
IF context_lost OR severely_reduced:
1. **Acknowledge limitation:** "Working with reduced context"
2. **Request clarification:** Ask human for critical missing info
3. **Use fail-safes:** Default to conservative, well-documented approaches
4. **Document gaps:** Note what context was lost for future recovery
5. **Gradual rebuild:** Systematically reload context as space allows
```

---

## 📋 **BEST PRACTICES CHECKLIST**

### **Daily Context Management:**
```markdown
START OF SESSION:
□ Load context using appropriate sequence
□ Verify current task and project status
□ Check for any critical updates or changes
□ Identify context needs for planned work

DURING SESSION:
□ Monitor context usage and efficiency
□ Compress information in real-time when possible
□ Archive completed work context
□ Note important decisions and learnings

END OF SESSION:
□ Update global state with session outcomes
□ Summarize key decisions in project memory
□ Archive detailed conversation history
□ Plan context needs for next session
```

### **Weekly Context Maintenance:**
```markdown
WEEKLY REVIEW:
□ Compress old detailed conversations to summaries
□ Archive superseded documents and decisions
□ Update document priority tiers based on usage
□ Validate that critical information is preserved
□ Optimize loading sequences based on actual usage patterns
```

### **Monthly Context Optimization:**
```markdown
MONTHLY OPTIMIZATION:
□ Comprehensive review of all context documents
□ Major compression of historical information
□ Update context management rules based on learnings
□ Archive old examples while preserving patterns
□ Validate context recovery procedures
```

---

## 🎯 **CONTEXT MANAGEMENT FOR FOUNDER PRO SPECIFICS**

### **Project-Specific Optimizations:**
```markdown
FOUNDER PRO CONTEXT PRIORITIES:
1. **AC Module Patterns:** Always keep current template patterns
2. **Adaptation Strategies:** Compliance → Founder Pro mapping rules
3. **Design System:** Neumorphic design rules and Tailwind config
4. **Tool Sequences:** GitHub + Context7 + Memory workflows
5. **Quality Standards:** Accessibility, performance, consistency rules

COMPRESSION STRATEGIES FOR FOUNDER PRO:
├── **AC Module Examples:** Compress to patterns after validation
├── **Design Iterations:** Keep final decisions, archive exploration
├── **Tool Usage:** Keep sequences, compress detailed explanations
└── **Collaboration History:** Keep decisions, compress discussion details
```

### **Module-Specific Context:**
```javascript
const MODULE_CONTEXT_STRATEGY = {
  'AC-001': {
    priority: 'tier1',          // Foundation module, always critical
    compression: 'minimal',     // Keep detailed context
    caching: 'hot'              // Always readily available
  },
  
  'AC-002-004': {
    priority: 'tier2',          // Core modules, important
    compression: 'moderate',    // Keep patterns, compress examples
    caching: 'warm'             // Available within session
  },
  
  'AC-005-009': {
    priority: 'tier3',          // Growth modules, useful
    compression: 'aggressive',  // Patterns only, minimal examples
    caching: 'cold'             // Load on demand
  },
  
  'AC-010-011': {
    priority: 'tier4',          // Future modules, archive
    compression: 'maximum',     // Concepts only, no implementation details
    caching: 'archive'          // Reference only
  }
};
```

---

**Estas reglas de gestión de contexto aseguran que Founder Pro mantenga eficiencia máxima mientras preserva toda la información crítica para desarrollo y mantenimiento exitoso del proyecto.**

**Última actualización:** 20 de julio de 2025  
**Próxima revisión:** Después de implementar AC-001 (validation en práctica)  
**Status:** Framework completo y listo para aplicación práctica