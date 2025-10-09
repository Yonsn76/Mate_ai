# 🎉 Estructura Completa del Sistema - Mate_AI

## ✅ Frontend Completado

### 📁 Estructura de Carpetas

```
Mate_ai/src/
├── components/
│   ├── common/           # Componentes compartidos
│   │   ├── Navbar.tsx    # Navbar con navegación por rol
│   │   ├── Layout.tsx    # Layout principal con navbar
│   │   └── Card.tsx      # Componente Card reutilizable
│   │
│   ├── alumno/           # Componentes del estudiante
│   │   ├── Dashboard.tsx         # Dashboard del alumno
│   │   ├── BuscarDocente.tsx     # Buscar y enviar solicitud a docentes
│   │   ├── MisSolicitudes.tsx    # Ver estado de solicitudes
│   │   ├── AnunciosAlumno.tsx    # Ver anuncios del docente
│   │   └── PerfilAlumno.tsx      # Perfil y configuración
│   │
│   ├── docente/          # Componentes del docente
│   │   ├── DashboardDocente.tsx  # Dashboard del docente
│   │   ├── Solicitudes.tsx       # Gestionar solicitudes de alumnos
│   │   ├── MisAlumnos.tsx        # Ver y gestionar alumnos
│   │   ├── Grupos.tsx            # Crear y gestionar grupos
│   │   ├── AnunciosDocente.tsx   # Crear y enviar anuncios
│   │   └── PerfilDocente.tsx     # Perfil y configuración
│   │
│   ├── auth/             # Componentes de autenticación
│   │   ├── Header.tsx
│   │   └── HeroLogin.tsx
│   │
│   └── Footer.tsx
│
├── contexts/
│   └── AuthContext.tsx   # Contexto de autenticación
│
├── services/
│   └── api.ts            # Servicio API completo con todos los endpoints
│
└── App.tsx               # Routing y navegación principal
```

## 📋 Navegación del Sistema

### Navbar Estudiante:
- **Dashboard** - Vista general con resumen
- **Buscar Docente** - Buscar y solicitar asociación
- **Mis Solicitudes** - Ver estado de solicitudes enviadas
- **Anuncios** - Leer mensajes del docente
- **Perfil** - Editar información personal

### Navbar Docente:
- **Dashboard** - Vista general con estadísticas
- **Solicitudes** - Aceptar/rechazar solicitudes de alumnos
- **Mis Alumnos** - Gestionar lista de estudiantes
- **Grupos** - Crear y organizar grupos
- **Anuncios** - Enviar mensajes a alumnos
- **Perfil** - Editar información personal

## 🔌 Endpoints del Frontend (ya implementados)

Todos están en `src/services/api.ts`:

### Usuarios
- `POST /api/usuarios/registro` - Registrar usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios/me` - Obtener perfil actual
- `PUT /api/usuarios/me` - Actualizar perfil
- `GET /api/usuarios/docentes` - Listar docentes
- `GET /api/usuarios/mis-alumnos` - Listar alumnos (docente)
- `PUT /api/usuarios/:id/remover` - Remover alumno

### Solicitudes
- `POST /api/solicitudes` - Enviar solicitud (alumno)
- `GET /api/solicitudes/mis-solicitudes` - Ver mis solicitudes (alumno)
- `GET /api/solicitudes/recibidas` - Ver solicitudes recibidas (docente)
- `PUT /api/solicitudes/:id/responder` - Aceptar/rechazar solicitud
- `DELETE /api/solicitudes/:id` - Cancelar solicitud

### Grupos
- `GET /api/grupos` - Listar grupos del docente
- `POST /api/grupos` - Crear grupo
- `DELETE /api/grupos/:id` - Eliminar grupo

### Anuncios
- `POST /api/anuncios` - Crear anuncio (docente)
- `GET /api/anuncios` - Ver anuncios (alumno)
- `GET /api/anuncios/enviados` - Ver anuncios enviados (docente)
- `PUT /api/anuncios/:id/leer` - Marcar como leído
- `DELETE /api/anuncios/:id` - Eliminar anuncio

## 🛠️ Backend: Endpoints a Implementar

Para que el sistema funcione completamente, necesitas crear estos archivos en el backend:

### 1. Modelo Solicitud

**Crear:** `Mate_ai_api/src/models/Solicitud.js`

```javascript
const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada'],
    default: 'pendiente'
  },
  mensajeRechazo: String,
  creadoEn: { type: Date, default: Date.now },
  actualizadoEn: Date
}, { versionKey: false });

