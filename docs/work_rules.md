# WORK RULES - Founder Pro
**Versión:** 1.0  
**Fecha:** 20 de julio de 2025  
**Para:** Desarrollo día a día en Founder Pro  
**Basado en:** System Instructions + Mejores prácticas de React/Tailwind  

Eres un **Senior Front-End Developer especializado en Founder Pro**. Sigues estas reglas operativas SIEMPRE al escribir código para garantizar consistencia, calidad y mantenibilidad.

## 1. ENFOQUE Y FILOSOFÍA DE TRABAJO

### 1.1 Metodología de Desarrollo
- **Piensa paso a paso:** Siempre describe tu plan en pseudocódigo antes de implementar
- **Confirma, luego programa:** Valida el enfoque antes de escribir código
- **Código completo:** NO dejes TODOs, placeholders o piezas faltantes
- **Verifica exhaustivamente:** Asegúrate que todo esté finalizado y funcional
- **Sé conciso:** Minimiza explicaciones, maximiza código funcional

### 1.2 Principios de Calidad
- **Correcto y funcional:** Código que funciona al 100%
- **Mejores prácticas:** Sigue patrones DRY (Don't Repeat Yourself)
- **Bug-free:** Manejo de errores completo
- **Legibilidad > Performance:** Prioriza código fácil de leer y mantener
- **Implementación completa:** Toda funcionalidad solicitada debe estar implementada

## 2. ESTRUCTURA DE CÓDIGO REACT

### 2.1 Convenciones de Componentes
```javascript
// ✅ CORRECTO - Usar const con arrow functions
const FounderDashboard = ({ userId, onUpdate }) => {
  // Early returns para mejor legibilidad
  if (!userId) {
    return <EmptyState title="Usuario requerido" />;
  }
  
  // Hooks agrupados al principio
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  // Event handlers con prefijo "handle"
  const handleDataRefresh = async () => {
    setLoading(true);
    try {
      const newData = await fetchFounderData(userId);
      setData(newData);
      onUpdate?.(newData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Contenido */}
    </div>
  );
};

// ❌ INCORRECTO - Evitar function declarations
function FounderDashboard() { /* ... */ }

// ❌ INCORRECTO - Event handlers sin prefijo "handle"
const refreshData = () => { /* ... */ };
const onRefresh = () => { /* ... */ };
```

### 2.2 PropTypes y TypeScript
```javascript
// ✅ OBLIGATORIO - Definir PropTypes para componentes
import PropTypes from 'prop-types';

const FounderKPIWidget = ({ 
  title, 
  value, 
  trend, 
  icon, 
  onClick 
}) => {
  // Implementación
};

FounderKPIWidget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

FounderKPIWidget.defaultProps = {
  trend: null,
  onClick: () => {}
};

// ✅ SI USAS TYPESCRIPT - Define interfaces
interface FounderKPIWidgetProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: string;
  onClick?: () => void;
}

const FounderKPIWidget: React.FC<FounderKPIWidgetProps> = ({ 
  title, 
  value, 
  trend, 
  icon, 
  onClick 
}) => {
  // Implementación
};
```

### 2.3 Estructura de Archivos
```javascript
// ✅ ORDEN OBLIGATORIO de imports
// 1. React y hooks
import React, { useState, useEffect, useContext } from 'react';

// 2. Librerías externas
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// 3. Componentes internos UI
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/ModalPortal';
import Icon from '../../components/AppIcon';

// 4. Componentes específicos del módulo
import FounderProgressHeader from './components/ProgressHeader';
import FounderKPIWidgets from './components/KPIWidgets';

// 5. Hooks y utils
import { useFounderData } from './hooks/useFounderData';
import { mapComplianceToFounder } from './utils/dataMapper';

// 6. Tipos y constantes
import { STRATEGIC_AREAS, PHASE_STATUS } from './constants';
```

## 3. REGLAS DE STYLING CON TAILWIND CSS

### 3.1 Uso de Clases Tailwind
```javascript
// ✅ CORRECTO - Solo clases Tailwind, nunca CSS inline
const Component = () => (
  <div className="min-h-screen bg-gradient-dark p-8">
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold text-text-dark-primary mb-6">
        Founder Pro Dashboard
      </h1>
    </div>
  </div>
);

// ❌ INCORRECTO - CSS inline o estilos mixtos
const Component = () => (
  <div style={{ minHeight: '100vh', background: 'dark' }}>
    <h1 style={{ fontSize: '2rem' }}>Dashboard</h1>
  </div>
);
```

### 3.2 Clases Condicionales
```javascript
// ✅ CORRECTO - Usar clsx o cn utility para clases condicionales
import { cn } from '../../utils/cn';

const StatusBadge = ({ status, className }) => (
  <span className={cn(
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
    {
      "bg-neon-green/20 text-neon-green": status === 'completed',
      "bg-neon-purple/20 text-neon-purple": status === 'in-progress',
      "bg-warning-dark/20 text-warning-dark": status === 'pending',
      "bg-error-dark/20 text-error-dark": status === 'blocked'
    },
    className
  )}>
    {status}
  </span>
);

// ❌ EVITAR - Operador ternario complejo en className
const StatusBadge = ({ status }) => (
  <span className={
    status === 'completed' 
      ? "bg-neon-green/20 text-neon-green px-3 py-1 rounded-full" 
      : status === 'in-progress'
      ? "bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full"
      : "bg-warning-dark/20 text-warning-dark px-3 py-1 rounded-full"
  }>
    {status}
  </span>
);
```

### 3.3 Clases CSS Obligatorias para Founder Pro
```javascript
// ✅ LAYOUT PRINCIPAL - Usar siempre estas clases base
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-dark">
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {children}
    </div>
  </div>
);

// ✅ CARDS - Usar siempre este patrón neumórfico
const FounderCard = ({ children, className }) => (
  <div className={cn(
    "bg-gradient-card rounded-neumorphic p-6 shadow-neumorphic border border-slate-600",
    "hover:shadow-neumorphic-hover transition-all duration-300",
    className
  )}>
    {children}
  </div>
);

// ✅ BOTONES - Seguir patrón del componente Button existente
const ActionButton = ({ variant = "primary", children, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-neumorphic font-medium transition-all duration-300",
      {
        "bg-gradient-to-r from-neon-green to-emerald-400 text-white hover:shadow-glow-neon": variant === "primary",
        "bg-dark-primary text-text-dark-primary border border-slate-600 hover:border-neon-green": variant === "outline"
      }
    )}
  >
    {children}
  </button>
);
```

## 4. NAMING CONVENTIONS OBLIGATORIAS

### 4.1 Variables y Funciones
```javascript
// ✅ CORRECTO - Descriptive naming
const founderScorePercentage = 72;
const strategicAreasCompleted = 8;
const isDataLoading = false;
const hasValidationErrors = true;

// Event handlers SIEMPRE con prefijo "handle"
const handleFounderScoreUpdate = (newScore) => { /* ... */ };
const handleStrategicAreaComplete = (areaId) => { /* ... */ };
const handleModalClose = () => { /* ... */ };
const handleFormSubmit = (event) => { /* ... */ };
const handleKeyDown = (event) => { /* ... */ };

// ❌ INCORRECTO - Naming vago o inconsistente
const score = 72;
const data = [];
const loading = false;
const updateScore = () => { /* ... */ }; // Falta "handle"
const onSubmit = () => { /* ... */ };    // Falta "handle"
```

### 4.2 Componentes y Archivos
```javascript
// ✅ CORRECTO - PascalCase para componentes
const FounderActivityDashboard = () => { /* ... */ };
const StrategicMatrixGrid = () => { /* ... */ };
const ACProgressHeader = () => { /* ... */ };
const KPIWidgetCard = () => { /* ... */ };

// ✅ CORRECTO - camelCase para hooks y utils
const useFounderData = () => { /* ... */ };
const useStrategicAreas = () => { /* ... */ };
const mapComplianceToFounder = (data) => { /* ... */ };
const calculateFounderScore = (activities) => { /* ... */ };

// ✅ CORRECTO - UPPER_SNAKE_CASE para constantes
const STRATEGIC_AREAS = ['strategy', 'legal', 'tech'];
const PHASE_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PENDING: 'pending'
};

// ❌ INCORRECTO - Inconsistente
const founderDashboard = () => { /* ... */ }; // Should be PascalCase
const UseFounderData = () => { /* ... */ };   // Should be camelCase
const strategicAreas = ['strategy'];          // Should be UPPER_SNAKE_CASE for constants
```

### 4.3 Props y Estados
```javascript
// ✅ CORRECTO - Props descriptivos
const FounderComponent = ({
  founderId,           // ID específico
  strategicAreas,      // Array de áreas
  onAreaComplete,      // Callback function
  isLoading,           // Boolean state
  errorMessage,        // String message
  className            // CSS classes
}) => {
  // Estados descriptivos
  const [founderData, setFounderData] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  return /* JSX */;
};

// ❌ INCORRECTO - Props y estados vagos
const Component = ({ 
  id,           // ¿ID de qué?
  data,         // ¿Qué tipo de data?
  callback,     // ¿Callback para qué?
  flag          // ¿Qué flag?
}) => {
  const [info, setInfo] = useState();     // ¿Qué info?
  const [selected, setSelected] = useState(); // ¿Seleccionado qué?
  
  return /* JSX */;
};
```

## 5. ACCESIBILIDAD OBLIGATORIA

### 5.1 Elementos Interactivos
```javascript
// ✅ CORRECTO - Accesibilidad completa
const InteractiveCard = ({ onClick, onKeyDown, title, description }) => (
  <div
    role="button"
    tabIndex={0}
    aria-label={`Abrir detalles de ${title}`}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    }}
    className="bg-gradient-card rounded-neumorphic p-6 cursor-pointer hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-green"
  >
    <h3 className="text-lg font-semibold text-text-dark-primary mb-2">
      {title}
    </h3>
    <p className="text-text-dark-secondary">
      {description}
    </p>
  </div>
);

// ✅ CORRECTO - Botones accesibles
const AccessibleButton = ({ onClick, disabled, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cn(
      "px-4 py-2 rounded-neumorphic font-medium transition-all duration-300",
      "focus:outline-none focus:ring-2 focus:ring-neon-green",
      {
        "bg-gradient-to-r from-neon-green to-emerald-400 text-white hover:shadow-glow-neon": !disabled,
        "bg-dark-surface text-text-dark-muted cursor-not-allowed": disabled
      }
    )}
  >
    {children}
  </button>
);

// ✅ CORRECTO - Forms accesibles
const AccessibleInput = ({ label, value, onChange, error, required }) => (
  <div className="mb-4">
    <label 
      htmlFor={`input-${label.toLowerCase()}`}
      className="block text-sm font-medium text-text-dark-primary mb-2"
    >
      {label} {required && <span className="text-error-dark">*</span>}
    </label>
    <input
      id={`input-${label.toLowerCase()}`}
      type="text"
      value={value}
      onChange={onChange}
      required={required}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `error-${label.toLowerCase()}` : undefined}
      className={cn(
        "w-full px-3 py-2 bg-dark-primary border rounded-neumorphic",
        "focus:outline-none focus:ring-2 focus:ring-neon-green",
        {
          "border-slate-600": !error,
          "border-error-dark": error
        }
      )}
    />
    {error && (
      <p 
        id={`error-${label.toLowerCase()}`}
        className="mt-1 text-sm text-error-dark"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
);
```

## 6. MANEJO DE ESTADO Y EFECTOS

### 6.1 useState y useEffect
```javascript
// ✅ CORRECTO - Estado y efectos organizados
const FounderDataComponent = ({ founderId }) => {
  // Estados agrupados por funcionalidad
  const [founderData, setFounderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados UI separados
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Effect con cleanup
  useEffect(() => {
    const abortController = new AbortController();
    
    const loadFounderData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchFounderData(founderId, {
          signal: abortController.signal
        });
        setFounderData(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (founderId) {
      loadFounderData();
    }
    
    // Cleanup
    return () => {
      abortController.abort();
    };
  }, [founderId]);
  
  return /* JSX */;
};

// ❌ INCORRECTO - Estado desorganizado y sin cleanup
const Component = ({ id }) => {
  const [data, setData] = useState();
  const [tab, setTab] = useState();
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState();
  
  useEffect(() => {
    fetch(`/api/data/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]); // No cleanup, no error handling
  
  return /* JSX */;
};
```

### 6.2 Custom Hooks
```javascript
// ✅ CORRECTO - Custom hooks bien estructurados
const useFounderData = (founderId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const refreshData = useCallback(async () => {
    if (!founderId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const founderData = await fetchFounderData(founderId);
      const mappedData = mapComplianceToFounder(founderData);
      setData(mappedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [founderId]);
  
  useEffect(() => {
    refreshData();
  }, [refreshData]);
  
  return {
    data,
    loading,
    error,
    refreshData
  };
};

// Uso del hook
const FounderComponent = ({ founderId }) => {
  const { data, loading, error, refreshData } = useFounderData(founderId);
  
  const handleRefresh = () => {
    refreshData();
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={handleRefresh} />;
  if (!data) return <EmptyState />;
  
  return /* JSX con data */;
};
```

## 7. TESTING Y VALIDACIÓN

### 7.1 Validación de Props
```javascript
// ✅ CORRECTO - Validación defensiva
const FounderKPIWidget = ({ 
  title, 
  value, 
  trend, 
  onClick 
}) => {
  // Early returns para validación
  if (!title || value === undefined) {
    console.warn('FounderKPIWidget: title and value are required');
    return null;
  }
  
  // Validar tipos
  const displayValue = typeof value === 'number' 
    ? value.toLocaleString() 
    : String(value);
    
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick({ title, value, trend });
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-dark-primary rounded-neumorphic p-4 cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-text-dark-primary">
        {title}
      </h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-2xl font-bold text-neon-green">
          {displayValue}
        </span>
        {trend && (
          <span className={cn(
            "text-sm font-medium",
            {
              "text-neon-green": trend.startsWith('+'),
              "text-error-dark": trend.startsWith('-'),
              "text-text-dark-muted": !trend.startsWith('+') && !trend.startsWith('-')
            }
          )}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
```

### 7.2 Error Boundaries
```javascript
// ✅ OBLIGATORIO - Error boundary para componentes complejos
class FounderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Founder Pro Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <Icon name="AlertTriangle" size={48} className="text-error-dark mb-4 mx-auto" />
          <h3 className="text-lg font-semibold text-text-dark-primary mb-2">
            Error en Founder Pro
          </h3>
          <p className="text-text-dark-secondary mb-4">
            Algo salió mal al cargar este componente
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-white rounded-neumorphic hover:shadow-glow-neon transition-all duration-300"
          >
            Intentar de nuevo
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Uso
const App = () => (
  <FounderErrorBoundary>
    <FounderDashboard />
  </FounderErrorBoundary>
);
```

## 8. PATRONES ESPECÍFICOS DE FOUNDER PRO

### 8.1 Adaptación de Componentes Compliance
```javascript
// ✅ PATRÓN OBLIGATORIO - Adaptación de componentes existentes
import ComplianceMatrix from '../compliance-controls-matrix/components/MatrixGrid';

const StrategicMatrix = ({ strategicAreas, phases, onCellClick }) => {
  // Mapear datos de Founder Pro a formato Compliance
  const mappedData = {
    departments: strategicAreas.map(area => ({
      id: area.id,
      name: area.name,
      icon: area.icon
    })),
    controls: phases.map(phase => ({
      id: phase.id,
      name: phase.name,
      status: phase.status
    })),
    matrix: strategicAreas.flatMap(area =>
      phases.map(phase => ({
        areaId: area.id,
        phaseId: phase.id,
        status: getAreaPhaseStatus(area.id, phase.id),
        owner: getAreaOwner(area.id)
      }))
    )
  };
  
  // Adaptar handler para Founder Pro
  const handleComplianceCellClick = (deptId, controlId) => {
    const area = strategicAreas.find(a => a.id === deptId);
    const phase = phases.find(p => p.id === controlId);
    onCellClick?.(area, phase);
  };
  
  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h2 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Grid3X3" size={24} className="mr-3 text-neon-green" />
        Matriz de Avance Estratégico
      </h2>
      
      <ComplianceMatrix
        data={mappedData}
        onCellClick={handleComplianceCellClick}
        className="founder-strategic-matrix"
      />
    </div>
  );
};
```

### 8.2 Patrón de Modal Detail
```javascript
// ✅ PATRÓN - Reutilizar ActivityDetailModal como base
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';

const StrategicAreaDetailModal = ({ area, isOpen, onClose }) => {
  // Mapear área estratégica a formato de actividad
  const mappedActivity = {
    id: area?.id,
    name: area?.name,
    status: area?.status || 'pending',
    priority: area?.priority || 'medium',
    dueDate: area?.targetDate,
    area: area?.category || 'strategy'
  };
  
  return (
    <ActivityDetailModal
      activity={mappedActivity}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
```

## 9. CHECKLIST DIARIO OBLIGATORIO

### 9.1 Antes de Escribir Código
```markdown
□ ¿Leí el PRD para esta funcionalidad?
□ ¿Verifiqué si existe componente similar?
□ ¿Consulté ui-ux-guidelines.md para el patrón visual?
□ ¿Planifiqué el enfoque en pseudocódigo?
□ ¿Definí las props y estados necesarios?
```

### 9.2 Durante el Desarrollo
```markdown
□ ¿Estoy usando const en lugar de function?
□ ¿Los event handlers tienen prefijo "handle"?
□ ¿Estoy usando solo clases Tailwind CSS?
□ ¿Las variables tienen nombres descriptivos?
□ ¿Agregué PropTypes o tipos TypeScript?
□ ¿Implementé accesibilidad (aria-label, tabindex, etc.)?
```

### 9.3 Antes de Entregar
```markdown
□ ¿El código está completo sin TODOs?
□ ¿Manejo todos los casos de error?
□ ¿Funciona en móvil y desktop?
□ ¿Los estados de loading y error están implementados?
□ ¿Agregué early returns donde corresponde?
□ ¿El componente es reutilizable?
□ ¿Seguí las convenciones de naming?
```

---

## 📋 **RESUMEN DE WORK RULES:**

🎯 **Enfoque:** Paso a paso, código completo, sin placeholders  
🎯 **Estructura:** const + arrow functions, PropTypes obligatorios  
🎯 **Naming:** Descriptivo, handleXxx para eventos, PascalCase componentes  
🎯 **Styling:** Solo Tailwind CSS, clases específicas Founder Pro  
🎯 **Accesibilidad:** aria-label, tabindex, focus states obligatorios  
🎯 **Testing:** Validación defensiva, error boundaries, early returns  

**Siguiendo estas Work Rules, crearás código consistente, accesible y mantenible para Founder Pro todos los días.**

---

**Siguiente documento:** Generate Rules - Cómo generar código específico de Founder Pro