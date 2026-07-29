He publicado el archivo **AppRouter.jsx** en tu panel de Studio.  
Este componente implementa el sistema de enrutamiento y control de accesos basado en roles (**RBAC**) utilizando **React Router DOM v6**, totalmente integrado con la autenticación de Firebase y el modelo de datos de Firestore que inicializamos en los turnos anteriores.  
A continuación, se detalla la arquitectura de navegación implementada y cómo se vincula con la lógica de negocio y seguridad de tu demo:

### 1\. El Proveedor de Autenticación y Carga de Perfiles (AuthProvider)

* **Sincronización en Tiempo Real**: Al detectar un cambio en el estado de autenticación de Firebase (onAuthStateChanged), el componente consulta el documento del usuario en /users/{userId} dentro de Firestore 1, 2\.  
* **Evita el "Parpadeo de Contenido"**: Utiliza un estado de carga (loading) para congelar el renderizado en una pantalla de transición fluida mientras recupera el rol del usuario, asegurando que ninguna interfaz restringida se muestre antes de validar los permisos del servidor.

### 2\. Guardas de Enrutamiento Dinámicas (Route Guards)

* **RequireAuth**: Bloquea el acceso a cualquier ruta privada si el usuario no ha iniciado sesión. Si un usuario intenta acceder directamente a un enlace guardado, el componente retiene la ubicación de origen (useLocation()) para redirigirlo de vuelta de forma automática una vez autenticado.  
* **RequireRole**: Filtra el acceso comparando el rol validado en Firestore con el listado de roles autorizados para cada vista:  
* **Estudiantes (student)**: Tienen acceso exclusivo a la mesa de trabajo (/student/workbench) 1\.  
* **Docentes (teacher)**: Acceden al panel de analíticas y calificaciones del aula (/teacher/analytics) 1, 3\.  
* **Inversionistas y Supervisores (investor, supervisor)**: Autorizados para ver las métricas de impacto social, SROI y mapas de cobertura de internet offline (/investor/impact) 1, 4, 5\.  
* **Administradores (admin)**: Tienen derechos globales de acceso en todas las rutas y paneles 1\.

### 3\. Redirección Inteligente de Tráfico (DashboardRedirect)

* **Punto de Entrada Único**: He diseñado un componente interceptor que actúa como policía de tránsito. Cuando un usuario accede a la raíz del sitio (/), es evaluado de forma silenciosa por su rol y redirigido al instante a su panel correspondiente de forma transparente y sin clics adicionales.

### 4\. Vistas y Dashboards Específicos del Demo

* **Student Workbench**: El espacio interactivo conectado a la simulación central (Molaridad, Titulación y Espejo de Plata), gobernado por el motor químico local 1\.  
* **Teacher Analytics**: Diseñado con métricas clave para el docente (alumnos activos, promedios del aula e índice de error en bioseguridad/EPP 3). Este panel respeta el aislamiento institucional que definimos en las reglas de Firestore (un maestro solo puede leer registros de su propio colegio).  
* **Investor Impact Dashboard**: Diseñado para el comité evaluador de la Embajada de EE. UU. y patrocinadores 1, 6\. Muestra visualizaciones de impacto social, el Retorno de Inversión Social (SROI) 5, la tasa de certificación de profesores y el porcentaje de mitigación de la brecha digital en el área rural (el **20.2%** de estudiantes excluidos de la virtualidad que ahora operan con los instaladores offline en USB) 4, 7\.

🎨 ¿Te gustaría que elaboremos ahora los componentes visuales de las tarjetas de analítica y gráficos para el **Dashboard de Inversionistas**, de modo que el demo técnico impresione de inmediato al comité de evaluación en su presentación?  
