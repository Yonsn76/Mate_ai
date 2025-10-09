// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface LoginData {
  correo: string
  contrasena: string
}

interface RegistroData {
  nombre: string
  correo: string
  contrasena: string
  rol: 'alumno' | 'docente'
  grado?: string
  seccion?: string
  especialidad?: string
  gradosAsignados?: string[]
  docenteAsignado?: string // ID del docente (opcional)
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

interface AuthResponse {
  token: string
  usuario: {
    id: string
    nombre: string
    correo: string
    rol: string
  }
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      // Manejar diferentes tipos de respuesta
      let data
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        // Si no es JSON, leer como texto
        const text = await response.text()
        data = { message: text }
      }

      if (!response.ok) {
        // Manejar errores específicos
        if (response.status === 429) {
          throw new Error('Demasiadas peticiones. Espera un momento antes de intentar nuevamente.')
        }
        if (response.status === 401) {
          throw new Error('Credenciales inválidas')
        }
        if (response.status === 500) {
          throw new Error('Error del servidor. Intenta más tarde.')
        }
        
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`)
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (response.data) {
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
    }

    return response.data!
  }

  async registro(datos: RegistroData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/usuarios/registro', {
      method: 'POST',
      body: JSON.stringify(datos),
    })

    if (response.data) {
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
    }

    return response.data!
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  getUsuario(): any | null {
    const usuario = localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : null
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Obtener lista de docentes disponibles
  async getDocentes(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/usuarios/docentes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Asignar docente a un alumno
  async asignarDocente(docenteId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/usuarios/asignar-docente', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ docenteId }),
    })
    return response.data
  }

  // Obtener alumnos de un docente
  async getMisAlumnos(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/usuarios/mis-alumnos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Obtener perfil del usuario actual
  async getMe(): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/usuarios/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // Actualizar perfil
  async updateProfile(updates: Partial<RegistroData>): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/usuarios/me', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })
    return response.data
  }

  // ===== SOLICITUDES =====
  
  // Enviar solicitud a docente
  async enviarSolicitud(docenteId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/solicitudes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ docenteId }),
    })
    return response.data
  }

  // Obtener mis solicitudes (alumno)
  async getMisSolicitudes(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/solicitudes/mis-solicitudes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Obtener solicitudes recibidas (docente)
  async getSolicitudesRecibidas(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/solicitudes/recibidas', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Responder solicitud (docente)
  async responderSolicitud(solicitudId: string, accion: 'aceptar' | 'rechazar', mensaje?: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/solicitudes/${solicitudId}/responder`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accion, mensaje }),
    })
    return response.data
  }

  // Cancelar solicitud (alumno)
  async cancelarSolicitud(solicitudId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/solicitudes/${solicitudId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // Remover alumno (docente)
  async removerAlumno(alumnoId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/usuarios/${alumnoId}/remover`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // ===== GRUPOS =====

  // Obtener grupos del docente
  async getGrupos(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/grupos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Crear grupo
  async crearGrupo(data: { nombre: string; alumnos: string[] }): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/grupos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.data
  }

  // Actualizar grupo
  async actualizarGrupo(grupoId: string, data: { nombre: string; descripcion?: string; alumnos: string[] }): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/grupos/${grupoId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.data
  }

  // Eliminar grupo
  async eliminarGrupo(grupoId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/grupos/${grupoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // ===== ANUNCIOS =====

  // Crear anuncio (docente)
  async crearAnuncio(data: { titulo: string; contenido: string; tipo: string; alumnoId?: string; grupoId?: string }): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/anuncios/crear', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.data
  }

  // Obtener anuncios enviados (docente)
  async getAnunciosEnviados(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/anuncios/enviados', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Obtener anuncios del alumno
  async getAnunciosAlumno(): Promise<any[]> {
    const token = this.getToken()
    const response = await this.request<any[]>('/anuncios/alumno', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Marcar anuncio como leído
  async marcarAnuncioLeido(anuncioId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/anuncios/${anuncioId}/leer`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // Eliminar anuncio
  async eliminarAnuncio(anuncioId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/anuncios/${anuncioId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // ===== PLANTILLAS =====

  // Crear plantilla
  async crearPlantilla(data: { titulo: string; contenido: string; categoria?: string; esPublica?: boolean }): Promise<any> {
    const token = this.getToken()
    const response = await this.request('/plantillas', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.data
  }

  // Obtener mis plantillas
  async getMisPlantillas(categoria?: string): Promise<any[]> {
    const token = this.getToken()
    const url = categoria ? `/plantillas/mis-plantillas?categoria=${categoria}` : '/plantillas/mis-plantillas'
    const response = await this.request<any[]>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Obtener plantillas públicas
  async getPlantillasPublicas(categoria?: string): Promise<any[]> {
    const token = this.getToken()
    const url = categoria ? `/plantillas/publicas?categoria=${categoria}` : '/plantillas/publicas'
    const response = await this.request<any[]>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  }

  // Obtener plantilla por ID
  async getPlantilla(plantillaId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/plantillas/${plantillaId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // Actualizar plantilla
  async actualizarPlantilla(plantillaId: string, data: { titulo?: string; contenido?: string; categoria?: string; esPublica?: boolean }): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/plantillas/${plantillaId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.data
  }

  // Usar plantilla (incrementar contador)
  async usarPlantilla(plantillaId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/plantillas/${plantillaId}/usar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // Eliminar plantilla
  async eliminarPlantilla(plantillaId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/plantillas/${plantillaId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  // Duplicar plantilla pública
  async duplicarPlantilla(plantillaId: string): Promise<any> {
    const token = this.getToken()
    const response = await this.request(`/plantillas/${plantillaId}/duplicar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
}

export const apiService = new ApiService()
export type { LoginData, RegistroData, AuthResponse }