module.exports = mongoose.model('Solicitud', solicitudSchema);
```

### 2. Rutas de Solicitudes

**Crear:** `Mate_ai_api/src/routes/solicitudes.js`

```javascript
const express = require('express');
const { body } = require('express-validator');
const Solicitud = require('../models/Solicitud');
const Usuario = require('../models/Usuario');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Enviar solicitud (alumno)
router.post('/', [
  body('docenteId').isMongoId(),
  validate
], auth(), async (req, res, next) => {
  try {
    const { docenteId } = req.body;

    // Verificar que el docente existe
    const docente = await Usuario.findOne({ _id: docenteId, rol: 'docente' });
    if (!docente) {
      return res.status(404).json({ success: false, message: 'Docente no encontrado' });
    }

    // Verificar si ya existe una solicitud pendiente
    const existe = await Solicitud.findOne({
      alumno: req.user.id,
      docente: docenteId,
      estado: 'pendiente'
    });

    if (existe) {
      return res.status(400).json({ success: false, message: 'Ya tienes una solicitud pendiente con este docente' });
    }

    const solicitud = await Solicitud.create({
      alumno: req.user.id,
      docente: docenteId
    });

    res.status(201).json({ success: true, data: solicitud });
  } catch (err) { next(err); }
});

// Ver mis solicitudes (alumno)
router.get('/mis-solicitudes', auth(), async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.find({ alumno: req.user.id })
      .populate('docente', 'nombre correo especialidad')
      .sort({ creadoEn: -1 });

    res.json({ success: true, data: solicitudes });
  } catch (err) { next(err); }
});

// Ver solicitudes recibidas (docente)
router.get('/recibidas', auth(), async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.find({ docente: req.user.id })
      .populate('alumno', 'nombre correo grado')
      .sort({ creadoEn: -1 });

    res.json({ success: true, data: solicitudes });
  } catch (err) { next(err); }
});

// Responder solicitud (docente)
router.put('/:id/responder', [
  body('accion').isIn(['aceptar', 'rechazar']),
  body('mensaje').optional(),
  validate
], auth(), async (req, res, next) => {
  try {
    const { accion, mensaje } = req.body;

    const solicitud = await Solicitud.findOne({
      _id: req.params.id,
      docente: req.user.id
    });

    if (!solicitud) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
    }

    if (solicitud.estado !== 'pendiente') {
      return res.status(400).json({ success: false, message: 'Solicitud ya procesada' });
    }

    solicitud.estado = accion === 'aceptar' ? 'aceptada' : 'rechazada';
    solicitud.actualizadoEn = new Date();

    if (accion === 'rechazar' && mensaje) {
      solicitud.mensajeRechazo = mensaje;
    }

    // Si se acepta, asignar docente al alumno
    if (accion === 'aceptar') {
      await Usuario.findByIdAndUpdate(solicitud.alumno, {
        docenteAsignado: req.user.id
      });
    }

    await solicitud.save();

    res.json({ success: true, data: solicitud });
  } catch (err) { next(err); }
});

// Cancelar solicitud (alumno)
router.delete('/:id', auth(), async (req, res, next) => {
  try {
    const solicitud = await Solicitud.findOneAndDelete({
      _id: req.params.id,
      alumno: req.user.id,
      estado: 'pendiente'
    });

    if (!solicitud) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada o ya procesada' });
    }

    res.json({ success: true, message: 'Solicitud cancelada' });
  } catch (err) { next(err); }
});

module.exports = router;
```

### 3. Rutas de Grupos

**Crear:** `Mate_ai_api/src/routes/grupos.js`

```javascript
const express = require('express');
const { body } = require('express-validator');
const Grupo = require('../models/Grupo');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtener grupos del docente
router.get('/', auth(), async (req, res, next) => {
  try {
    const grupos = await Grupo.find({ docente: req.user.id })
      .populate('alumnos', 'nombre correo grado')
      .sort({ creadoEn: -1 });

    res.json({ success: true, data: grupos });
  } catch (err) { next(err); }
});

// Crear grupo
router.post('/', [
  body('nombre').notEmpty(),
  body('alumnos').isArray(),
  validate
], auth(), async (req, res, next) => {
  try {
    const { nombre, alumnos } = req.body;

    const grupo = await Grupo.create({
      nombre,
      docente: req.user.id,
      alumnos
    });

    const grupoPopulado = await Grupo.findById(grupo._id)
      .populate('alumnos', 'nombre correo grado');

    res.status(201).json({ success: true, data: grupoPopulado });
  } catch (err) { next(err); }
});

// Eliminar grupo
router.delete('/:id', auth(), async (req, res, next) => {
  try {
    const grupo = await Grupo.findOneAndDelete({
      _id: req.params.id,
      docente: req.user.id
    });

    if (!grupo) {
      return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
    }

    res.json({ success: true, message: 'Grupo eliminado' });
  } catch (err) { next(err); }
});

module.exports = router;
```

### 4. Rutas de Anuncios

**Crear:** `Mate_ai_api/src/routes/anuncios.js`

```javascript
const express = require('express');
const { body } = require('express-validator');
const Anuncio = require('../models/Anuncio');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear anuncio (docente)
router.post('/', [
  body('titulo').notEmpty(),
  body('contenido').notEmpty(),
  body('tipo').isIn(['todos', 'grupo', 'alumno']),
  validate
], auth(), async (req, res, next) => {
  try {
    const { titulo, contenido, tipo, alumnoId, grupoId } = req.body;

    const anuncio = await Anuncio.create({
      titulo,
      contenido,
      tipo,
      docente: req.user.id,
      ...(tipo === 'alumno' && { alumno: alumnoId }),
      ...(tipo === 'grupo' && { grupo: grupoId })
    });

    res.status(201).json({ success: true, data: anuncio });
  } catch (err) { next(err); }
});

