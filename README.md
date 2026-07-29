# Virtual STEAM Demo (Virtual-STEM Bolivia)

Prototipo de Laboratorio Químico Virtual de Alta Fidelidad para educación técnica de secundaria en Bolivia (Ley 070).

## 🚀 Inicio Rápido

```bash
# Instalación de dependencias
npm install

# Servidor de desarrollo local
npm run dev

# Ejecutar pruebas unitarias automatizadas (Vitest)
npm test

# Compilación de producción
npm run build
```

---

## 🧪 Suite de Pruebas Unitarias

Las pruebas del motor químico (`simulacionQuimicaEngine.js`) evalúan:
1. **Lab 1 (Molaridad CuSO₄)**: Cálculo de masa estequiométrica (6.242 g), tolerancia analítica (< 1.5%) y detección de error de menisco/balanza.
2. **Lab 2 (Volumetría Ácido-Base)**: Curvas de pH por Henderson-Hasselbalch, neutralización en equivalencia (80 mL NaOH) y viraje óptico con fenolftaleína.
3. **Lab 3 (Espejo de Plata / Tollens)**: Validación de secuencia estricta de reactivos ($AgNO_3 \rightarrow NaOH \rightarrow NH_4OH \rightarrow \text{Glucosa}$) y cinemática de Arrhenius a 60°C.

---

## ⚙️ Guía de Configuración CI/CD & Secretos de GitHub

Para activar la ejecución automática de pruebas Snyk y el despliegue a Firebase Hosting en cada `push` a `main`:

1. Ingresa a tu repositorio en GitHub: `https://github.com/AndresAlberdi/virtual-steam-demo`
2. Ve a **Settings** > **Secrets and variables** > **Actions**.
3. Haz clic en **New repository secret** y agrega los siguientes dos secretos:

### Secret 1: `SNYK_TOKEN`
- **Nombre**: `SNYK_TOKEN`
- **Valor**: Tu token de API personal de Snyk (obtenido en [snyk.io](https://snyk.io) > *Account Settings* > *API Token*).

### Secret 2: `FIREBASE_SERVICE_ACCOUNT_VIRTUAL_STEAM_DEMO`
- **Nombre**: `FIREBASE_SERVICE_ACCOUNT_VIRTUAL_STEAM_DEMO`
- **Valor**: La clave JSON de la cuenta de servicio de Firebase (generada en la Consola de Firebase > *Project Settings* > *Service accounts* > *Generate new private key*).

> ⚠️ **Garantía de Seguridad**: Los secretos de la aplicación están aislados en las variables de entorno de GitHub Actions (`${{ secrets.SNYK_TOKEN }}`) y **NUNCA** se incluyen ni publican en el código fuente ni en el sitio web desplegado.
