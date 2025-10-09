# Configuración de la API

## Pasos para conectar el frontend con el backend

### 1. Iniciar el servidor backend

```bash
cd Mate_ai_api
npm start
# o para desarrollo con auto-reload:
npm run dev
```

El servidor debería iniciar en `http://localhost:3000`

### 2. Configurar la URL de la API (Opcional)

El frontend está configurado para usar `http://localhost:3000/api` por defecto.

Si necesitas cambiar la URL, crea un archivo `.env` en la carpeta `Mate_ai`:

```bash
cd Mate_ai
# Copiar el archivo de ejemplo
copy env.example .env
# o en Mac/Linux: cp env.example .env
```

Luego edita `.env` y cambia la URL si es necesario:

```
VITE_API_URL=http://localhost:3000/api
```

### 3. Iniciar el frontend

```bash
cd Mate_ai
npm run dev
```

El frontend debería iniciar en `http://localhost:5173` (o el puerto que Vite asigne)

## Funcionalidades implementadas

### Login
- Endpoint: `POST /api/usuarios/login`
- Campos requeridos: `correo`, `contrasena`
- Retorna: token JWT y datos del usuario

### Registro de Alumno
- Endpoint: `POST /api/usuarios/registro`
- Campos requeridos: `nombre`, `correo`, `contrasena`, `rol: 'alumno'`
- Campos opcionales: `grado`
- Retorna: token JWT y datos del usuario

### Registro de Docente
- Endpoint: `POST /api/usuarios/registro`
- Campos requeridos: `nombre`, `correo`, `contrasena`, `rol: 'docente'`
- Campos opcionales: `especialidad`, `gradosAsignados`
- Retorna: token JWT y datos del usuario

## Persistencia de datos

Los datos de autenticación se guardan en `localStorage`:
- `token`: Token JWT para autenticación
- `usuario`: Información del usuario (id, nombre, correo, rol)

## Manejo de errores

Los formularios incluyen:
- Validación de campos requeridos
- Mensajes de error en rojo
- Mensajes de éxito en verde
- Estados de carga (botones deshabilitados durante la petición)
- Auto-recarga de la página después de login/registro exitoso

## Estructura del código

### Frontend
- `src/services/api.ts`: Servicio para comunicación con la API
- `src/components/AuthForms.tsx`: Formularios de login y registro

### Backend
- `src/routes/usuarios.js`: Endpoints de autenticación
- `src/models/Usuario.js`: Modelo de datos de usuario
- `src/middleware/auth.js`: Middleware de autenticación JWT
