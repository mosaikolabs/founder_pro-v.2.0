ARQUITECTURA FRONTEND - Founder Pro

Fecha de Creación: 20 de julio de 2025
Versión: 1.0
Autor: @ux_to_architect (BMAD FULL Team)

1. Visión General y Principios Rectores de la Arquitectura

La arquitectura frontend de Founder Pro se basa en la adaptación profunda del sistema ComplianceHub existente. Nuestro objetivo principal es maximizar la reutilización del código, los componentes y la estructura actual, minimizando la creación de elementos desde cero. Esto asegura una transición eficiente y reduce los riesgos asociados con el desarrollo de una nueva aplicación.

Principios Clave:

    Reutilización Primero: Priorizar la adaptación de los componentes y módulos existentes sobre la creación de nuevos.

    Minimalismo en Cambios Estructurales: Realizar solo las modificaciones estructurales estrictamente necesarias.

    Coherencia con UI/UX: Asegurar que la arquitectura soporte la implementación fiel de la Especificación de UI/UX.

    Mantenibilidad: Diseñar para que las adaptaciones sean fáciles de entender y mantener por el equipo de desarrollo futuro.

    Rendimiento: Mantener o mejorar el rendimiento existente, evitando introducciones de complejidad innecesaria.

2. Stack Tecnológico Frontend (Inferencia y Recomendación)

Dado que ComplianceHub es un "template" funcional, inferimos que probablemente utiliza un framework moderno consolidado. Sin acceso directo al código, asumiremos un stack común para aplicaciones empresariales web y propondremos una estrategia adaptable a la mayoría:

    Framework/Librería Principal: Se asume la existencia de un framework como React, Angular, o Vue.js. La estrategia de adaptación será similar independientemente del framework específico, centrándose en el manejo de componentes.

    Gestión de Estado: Se reutilizará el patrón de gestión de estado existente. Si es un framework moderno, probablemente ya cuenta con su propio sistema (Context API/Redux para React, Servicios para Angular, Vuex/Pinia para Vue). Si es una aplicación más antigua, se propondrá una estrategia de "lifting state up" o se buscará un patrón MVC/MVVM que ya esté en uso.

    Estilización (CSS): Se mantendrá el enfoque de estilización actual (CSS Modules, Styled Components, SASS/LESS, o CSS puro). Las adaptaciones de estilo se harán principalmente mediante la modificación de variables CSS, sobrescritura de clases existentes, o ajustes en los archivos de estilos de los componentes.

    Construcción (Build Tool): Se asumirá y utilizará la herramienta de construcción existente (Webpack, Vite, Gulp, etc.).

3. Estrategia de Adaptación de Componentes

La clave de la adaptación radica en cómo los componentes de ComplianceHub se transformarán en los de Founder Pro.

    Identificación de Componentes Base:

        Layout & Navegación: El componente de layout principal (sidebar, header, footer) y los componentes de menú.

        Contenedores de Contenido: Componentes de Dashboard, Tabla, Formulario, Detalle de Elemento (tarjeta), Gráfico.

        Elementos UI Primitivos: Botones, inputs, selects, checkboxes, modales, alertas, loaders, spinners.

        Componentes de Visualización de Datos: Tablas paginadas, listas, cards de resumen.

    Patrones de Adaptación por Componente:

        Reetiquetado Directo: Cambiar texto (Compliance Overview a DASHBOARD).

        Iconografía: Sustituir íconos por otros más representativos de Founder Pro (ej. ⚖️ por 🚀).

        Adaptación de Propiedades/Datos: Los componentes que muestran datos (tablas, gráficos) deberán configurarse para recibir y presentar la nueva información de Founder Pro (ej. Founder Score, Runway Financiero) en lugar de los datos de compliance. Esto puede implicar modificar las props o la forma en que el componente consume su fuente de datos.

        Reorganización de Contenido (en contenedores existentes): Dentro de un layout de dashboard o detalle, los bloques de información se reorganizarán según la Especificación de UI/UX, utilizando los mismos contenedores o componentes de tarjeta de ComplianceHub.

        Estilización Sutil: Ajustes en colores primarios, tipografías y sombras para alinear con la identidad visual de Founder Pro, sin alterar drásticamente la estructura CSS. Se explorará el uso de variables CSS para facilitar esto.

        Flujos de Usuario: Las transiciones entre pantallas (rutas) se adaptarán para reflejar los nuevos flujos de navegación de Founder Pro.