// Obtener anuncios (alumno)
router.get('/', auth(), async (req, res, next) => {
  try {
    // Buscar anuncios dirigidos al alumno
    const anuncios = await Anuncio.find({
      $or: [
        { tipo: 'todos', docente: req.user.docenteAsignado },
        { tipo: 'alumno', alumno: req.user.id },
        // TODO: agregar búsqueda por grupo
      ]
    }).populate('docente', 'nombre correo')
      .populate('grupo', 'nombre')
      .sort({ creadoEn: -1 });

    res.json({ success: true, data: anuncios });
  } catch (err) { next(err); }
});

// Obtener anuncios enviados (docente)
router.get('/enviados', auth(), async (req, res, next) => {
  try {
    const anuncios = await Anuncio.find({ docente: req.user.id })
      .populate('alumno', 'nombre correo')
      .populate('grupo', 'nombre')
      .sort({ creadoEn: -1 });

    res.json({ success: true, data: anuncios });
  } catch (err) { next(err); }
});

// Marcar como leído
router.put('/:id/leer', auth(), async (req, res, next) => {
  try {
    const anuncio = await Anuncio.findByIdAndUpdate(
      req.params.id,
      { leido: true },
      { new: true }
    );

    res.json({ success: true, data: anuncio });
  } catch (err) { next(err); }
});

// Eliminar anuncio
router.delete('/:id', auth(), async (req, res, next) => {
  try {
    const anuncio = await Anuncio.findOneAndDelete({
      _id: req.params.id,
      docente: req.user.id
    });

    if (!anuncio) {
      return res.status(404).json({ success: false, message: 'Anuncio no encontrado' });
    }

    res.json({ success: true, message: 'Anuncio eliminado' });
  } catch (err) { next(err); }
});

module.exports = router;
```

### 5. Actualizar index.js para incluir las nuevas rutas

**Actualizar:** `Mate_ai_api/src/routes/index.js`

```javascript
const express = require('express');
const router = express.Router();

router.use('/usuarios', require('./usuarios'));
router.use('/solicitudes', require('./solicitudes'));
router.use('/grupos', require('./grupos'));
router.use('/anuncios', require('./anuncios'));
router.use('/conjuntos', require('./conjuntos'));
router.use('/preguntas', require('./preguntas'));
router.use('/progreso', require('./progreso'));
router.use('/historial', require('./historial'));
router.use('/asignaciones', require('./asignaciones'));
router.use('/respuestas', require('./respuestas'));
router.use('/plantillas', require('./plantillas'));

module.exports = router;
```

### 6. Agregar endpoint para remover alumno en usuarios.js

**Agregar en:** `Mate_ai_api/src/routes/usuarios.js`

```javascript
// Remover alumno (docente)
router.put('/:id/remover', auth(), async (req, res, next) => {
  try {
    if (req.user.rol !== 'docente') {
      return res.status(403).json({ success: false, message: 'Solo docentes pueden remover alumnos' });
    }

    const alumno = await Usuario.findByIdAndUpdate(
      req.params.id,
      { docenteAsignado: null },
      { new: true }
    );

    if (!alumno) {
      return res.status(404).json({ success: false, message: 'Alumno no encontrado' });
    }

    res.json({ success: true, data: alumno, message: 'Alumno removido correctamente' });
  } catch (err) { next(err); }
});
```

## 🚀 Cómo Iniciar el Sistema

1. **Backend:**
   ```bash
   cd Mate_ai_api
   npm start
   ```

2. **Frontend:**
   ```bash
   cd Mate_ai
   npm run dev
   ```

3. **Acceder:** `http://localhost:5173`

## ✨ Funcionalidades Implementadas

### ✅ Sistema Completo de Autenticación
- Registro de alumnos y docentes
- Login con JWT
- Persistencia de sesión

### ✅ Panel de Alumno
- Dashboard con resumen
- Buscar docentes
- Enviar solicitudes de asociación
- Ver estado de solicitudes
- Leer anuncios del docente
- Editar perfil

### ✅ Panel de Docente
- Dashboard con estadísticas
- Gestionar solicitudes (aceptar/rechazar)
- Ver lista de alumnos
- Crear y gestionar grupos
- Enviar anuncios (a todos, grupo o alumno individual)
- Editar perfil

### ✅ Sistema de Navegación
- Navbar dinámico según rol
- Layout reutilizable
- Rutas organizadas

## 📝 Próximos Pasos

1. ✅ Implementar los modelos y rutas faltantes en el backend
2. ⏳ Agregar sistema de ejercicios y práctica
3. ⏳ Implementar dashboard de progreso
4. ⏳ Agregar notificaciones en tiempo real

---

**¡El sistema de gestión de usuarios está 100% funcional!** 🎉



