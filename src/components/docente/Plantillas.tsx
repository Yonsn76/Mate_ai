import { useState, useEffect } from 'react'
import { apiService } from '../../services/api'
import Card from '../common/Card'

export default function PlantillasDocente() {
  const [plantillas, setPlantillas] = useState<any[]>([])
  const [plantillasPublicas, setPlantillasPublicas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarPublicas, setMostrarPublicas] = useState(false)
  const [categoriaFiltro, setCategoriaFiltro] = useState('')

  // Form state
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [categoria, setCategoria] = useState('general')
  const [esPublica, setEsPublica] = useState(false)
  const [guardando, setGuardando] = useState(false)

  // Edit state
  const [editando, setEditando] = useState<string | null>(null)

  const categorias = [
    { value: 'general', label: 'General', icon: '📝' },
    { value: 'recordatorio', label: 'Recordatorio', icon: '⏰' },
    { value: 'bienvenida', label: 'Bienvenida', icon: '👋' },
    { value: 'evaluacion', label: 'Evaluación', icon: '📊' },
    { value: 'tarea', label: 'Tarea', icon: '📋' },
    { value: 'evento', label: 'Evento', icon: '🎉' }
  ]

  useEffect(() => {
    cargarDatos()
  }, [categoriaFiltro])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [misPlantillas, publicas] = await Promise.all([
        apiService.getMisPlantillas(categoriaFiltro || undefined),
        apiService.getPlantillasPublicas(categoriaFiltro || undefined)
      ])
      setPlantillas(misPlantillas)
      setPlantillasPublicas(publicas)
    } catch (error) {
      console.error('Error cargando plantillas:', error)
    } finally {
      setLoading(false)
    }
  }

  const guardarPlantilla = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert('Título y contenido son requeridos')
      return
    }

    try {
      setGuardando(true)
      const data = {
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        categoria,
        esPublica
      }

      if (editando) {
        await apiService.actualizarPlantilla(editando, data)
        setPlantillas(plantillas.map(p => p._id === editando ? { ...p, ...data } : p))
      } else {
        const nuevaPlantilla = await apiService.crearPlantilla(data)
        setPlantillas([nuevaPlantilla, ...plantillas])
      }

      // Reset form
      setTitulo('')
      setContenido('')
      setCategoria('general')
      setEsPublica(false)
      setEditando(null)
      setMostrarFormulario(false)
      
      alert(editando ? 'Plantilla actualizada' : 'Plantilla guardada')
    } catch (error: any) {
      alert(error.message || 'Error al guardar plantilla')
    } finally {
      setGuardando(false)
    }
  }

  const editarPlantilla = (plantilla: any) => {
    setTitulo(plantilla.titulo)
    setContenido(plantilla.contenido)
    setCategoria(plantilla.categoria)
    setEsPublica(plantilla.esPublica)
    setEditando(plantilla._id)
    setMostrarFormulario(true)
  }

  const eliminarPlantilla = async (plantillaId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta plantilla?')) return

    try {
      await apiService.eliminarPlantilla(plantillaId)
      setPlantillas(plantillas.filter(p => p._id !== plantillaId))
      alert('Plantilla eliminada')
    } catch (error: any) {
      alert(error.message || 'Error al eliminar plantilla')
    }
  }

  const duplicarPlantilla = async (plantilla: any) => {
    try {
      const plantillaDuplicada = await apiService.duplicarPlantilla(plantilla._id)
      setPlantillas([plantillaDuplicada, ...plantillas])
      alert('Plantilla duplicada')
    } catch (error: any) {
      alert(error.message || 'Error al duplicar plantilla')
    }
  }

  const usarPlantilla = (plantilla: any) => {
    // Aquí podrías abrir el formulario de anuncios con la plantilla precargada
    // Por ahora solo incrementamos el contador
    apiService.usarPlantilla(plantilla._id)
    alert(`Plantilla "${plantilla.titulo}" seleccionada`)
  }

  const cancelarEdicion = () => {
    setTitulo('')
    setContenido('')
    setCategoria('general')
    setEsPublica(false)
    setEditando(null)
    setMostrarFormulario(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Plantillas de Anuncios</h2>
            <p className="text-white/70 text-sm">Guarda y reutiliza mensajes predeterminados</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setMostrarPublicas(!mostrarPublicas)}
              className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {mostrarPublicas ? 'Mis Plantillas' : 'Plantillas Públicas'}
            </button>
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:from-green-400 hover:to-emerald-500 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Plantilla
            </button>
          </div>
        </div>
      </Card>

      {/* Filtros */}
      <Card>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">Filtrar por categoría:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCategoriaFiltro('')}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                categoriaFiltro === '' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoriaFiltro(cat.value)}
                className={`px-3 py-1 rounded-full text-sm transition-all flex items-center gap-1 ${
                  categoriaFiltro === cat.value 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Formulario */}
      {mostrarFormulario && (
        <Card title={editando ? 'Editar Plantilla' : 'Nueva Plantilla'}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Título
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Recordatorio de tarea"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Contenido
              </label>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escribe el contenido de la plantilla..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                maxLength={1000}
              />
              <div className="text-right text-xs text-white/50 mt-1">
                {contenido.length}/1000 caracteres
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categorias.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-white/70">
                  <input
                    type="checkbox"
                    checked={esPublica}
                    onChange={(e) => setEsPublica(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30"
                  />
                  Hacer pública
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={guardarPlantilla}
                disabled={guardando}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:from-green-400 hover:to-emerald-500 transition-all disabled:opacity-50"
              >
                {guardando ? 'Guardando...' : (editando ? 'Actualizar' : 'Guardar Plantilla')}
              </button>
              <button
                onClick={cancelarEdicion}
                disabled={guardando}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Lista de plantillas */}
      <Card title={mostrarPublicas ? 'Plantillas Públicas' : 'Mis Plantillas'} subtitle={`${mostrarPublicas ? plantillasPublicas.length : plantillas.length} plantilla(s)`}>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white/70 mt-4">Cargando plantillas...</p>
          </div>
        ) : (mostrarPublicas ? plantillasPublicas : plantillas).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {mostrarPublicas ? 'No hay plantillas públicas' : 'No tienes plantillas'}
            </h3>
            <p className="text-white/70">
              {mostrarPublicas ? 'Explora las plantillas de otros docentes' : 'Crea tu primera plantilla para reutilizar mensajes'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(mostrarPublicas ? plantillasPublicas : plantillas).map((plantilla) => (
              <div
                key={plantilla._id}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {categorias.find(c => c.value === plantilla.categoria)?.icon || '📝'}
                      </span>
                      <h3 className="font-semibold text-white text-lg">
                        {plantilla.titulo}
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm mb-2 line-clamp-3">
                      {plantilla.contenido}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span className="px-2 py-1 rounded bg-white/10">
                        {categorias.find(c => c.value === plantilla.categoria)?.label || 'General'}
                      </span>
                      {plantilla.usos > 0 && (
                        <span>Usada {plantilla.usos} veces</span>
                      )}
                      {plantilla.esPublica && (
                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                          Pública
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => usarPlantilla(plantilla)}
                    className="flex-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 text-sm font-medium transition-all"
                  >
                    Usar
                  </button>
                  
                  {!mostrarPublicas ? (
                    <>
                      <button
                        onClick={() => editarPlantilla(plantilla)}
                        className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => eliminarPlantilla(plantilla._id)}
                        className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => duplicarPlantilla(plantilla)}
                      className="px-3 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all"
                      title="Duplicar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}


