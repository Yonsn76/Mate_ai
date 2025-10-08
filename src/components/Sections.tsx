export default function Sections() {
  return (
    <div className="relative z-10">
      <section id="services" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">Services</h2>
        <div className="glass-card p-6 md:p-8">
          <ul className="list-disc pl-5 space-y-2 text-white/90">
            <li>Práctica personalizada de matemáticas impulsada por IA.</li>
            <li>Generación automática de ejercicios y pistas adaptadas a cada alumno.</li>
            <li>Asignación inteligente de tareas y control de progreso para docentes.</li>
            <li>Reportes y dashboards en tiempo real sobre rendimiento estudiantil.</li>
            <li>Mensajería interna y anuncios para facilitar la comunicación educativa.</li>
            <li>Soporte multiplataforma: web y móvil.</li>
          </ul>
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">About us</h2>
        <div className="glass-card p-6 md:p-8">
          <p className="text-white/90">
            Mate_AI es una plataforma educativa innovadora que permite a estudiantes y docentes
            practicar, crear y asignar ejercicios de matemáticas en línea, usando inteligencia artificial
            para generar problemas personalizados y pistas adaptativas. Nuestra misión es hacer del
            aprendizaje matemático una experiencia interactiva, inclusiva y relevante para cada usuario,
            en cualquier nivel académico.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-white/90">
            <li>Aprende matemáticas con ejercicios dinámicos y explicaciones paso a paso.</li>
            <li>Docentes pueden crear, asignar y monitorear avances de sus clases en tiempo real.</li>
            <li>Basado en IA generativa y análisis inteligente de progreso.</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">Contact us</h2>
        <div className="glass-card p-6 md:p-8">
          <p className="text-white/90 mb-4">
            ¿Tienes preguntas, quieres unirte o necesitas soporte?
          </p>
          <ul className="space-y-2 text-white/90">
            <li>Email: contacto@mateai.com</li>
            <li>WhatsApp: +51 987 654 321</li>
            <li>Dirección: Jr. Principal 234, Huánuco, Perú</li>
          </ul>
          <p className="text-white/90 mt-4">
            ¡Estamos para ayudarte a transformar la enseñanza y el aprendizaje de las matemáticas!
          </p>
        </div>
      </section>
    </div>
  )
}