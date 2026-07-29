### Pliego de Especificaciones Técnicas y Guía de Desarrollo: Demo Web Virtual-STEM Química

#### 1\. Contexto Estratégico y Visión del Proyecto

Bajo el liderazgo estratégico del  **Blgo. Rodrigo Mariaca Cardozo** , el proyecto  **Virtual-STEM Bolivia**  se consolida como una intervención tecnológica crítica para revertir la crisis de aprendizaje en ciencias exactas. El diagnóstico es estructural: un 97% de reprobación en química en el sistema secundario, derivado de que el 60% de las instituciones carecen de laboratorios funcionales. Este demo web no es solo un software; es un instrumento de democratización científica diseñado para cerrar la brecha entre la teoría abstracta y la experimentación empírica en contextos de vulnerabilidad.

* **Fundamentación Institucional:**  Virtual-STEM se alinea con la  **Ley 070 (Avelino Siñani \- Elizardo Pérez)** , promoviendo soberanía tecnológica y educación técnica-productiva. La solvencia técnica del proyecto reside en la arquitectura diseñada por  **Andrés Alberdi Baptista** , cuya formación en matemática pura por la UMSA (especialista en los Axiomas de Incidencia de Hilbert y Teoremas de Gödel) garantiza que los motores de simulación no sean meras animaciones, sino representaciones matemáticas exactas de la realidad química.  
* **Objetivos del Demo:**  El hito fundamental es el despliegue de una plataforma de alta fidelidad para 2,500 estudiantes de 6to de secundaria, logrando capacidad instalada mediante la certificación de 60 docentes en alianza estratégica con  **Fe y Alegría Bolivia** , garantizando el acceso territorial en zonas fiscales y de convenio.  
* **Conectividad Narrativa:**  Esta urgencia pedagógica de universalizar la ciencia encuentra su viabilidad técnica en una arquitectura  *serverless*  de alta eficiencia, seleccionada para eliminar barreras de costos operativos y asegurar sostenibilidad.

#### 2\. Arquitectura de Software Serverless (Capa Always Free)

La adopción de arquitecturas sin servidor (Serverless) responde a la necesidad de eliminar costos fijos en proyectos de alto impacto social, permitiendo que el 100% de los fondos de la subvención se orienten al desarrollo pedagógico.

* **Componentes del Stack Tecnológico:**  Se implementará  **React.js**  para el frontend por su modularidad, utilizando  **WebGL/Canvas**  como motor de renderizado para visualizaciones científicas complejas.  
* **Infraestructura Firebase (Plan Spark):**  Se utilizará el ecosistema de Google Cloud/Firebase para operar bajo el umbral gratuito de forma perpetua.| Componente | Función en el Proyecto | Estrategia Senior de Optimización || \------ | \------ | \------ || **Firebase Hosting** | Despliegue de la PWA y activos WebGL. | Cacheo agresivo y compresión de activos 3D. || **Cloud Firestore** | Persistencia de datos y analítica. | **Offline-First** : Sincronización diferida ( *Debounced writes* ). || **Firebase Auth** | Gestión de perfiles (Estudiante/Profesor). | Autenticación ligera mediante tokens JWT. |  
* **Evaluación de Infraestructura y "0% Data Cost":**  Para resolver la "exclusión virtual" del  **20.2% de estudiantes rurales**  sin conectividad, la arquitectura se diseñará como una  *Progressive Web App*  (PWA) de carga única. El acceso se garantiza mediante la distribución de  **Kits Maestros en USB** , que contienen instaladores autónomos (.exe y .apk), permitiendo que el laboratorio funcione en su totalidad sin consumo de datos móviles.  
* **Conectividad Narrativa:**  Esta infraestructura robusta y desconectada es el cimiento necesario para gestionar de forma segura los flujos de los diversos actores del ecosistema.

#### 3\. Perfiles de Usuario y Flujos Operativos

La segmentación precisa de flujos de usuario permite satisfacer la experiencia de aprendizaje y, simultáneamente, los requisitos de transparencia de la cooperación internacional.

