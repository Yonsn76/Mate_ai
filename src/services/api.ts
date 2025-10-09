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
  especialidad?: string
  gradosAsignados?: string[]
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición')
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
}

export const apiService = new ApiService()
export type { LoginData, RegistroData, AuthResponse }
