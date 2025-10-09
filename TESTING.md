# Guía de Pruebas

## Cómo probar la integración Login/Registro con la API

### Paso 1: Preparar el Backend

1. Asegúrate de tener MongoDB Atlas configurado (ya está en el `.env`)
2. Instala las dependencias si no lo has hecho:
   ```bash
   cd Mate_ai_api
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm run dev
   ```
4. Deberías ver en la consola:
   ```
   🚀 Server running on port 3000
   📦 MongoDB Connected: cluster0.7imrsfw.mongodb.net
   ```

### Paso 2: Preparar el Frontend

1. Instala las dependencias si no lo has hecho:
   ```bash
   cd Mate_ai
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre el navegador en la URL que aparece (normalmente `http://localhost:5173`)

### Paso 3: Probar el Registro

#### Registro de Alumno:
1. Haz clic en la pestaña "Registro Alumno"
2. Completa el formulario:
   - Nombre: Juan Pérez
   - Correo: juan@colegio.edu
   - Contraseña: 123456
   - Grado: 1ro A
3. Haz clic en "Crear cuenta de alumno"
4. Deberías ver un mensaje verde: "¡Cuenta creada exitosamente! Bienvenido Juan Pérez"
5. La página se recargará automáticamente

#### Registro de Docente:
1. Haz clic en la pestaña "Registro Docente"
2. Completa el formulario:
   - Nombre: María García
   - Correo: maria@colegio.edu
   - Contraseña: 123456
   - Especialidad: Matemática
   - Selecciona algunos grados (ej: 1ro A, 2do A)
3. Haz clic en "Crear cuenta de docente"
4. Deberías ver un mensaje verde de confirmación
5. La página se recargará automáticamente

### Paso 4: Probar el Login

1. Haz clic en la pestaña "Iniciar sesión"
2. Ingresa las credenciales de una cuenta creada:
   - Correo: juan@colegio.edu
   - Contraseña: 123456
3. Haz clic en "Iniciar sesión"
4. Deberías ver un mensaje verde: "¡Bienvenido Juan Pérez!"
5. La página se recargará automáticamente

### Paso 5: Verificar en la Base de Datos

Para verificar que los datos se guardaron correctamente:

1. Abre MongoDB Atlas en tu navegador
2. Ve a tu cluster
3. Navega a Collections > mate_ai > usuarios
4. Deberías ver los usuarios que creaste

### Paso 6: Verificar localStorage

Para verificar que el token se guardó:

1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Application" (o "Aplicación")
3. En el panel izquierdo, expande "Local Storage"
4. Haz clic en tu URL local
5. Deberías ver:
   - `token`: Un string largo (el JWT token)
   - `usuario`: Un objeto JSON con tus datos

### Casos de Error a Probar

1. **Campos vacíos**: Intenta enviar el formulario sin llenar campos
   - Debería mostrar: "Por favor completa todos los campos obligatorios"

2. **Contraseña corta**: Usa una contraseña de menos de 6 caracteres
   - Debería mostrar: "La contraseña debe tener al menos 6 caracteres"

3. **Correo duplicado**: Intenta registrarte con un correo ya usado
   - Debería mostrar: "Correo ya registrado"

4. **Credenciales incorrectas**: Intenta hacer login con datos incorrectos
   - Debería mostrar: "Credenciales inválidas"

5. **Backend apagado**: Apaga el servidor backend e intenta hacer login
   - Debería mostrar un error de conexión

### Verificar en la Consola del Navegador

Abre las DevTools (F12) y ve a la pestaña Console. Deberías ver:
- Información de las peticiones fetch
- Cualquier error que ocurra

### Verificar en la Consola del Backend

En la terminal donde corre el backend, deberías ver:
- Logs de las peticiones HTTP (gracias a Morgan)
- Cualquier error del servidor

## Estructura de Respuestas de la API

### Registro/Login exitoso:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": "64abc123...",
      "nombre": "Juan Pérez",
      "correo": "juan@colegio.edu",
      "rol": "alumno"
    }
  }
}
```

### Error:
```json
{
  "success": false,
  "message": "Correo ya registrado"
}
```
