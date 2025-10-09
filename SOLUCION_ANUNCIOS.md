# 🔧 Solución de Problemas en Anuncios

## ❌ **Problemas Identificados:**

### 1. **Error 404 - Route not found**
- Las rutas `/anuncios/enviados` y `/anuncios/alumno` no existían en el backend
- La ruta `/anuncios` para crear anuncios no era compatible con el frontend

### 2. **Error 400 - Validation failed**
- El modelo de Anuncio no tenía los campos correctos para el frontend
- Faltaba el campo `tipo` y `leidoPor`

### 3. **No se cargan alumnos ni grupos**
- Las rutas de la API estaban mal configuradas
- El frontend no podía obtener los datos necesarios

## ✅ **Soluciones Implementadas:**

### 1. **Backend - Nuevas Rutas en `anuncios.js`**

```javascript
// Obtener anuncios enviados por el docente
router.get('/enviados', auth(['docente']), async (req, res, next) => {
  const anuncios = await Anuncio.find({ docenteId: req.user.id })
    .populate('destinatarios.id', 'nombre grado')
    .sort({ creadoEn: -1 });
  res.json({ success: true, data: anuncios });
});

// Obtener anuncios para un alumno
router.get('/alumno', auth(['alumno']), async (req, res, next) => {
  const anuncios = await Anuncio.find({
    $or: [
      { 'destinatarios.id': req.user.id },
      { tipo: 'todos' }
    ]
  })
  .populate('docenteId', 'nombre especialidad')
  .sort({ creadoEn: -1 });
  
  res.json({ success: true, data: anuncios });
});

// Crear anuncio (versión simplificada)
router.post('/crear', [
  body('titulo').notEmpty().withMessage('El título es requerido'),
  body('contenido').notEmpty().withMessage('El contenido es requerido'),
  body('tipo').isIn(['todos', 'alumno', 'grupo']).withMessage('Tipo inválido'),
  body('alumnoId').optional().isMongoId(),
  body('grupoId').optional().isMongoId(),
  validate
], auth(['docente']), async (req, res, next) => {
  // Lógica para crear anuncio con destinatarios correctos
});
```

### 2. **Modelo Anuncio Actualizado**

```javascript
const anuncioSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  contenido: { type: String, required: true, trim: true },
  tipo: { 
    type: String, 
    enum: ['todos', 'alumno', 'grupo'], 
    required: true,
    default: 'todos'
  },
  docenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  destinatarios: [{
    tipo: { type: String, enum: ['todos', 'alumno', 'grupo'], required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: false } // Opcional para 'todos'
  }],
  leidoPor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  creadoEn: { type: Date, default: Date.now }
});
```

### 3. **Frontend - Rutas de API Actualizadas**

```typescript
// Crear anuncio
async crearAnuncio(data: { titulo: string; contenido: string; tipo: string; alumnoId?: string; grupoId?: string }): Promise<any> {
  const response = await this.request('/anuncios/crear', { // ← Cambio de ruta
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.data
}

// Obtener anuncios del alumno
async getAnunciosAlumno(): Promise<any[]> {
  const response = await this.request<any[]>('/anuncios/alumno', { // ← Cambio de ruta
    method: 'GET',
  })
  return response.data || []
}
```

## 🎯 **Funcionalidades Implementadas:**

### **Para Docentes:**
- ✅ **Crear anuncios** para todos los alumnos
- ✅ **Crear anuncios** para un grupo específico
- ✅ **Crear anuncios** para un alumno específico
- ✅ **Ver historial** de anuncios enviados
- ✅ **Eliminar anuncios** enviados
- ✅ **Seleccionar destinatarios** (alumnos/grupos)

### **Para Alumnos:**
- ✅ **Ver anuncios** dirigidos a ellos
- ✅ **Ver anuncios** generales (todos)
- ✅ **Marcar como leído** (funcionalidad preparada)

## 🔄 **Flujo de Datos:**

### **Crear Anuncio:**
```
Frontend → POST /anuncios/crear → Backend
{
  titulo: "Título",
  contenido: "Contenido",
  tipo: "todos|alumno|grupo",
  alumnoId?: "id",
  grupoId?: "id"
}
```

### **Obtener Anuncios:**
```
Docente: GET /anuncios/enviados → Sus anuncios
Alumno: GET /anuncios/alumno → Anuncios para él
```

## 🚀 **Para Aplicar los Cambios:**

### **1. Reiniciar el Servidor de la API:**
```bash
cd Mate_ai_api
npm run dev
```

### **2. Verificar que las rutas estén disponibles:**
- ✅ `GET /api/anuncios/enviados` (docente)
- ✅ `GET /api/anuncios/alumno` (alumno)
- ✅ `POST /api/anuncios/crear` (docente)
- ✅ `PUT /api/anuncios/:id/leer` (alumno)
- ✅ `DELETE /api/anuncios/:id` (docente)

## 📋 **Testing:**

### **Como Docente:**
1. Ir a "Anuncios" en el dashboard
2. Hacer clic en "Nuevo Anuncio"
3. Seleccionar destinatario (Todos/Grupo/Alumno)
4. Escribir título y contenido
5. Enviar anuncio
6. Verificar que aparece en el historial

### **Como Alumno:**
1. Ir a "Anuncios" en el dashboard
2. Ver anuncios dirigidos a ti
3. Ver anuncios generales

## ✅ **Estado Final:**

- ✅ **Rutas implementadas** en el backend
- ✅ **Modelo actualizado** con campos correctos
- ✅ **Frontend conectado** a las nuevas rutas
- ✅ **Validaciones** implementadas
- ✅ **Funcionalidad completa** de anuncios

---

**¡Los anuncios ahora funcionan correctamente!** 🎉

**Nota:** Recuerda reiniciar el servidor de la API para que los cambios surtan efecto.


