# Guía para Probar el Registro de Usuarios

## ✅ Cambios Implementados

Se ha completado la implementación de la funcionalidad de registro para alumnos y docentes:

### Backend (API)
1. ✅ Modelo `Usuario` actualizado con campo `docenteAsignado`
2. ✅ Endpoints de registro funcionando
3. ✅ Validaciones implementadas
4. ✅ Endpoints adicionales:
   - `GET /api/usuarios/docentes` - Listar docentes
   - `PUT /api/usuarios/asignar-docente` - Asignar docente a alumno
   - `GET /api/usuarios/mis-alumnos` - Ver alumnos de un docente

### Frontend (React)
1. ✅ Servicio API conectado
2. ✅ Formularios de registro actualizados
3. ✅ Manejo de errores implementado
4. ✅ Estados de carga agregados

## 🚀 Cómo Probar

### Paso 1: Iniciar la API

```bash
cd Mate_ai_api
npm start
```

**Resultado esperado:**
```
✓ Server running on port 3000
📦 MongoDB Connected: ...
```

### Paso 2: Iniciar el Frontend

En otra terminal:

```bash
cd Mate_ai
npm run dev
```

**Resultado esperado:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Paso 3: Registrar un Docente

1. Abre `http://localhost:5173/`
2. Haz clic en la pestaña **"Registro"**
3. Selecciona **"Docente"**
4. Completa el formulario:
   - **Nombre:** María García
   - **Correo:** maria@colegio.edu
   - **Contraseña:** password123 (mínimo 8 caracteres)
   - **Repetir contraseña:** password123
   - **Especialidad:** Matemáticas
   - **Grados asignados:** 
     - Grado: 3, Sección: A (clic en "Agregar")
     - Grado: 4, Sección: B (clic en "Agregar")
5. Clic en **"Crear cuenta de docente"**

**Resultado esperado:**
- ✅ El usuario se registra exitosamente
- ✅ Eres redirigido al panel (próximamente)
- ✅ Los datos se guardan en MongoDB

### Paso 4: Registrar un Alumno

1. Si ya iniciaste sesión, cierra sesión primero
2. Haz clic en la pestaña **"Registro"**
3. Selecciona **"Alumno"**
4. Completa el formulario:
   - **Nombre:** Juan Pérez
   - **Correo:** juan@colegio.edu
   - **Contraseña:** password123
   - **Repetir contraseña:** password123
   - **Grado:** 3
   - **Sección:** A
   - **Código Docente:** (opcional, déjalo vacío por ahora)
5. Clic en **"Crear cuenta de alumno"**

**Resultado esperado:**
- ✅ El alumno se registra exitosamente
- ✅ Eres redirigido al panel (próximamente)
- ✅ Los datos se guardan en MongoDB

### Paso 5: Verificar en la Base de Datos

#### Opción A: Usando MongoDB Compass

1. Abre MongoDB Compass
2. Conecta a `mongodb://localhost:27017`
3. Abre la base de datos `mateai`
4. Abre la colección `usuarios`
5. Verifica que existan los usuarios creados

**Deberías ver:**
```json
{
  "_id": ObjectId("..."),
  "nombre": "María García",
  "correo": "maria@colegio.edu",
  "rol": "docente",
  "especialidad": "Matemáticas",
  "gradosAsignados": ["3°A", "4°B"],
  "creadoEn": ISODate("...")
}
```

```json
{
  "_id": ObjectId("..."),
  "nombre": "Juan Pérez",
  "correo": "juan@colegio.edu",
  "rol": "alumno",
  "grado": "3°A",
  "docenteAsignado": null,
  "creadoEn": ISODate("...")
}
```

#### Opción B: Usando la API directamente

En una terminal:

```bash
# Listar todos los usuarios
curl http://localhost:3000/api/usuarios

# Listar solo docentes
curl http://localhost:3000/api/usuarios?rol=docente

# Listar solo alumnos
curl http://localhost:3000/api/usuarios?rol=alumno
```

## 🧪 Pruebas Adicionales

### Probar Login

1. Ve a la pestaña **"Login"**
2. Ingresa las credenciales que usaste en el registro
3. Haz clic en **"Login"**

**Resultado esperado:**
- ✅ Inicias sesión correctamente
- ✅ El usuario aparece en el contexto de autenticación

### Probar Validaciones

Intenta registrarte con:

1. **Correo duplicado:**
   - Usa el mismo correo que ya registraste
   - **Esperado:** Error "Correo ya registrado"

2. **Contraseñas no coinciden:**
   - Escribe contraseñas diferentes
   - **Esperado:** Error "Las contraseñas no coinciden"

3. **Contraseña muy corta:**
   - Escribe menos de 8 caracteres
   - **Esperado:** Error "La contraseña debe tener al menos 8 caracteres"

## 🔍 Verificar en Consola del Navegador

Abre las DevTools (F12) y ve a la pestaña **Console**:

- No deberías ver errores rojos
- Si hay un error, toma captura y repórtalo

## 📝 Próximos Pasos

Una vez que el registro funcione correctamente:

1. ✅ Implementar asignación de docente a alumno
2. ✅ Crear panel de alumno
3. ✅ Crear panel de docente
4. ✅ Implementar funcionalidad de ejercicios

## ❌ Problemas Comunes

### Error: "Failed to fetch" o "Network error"

**Causa:** La API no está corriendo o la URL no es correcta

**Solución:**
1. Verifica que la API esté corriendo en `http://localhost:3000`
2. Verifica el archivo `.env` en `Mate_ai/`:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

### Error: "MongoServerError: connect ECONNREFUSED"

**Causa:** MongoDB no está corriendo

**Solución:**
- Windows: Inicia el servicio MongoDB desde Servicios
- Mac/Linux: `sudo systemctl start mongod` o `brew services start mongodb-community`

### Error: "Correo ya registrado"

**Causa:** Ya existe un usuario con ese correo

**Solución:**
- Usa otro correo
- O elimina el usuario existente de la base de datos

### El botón de "Crear cuenta" no hace nada

**Causa:** Faltan campos requeridos o hay errores de validación

**Solución:**
- Revisa que todos los campos obligatorios estén llenos
- Abre la consola del navegador (F12) para ver errores

## 📞 Contacto

Si encuentras algún problema que no puedes resolver, verifica:
1. Los logs de la API en la terminal
2. La consola del navegador (F12)
3. El estado de MongoDB

---

¡Listo! Ahora puedes registrar usuarios y ver cómo se guardan en la base de datos. 🎉