* **Matriz de Perfiles y Funcionalidades:**  
* **Administrador:**  Control total de la lógica matemática del simulador y gestión de versiones.  
* **Profesor:**  Orquestación de aulas digitales y visualización de KPIs de aula ( *So What?* : Optimiza el tiempo docente al automatizar la calificación procesal).  
* **Estudiante:**  Usuario final que interactúa con el laboratorio bajo un modelo de aprendizaje activo.  
* **Supervisor (Ministerio/Cámaras):**  Acceso a reportes de cumplimiento curricular nacional.  
* **Inversionista (Embajada de EE. UU. / PD-LA PAZ-FY26-01):**  Visualización de impacto social y métricas de alcance.  
* **Flujo del Inversionista:**  Diseñado para la rendición de cuentas, este módulo permite monitorear la "Transferencia Científica Bilateral". Genera reportes automáticos que demuestran el cumplimiento de metas sociales y la eficiencia del gasto de la subvención, alineándose con los objetivos de cooperación estratégica de EE. UU.  
* **Conectividad Narrativa:**  La transparencia del sistema asegura la confianza de los socios, permitiendo que el enfoque se mantenga en el núcleo del aprendizaje: el ciclo de experimentación.

#### 4\. Flujo Metodológico del Laboratorio (Ciclo de 5 Fases)

La metodología Virtual-STEM prioriza la  **Metacognición** . El sistema no castiga el error, sino que lo captura como un dato pedagógico para transformar un fallo procedimental en un análisis de causa-efecto.

1. **Protocolo de Ejecución Obligatorio:**  
2. **Inducción EPP:**  El usuario debe equipar correctamente a su avatar (gafas, bata, guantes) basándose en las fichas de seguridad de los reactivos.  
3. **Ensamblaje:**  Arrastre y conexión de material de vidrio (buretas, erlenmeyers) sobre la mesa de trabajo digital.  
4. **Parámetros:**  Ingreso manual de variables estequiométricas (concentración, temperatura, volumen).  
5. **Ejecución:**  Renderizado en tiempo real de la reacción química basado en los scripts de precisión de Andrés Alberdi.  
6. **Análisis:**  Feedback automatizado sobre la precisión obtenida frente al valor teórico esperado.  
7. **Análisis de Errores:**  Se capturan métricas de bioseguridad. La manipulación de reactivos sin gafas de protección genera un registro de competencia negativa que el docente puede intervenir preventivamente.  
8. **Conectividad Narrativa:**  Este marco metodológico se aplica con rigor en las tres prácticas de laboratorio que representan los mayores obstáculos para el ingreso a carreras de Ingeniería y Salud.

#### 5\. Diseño de Prácticas de Química en el Demo

Las prácticas seleccionadas responden directamente a los cuellos de botella académicos identificados en los exámenes de admisión de la UMSA y otras facultades de ciencias exactas.

* **Lab 1: Preparación de Soluciones \- Molaridad (5.Q.18):**  Simulación de pesaje en balanza analítica y disolución de sulfato de cobre ( $CuSO\_4$ ). El motor debe validar la saturación de la mezcla según la temperatura configurada.  
* **Lab 2: Volumetría Ácido-Base (6.Q.4):**  Neutralización de vinagre comercial con hidróxido de sodio ( $NaOH$ ). Requiere la implementación de un motor de pH que visualice el punto de viraje exacto con fenolftaleína (cambio cromático gradual).  
* **Lab 3: Espejo de Plata \- Reacción de Tollens (6.Q.16):**  Oxidación de aldehídos. Un procedimiento crítico que exige precisión matemática en la mezcla de nitrato de plata y formaldehído para evitar reacciones fallidas o peligrosas.  
* **Conectividad Narrativa:**  La complejidad de estas reacciones exige una interfaz visual de alta fidelidad que mantenga el compromiso cognitivo del estudiante.

#### 6\. Interfases y Visualización WebGL/Canvas

La fidelidad visual es el puente entre lo abstracto y lo tangible. En Virtual-STEM, cada píxel responde a una ecuación química.

