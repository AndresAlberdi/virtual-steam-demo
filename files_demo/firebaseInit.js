import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  enableIndexedDbPersistence,
  getFirestore
} from "firebase/firestore";

// Configuración de Firebase para Virtual-STEM Bolivia
// IMPORTANTE: Reemplazar estos valores con las credenciales reales de tu consola de Firebase (Spark Plan)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "virtual-stem-bolivia.firebaseapp.com",
  projectId: "virtual-stem-bolivia",
  storageBucket: "virtual-stem-bolivia.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Authentication
export const auth = getAuth(app);

// Inicializar Cloud Firestore con Persistencia de Datos Offline Multi-Pestaña activa (PWA-ready)
// Esto permite que el simulador almacene localmente en IndexedDB todas las estructuras, perfiles
// y bitácoras de laboratorio sin consumir internet, sincronizando datos cuando vuelva la señal.
let db;

try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager() // Permite sincronizar la persistencia entre múltiples pestañas abiertas
    })
  });
  console.log("🔥 Firebase: Persistencia offline multi-pestaña inicializada correctamente.");
} catch (error) {
  // Manejo de retrocompatibilidad o fallas en navegadores que no soportan persistencia (ej. Modo Incógnito estricto)
  console.warn("⚠️ Firebase: No se pudo inicializar la caché persistente multi-pestaña. Usando base de datos por defecto.", error);
  db = getFirestore(app);
}

export { db };
export default app;
