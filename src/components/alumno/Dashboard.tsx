import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { apiService } from '../../services/api'
import Card from '../common/Card'

export default function AlumnoDashboard() {
  const { user, login } = useAuth()
  const [perfil, setPerfil] = useState<any>(null)
  const [anuncios, setAnuncios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [perfilData, anunciosData] = await Promise.all([
        apiService.getMe(),
        apiService.getAnunciosAlumno().catch(() => [])
      ])
      setPerfil(perfilData)
      setAnuncios(anunciosData.slice(0, 3)) // Últimos 3
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card title="Dashboard">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white/70 mt-4">Cargando...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Bienvenida - Cursor.com style */}
      <Card className="animated-gradient">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              ¡Hola, {user?.nombre?.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/70 text-lg">
              Bienvenido a tu panel de estudiante
            </p>
          </div>
          <div className="text-right px-6 py-4 rounded-2xl glass-card">
            <p className="text-sm text-white/60 uppercase tracking-wide mb-1">Grado y Sección</p>
            <p className="text-3xl font-bold gradient-text">
              {perfil?.grado || 'N/A'}{perfil?.seccion ? `°${perfil.seccion}` : ''}
            </p>
          </div>
        </div>
      </Card>

      {/* Resumen - Cursor.com style cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Docente */}
        <Card hover className="cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 blur opacity-30" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Mi Docente</p>
              <p className="font-bold text-white text-lg leading-tight">
                {perfil?.docenteAsignado?.nombre?.split(' ')[0] || 'Sin asignar'}
              </p>
            </div>
          </div>
        </Card>

        {/* Solicitudes */}
        <Card hover className="cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 blur opacity-30" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Solicitudes</p>
              <p className="font-bold text-white text-lg leading-tight">0 Pendientes</p>
            </div>
          </div>
        </Card>

        {/* Anuncios */}
        <Card hover className="cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 blur opacity-30" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Anuncios</p>
              <p className="font-bold text-white text-lg leading-tight">{anuncios.length} Nuevos</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Información del Docente - Premium style */}
      {perfil?.docenteAsignado && (
        <Card title="Mi Docente" subtitle="Información de tu profesor asignado">
          <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-all">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                {perfil.docenteAsignado.nombre.charAt(0)}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 blur-xl opacity-40" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-xl mb-1">{perfil.docenteAsignado.nombre}</p>
              <p className="text-white/70 mb-2">{perfil.docenteAsignado.correo}</p>
              {perfil.docenteAsignado.especialidad && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30">
                  <span className="text-violet-300 text-sm font-medium">
                    {perfil.docenteAsignado.especialidad}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Anuncios Recientes - Premium style */}
      {anuncios.length > 0 && (
        <Card title="Anuncios Recientes" subtitle="Últimos mensajes de tu docente">
          <div className="space-y-4">
            {anuncios.map((anuncio, idx) => (
              <div 
                key={idx} 
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white text-lg group-hover:text-violet-300 transition-colors">
                    {anuncio.titulo}
                  </h3>
                  <span className="text-xs text-white/40 bg-white/[0.05] px-3 py-1 rounded-full">
                    {anuncio.fecha}
                  </span>
                </div>
                <p className="text-white/70 leading-relaxed">{anuncio.contenido}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sin docente asignado - Premium CTA */}
      {!perfil?.docenteAsignado && (
        <Card className="border-2 border-dashed border-white/[0.15]">
          <div className="text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 blur-2xl opacity-30" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Aún no tienes un docente asignado
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
              Busca y envía una solicitud a tu profesor para comenzar tu aprendizaje
            </p>
            <button className="btn-primary">
              Buscar Docente
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}

