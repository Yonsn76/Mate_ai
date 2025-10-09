import { useState, useEffect } from 'react'

interface InicioProps {
  theme?: string
}

export default function Inicio({ theme = 'dark' }: InicioProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-accent/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-content">Bienvenido a Mate AI</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-content leading-tight">
            Aprende de forma
            <br />
            <span className="bg-gradient-to-r from-accent via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Inteligente
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-content/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Plataforma educativa potenciada por inteligencia artificial para mejorar tu experiencia de aprendizaje
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 w-full sm:w-auto">
              <span className="relative z-10">Comenzar Ahora</span>
            </button>
            <button className="px-8 py-4 bg-surface/50 backdrop-blur-sm border border-accent/20 hover:border-accent/50 text-content rounded-xl font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              Explorar Cursos
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Estudiantes' },
              { number: '50+', label: 'Cursos' },
              { number: '100+', label: 'Profesores' },
              { number: '95%', label: 'Satisfacción' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 delay-${index * 100} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-sm text-content/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-content">
            Características Principales
          </h2>
          <p className="text-center text-content/70 mb-16 max-w-2xl mx-auto">
            Descubre todo lo que Mate AI tiene para ofrecerte
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Aprendizaje Personalizado',
                description: 'Contenido adaptado a tu nivel y ritmo de aprendizaje'
              },
              {
                icon: '🤖',
                title: 'IA Avanzada',
                description: 'Asistencia inteligente disponible 24/7 para resolver tus dudas'
              },
              {
                icon: '📊',
                title: 'Seguimiento de Progreso',
                description: 'Monitorea tu avance con estadísticas detalladas'
              },
              {
                icon: '👥',
                title: 'Grupos de Estudio',
                description: 'Colabora con otros estudiantes y aprende en comunidad'
              },
              {
                icon: '📝',
                title: 'Evaluaciones',
                description: 'Pon a prueba tus conocimientos con cuestionarios interactivos'
              },
              {
                icon: '🏆',
                title: 'Logros',
                description: 'Obtén reconocimientos por tus avances y logros'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-surface/30 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-content">{feature.title}</h3>
                <p className="text-content/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-accent/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-accent/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-content">
                ¿Listo para comenzar tu viaje?
              </h2>
              <p className="text-lg text-content/70 mb-8">
                Únete a miles de estudiantes que ya están transformando su forma de aprender
              </p>
              <button className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50">
                Registrarse Gratis
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}





