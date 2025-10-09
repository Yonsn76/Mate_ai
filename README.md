# Mate AI - React + Vite + Tailwind CSS

Este es un proyecto de React creado con Vite y configurado con Tailwind CSS usando el plugin oficial de Vite.

## 🚀 Características

- ⚡ **Vite** - Herramienta de construcción rápida
- ⚛️ **React 18** - Biblioteca de UI moderna
- 🎨 **Tailwind CSS** - Framework de CSS utilitario
- 📦 **TypeScript** - Tipado estático
- 🔧 **ESLint** - Linter para código limpio

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 🛠️ Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del proyecto

```
src/
├── App.tsx          # Componente principal
├── App.css          # Estilos del componente App
├── main.tsx         # Punto de entrada de la aplicación
├── index.css        # Estilos globales con Tailwind CSS
└── vite-env.d.ts    # Tipos de Vite
```

## 🎨 Tailwind CSS

Este proyecto está configurado con Tailwind CSS usando el plugin oficial de Vite. Puedes usar todas las clases utilitarias de Tailwind directamente en tus componentes.

### Ejemplo de uso:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  ¡Hola mundo con Tailwind!
</div>
```
