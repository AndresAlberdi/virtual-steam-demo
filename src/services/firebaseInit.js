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
  getFirestore
} from "firebase/firestore";

// Configuración de Firebase para Virtual STEAM Demo (Spark Plan)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyVirtualSTEAMDemo2026",
  authDomain: "virtual-steam-demo.firebaseapp.com",
  projectId: "virtual-steam-demo",
  storageBucket: "virtual-steam-demo.appspot.com",
  messagingSenderId: "109876543210",
  appId: "1:109876543210:web:virtualsteamdemo2026"
};

// Inicializar la aplicación de Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });
    console.log("🔥 Firebase: Persistencia offline multi-pestaña inicializada correctamente para el proyecto 'virtual-steam-demo'.");
  } catch (error) {
    console.warn("⚠️ Firebase: No se pudo inicializar caché persistente multi-pestaña. Usando Firestore por defecto.", error);
    db = getFirestore(app);
  }
} catch (e) {
  console.warn("⚠️ Firebase operando en modo simulación local sin conexión directa.", e);
}

export { auth, db };
export default app;