* **Componentes del Workbench:**  El área de trabajo incluye un inventario lateral de reactivos, una mesa de experimentación interactiva con física de partículas y un panel de telemetría científica en tiempo real.  
* **Requerimientos de Animación:**  
* **Precipitación:**  Formación de sólidos cristalinos en el fondo del recipiente.  
* **Efervescencia:**  Desprendimiento de burbujas con velocidad proporcional a la cinética de la reacción.  
* **Cromatismo:**  Gradientes de color suaves basados en escalas de pH.  
* **Visualización 3D:**  El "Espejo de Plata" se renderiza como un objeto 3D con mapas de reflexión ( *Environment Mapping* ) para simular la deposición metálica sobre el vidrio.  
* **Conectividad Narrativa:**  Los datos visuales generados por estas interacciones se traducen simultáneamente en analítica pedagógica para el dashboard docente.

#### 7\. Analítica de Aprendizaje y Dashboards

Aprovechando la visión de Big Data aplicada a la educación de Rodrigo Mariaca, el demo permite la detección temprana de brechas cognitivas antes de las evaluaciones finales.

* **Indicadores de Desempeño (KPIs):**  
* **Tasa de Seguridad:**  Precisión en el uso de EPP.  
* **Latencia de Configuración:**  Tiempo invertido en el cálculo de parámetros antes de la ejecución.  
* **Precisión Estequiométrica:**  Margen de error entre el cálculo del estudiante y el motor matemático.  
* **Reportes para Profesores:**  El sistema entrega una matriz de competencias por aula, permitiendo que el docente identifique qué alumnos requieren tutoría personalizada en conceptos específicos de soluciones o neutralización.  
* **Conectividad Narrativa:**  La recolección de estos datos críticos debe ser eficiente y estrictamente segura bajo las cuotas de la capa gratuita.

#### 8\. Seguridad y Limitaciones de la Capa Spark (Firebase)

Como arquitectos seniors, la gestión de recursos limitados es una prioridad. El plan Spark tiene un techo de 100 conexiones simultáneas que debe gestionarse mediante ingeniería de software.

* **Protección de Datos (PII):**  Se implementarán reglas de seguridad en Firestore para anonimizar los datos de los estudiantes y proteger la Información de Identificación Personal, limitando el acceso a registros sensibles.  
* **Gestión de Límites Spark:**  
* **Estrategia "Sync-on-Submit":**  La aplicación trabaja 100% en caché local y solo intenta sincronizar con Firebase cuando el usuario finaliza el reporte de práctica.  
* **Lazy Loading:**  Los activos 3D se cargan bajo demanda para no saturar el ancho de banda diario (360MB).  
* **Conectividad Narrativa:**  Para implementar estas optimizaciones con la velocidad que exige el  *Time-to-Market*  de la subvención, se utilizará IA Generativa de alto nivel.

#### 9\. Guía de Prompts para Antigravity IDE (Gemini)

La Inteligencia Artificial es el multiplicador de fuerza que permite a un equipo pequeño competir con estándares internacionales en tiempos récord. Es así que se elaboran y adjuntan los siguientes:

* **Prompt de Arquitectura (System-Role):**  
* **Prompt de Lógica Científica (Senior Engineer \+ PhD Chemistry):**  
* **Prompt de Seguridad de Datos:**

#### 10\. Perspectiva Estratégica y Cierre

El éxito de este demo web constituye la evidencia técnica necesaria para escalar Virtual-STEM a nivel regional. No solo democratiza el aprendizaje en Bolivia, sino que posiciona al país en el mapa de innovación EdTech global. Siguiendo nuestra estrategia de alianzas, este demo será sometido a validación pedagógica por especialistas de  **Georgia Tech y Purdue University** , asegurando que nuestra tecnología de "Caja Negra" cumpla con los estándares internacionales de retención cognitiva. Este proyecto es el primer paso para convertir el 97% de reprobación en una estadística del pasado, transformando a Bolivia en un referente de excelencia científica bilateral con los Estados Unidos.  