4. Adaptación de la Estructura de Carpetas

La estructura de carpetas (carpetas1.png a carpeta5.png) será la base. Propondremos renombrar y reorganizar lógicamente sin reestructurar radicalmente.

    src/ (o app/): El directorio principal de la aplicación frontend.

        assets/: Mantener para imágenes, iconos, fuentes. Actualizar los activos visuales de ComplianceHub a Founder Pro.

        components/: Renombrar o reorganizar subcarpetas si es necesario para reflejar los componentes de Founder Pro. Por ejemplo, si hay components/compliance-forms, podría pasar a components/founder-forms o components/onboarding-forms.

        views/ o pages/: Contendrá los componentes de alto nivel que representan cada pantalla.

            Renombrar las carpetas de vistas (ej. compliance-dashboard/ a dashboard/, it-compliance/ a estrategia/).

            Dentro de cada carpeta de vista, adaptar los componentes internos y el ruteo.

        services/ o api/: Mantener para la lógica de interacción con el backend. Adaptar las llamadas si los endpoints o los datos requeridos cambian para Founder Pro.

        utils/ o helpers/: Mantener para funciones utilitarias.

        styles/: Adaptar los archivos de estilo globales y las variables CSS para el look & feel de Founder Pro.

        config/: Adaptar las configuraciones específicas del entorno y la aplicación.

    Otros Directorios (ej. public/, node_modules/, dist/): Mantener su propósito y estructura actual.

5. Estrategias Específicas de Adaptación

    Gestión de Estado y Datos:

        Reutilizar el Patrón Existente: Identificar cómo el sistema actual maneja el estado global y las interacciones con la API. Adaptaremos la forma en que los nuevos datos de Founder Pro (ej. Founder Score, KPIs financieros) se cargan y se actualizan a través de este sistema.

        Mapeo de Datos: Implementar una capa de mapeo si la estructura de datos del backend para Founder Pro difiere significativamente de lo que el frontend de ComplianceHub espera. Esto podría ser en los servicios o en el propio componente.

    Rutado y Navegación:

        Reconfigurar Rutas: Modificar la configuración del enrutador frontend para reflejar la nueva estructura de URLs y los nombres de las vistas de Founder Pro (ej. /compliance/overview a /dashboard).

        Actualizar Componentes de Navegación: Modificar los componentes del menú lateral/superior para mostrar los nuevos textos, íconos y enlaces a las rutas de Founder Pro, tal como se especificó en la sección de "Barra de Navegación Principal" de la UI/UX Spec.

    Estilización:

        Variables CSS: Identificar y modificar variables CSS (colores, fuentes, espaciado) en un archivo central para un cambio de marca eficiente.

        Sobrescritura Local: Para componentes específicos que requieran un ajuste visual más allá de las variables globales, se aplicarán sobrescrituras de estilo dentro del archivo de estilo del componente o con clases adicionales.

        Evitar Reescritura Global: No se reescribirá el CSS de todo el proyecto, a menos que sea absolutamente necesario y se justifique un cambio de diseño drástico que no pueda lograrse con adaptación.

6. Gaps Identificados y Nuevos Desarrollos (Minimización)

Basándonos en el PRD y la Especificación de UI/UX, y bajo el principio de adaptación:

    Identificación de Gaps: La Especificación de UI/UX ya ha guiado la adaptación de las principales pantallas. Cualquier funcionalidad que no tenga un análogo directo y adaptable en las 29 pantallas o la estructura actual se marcará como un "nuevo desarrollo".

    Ejemplos Potenciales de Nuevo Desarrollo (sujeto a reevaluación con acceso a código):

        Si el sistema de ComplianceHub no tiene un componente de "matriz editable" y la Matriz de Avance Estratégico de Founder Pro lo requiere, podría ser un nuevo componente.

        Componentes de onboarding o configuración inicial específicos de Founder Pro si no tienen un análogo.

    Minimización: La prioridad es adaptar. Si se identifica un "gap", se buscará la forma más pequeña y eficiente de implementar el nuevo componente, quizás como una variación de uno existente.
