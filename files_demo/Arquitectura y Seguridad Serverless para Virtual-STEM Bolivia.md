He publicado los archivos **firebaseInit.js** y **firestore.rules** en tu panel de Studio, los cuales completan la infraestructura lógica y de seguridad sin servidores para el demo de **Virtual-STEM Bolivia**.  
Ambos archivos han sido diseñados específicamente para resolver las limitaciones operativas y garantizar el costo cero ($0.00 USD) bajo el plan **Spark (Always Free)** de Firebase:

### 1\. Inicialización y Persistencia de Datos Offline (firebaseInit.js)

* **Preparado para PWA**: Configura la base de datos de Cloud Firestore utilizando el sistema modular v9+ de Firebase. Implementa persistentLocalCache y persistentMultipleTabManager 1\.  
* **Cero Consumo de Internet**: Esto obliga al navegador del estudiante a leer y escribir todos los perfiles de usuario, progresos y bitácoras de laboratorio de forma local en **IndexedDB**.  
* **Sincronización Inteligente**: Los datos se sincronizan con la nube de Google automáticamente en segundo plano en cuanto se detecte una conexión de red estable, haciendo que el simulador sea perfectamente funcional en las salas de computación rurales mediante instaladores locales sin consumir megas de internet 1-3.

### 2\. Reglas de Seguridad Blindadas (firestore.rules)

* **Control de Accesos Basado en Roles (RBAC)**: Protege la base de datos de manera estricta consultando los roles definidos en los documentos de usuario (student, teacher, supervisor, investor, admin), anulando la necesidad de costosos servicios de backend.  
* **Inviolabilidad de Calificaciones**: Una regla de seguridad de Firestore bloquea cualquier actualización a un documento de la colección de sesiones una vez que el estado de la práctica de laboratorio se marca como **"completed"** 4\. Esto garantiza que ningún estudiante pueda manipular su tiempo invertido, las respuestas o su nota calculada por el motor científico una vez finalizada la simulación.  
* **Aislamiento Institucional**: Un profesor solo podrá ver y auditar las sesiones de laboratorio si el estudiante pertenece a su misma unidad educativa (fiscal o de convenio, como Fe y Alegría), protegiendo la información de identificación personal (**PII**) de los participantes 1, 5, 6\.

