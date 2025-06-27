# Frontend - ResumenIA

Interfaz de usuario moderna desarrollada en React con Vite para el resumidor de PDFs con IA.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🎨 Características

- **Drag & Drop**: Arrastra archivos PDF directamente
- **Validación**: Solo acepta archivos PDF válidos
- **Estados de carga**: Indicadores visuales durante el procesamiento
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Animaciones**: Transiciones suaves y efectos modernos

## 🛠️ Tecnologías

- **React 18**: Biblioteca de UI
- **Vite**: Build tool
- **Bootstrap 5**: Framework CSS
- **CSS Custom**: Estilos personalizados

## 📱 Diseño

- **Paleta**: Gradientes púrpura-azul sobre fondo oscuro
- **Tipografía**: Inter font para legibilidad
- **Efectos**: Glassmorphism y micro-interacciones
- **Estilo**: Minimalista tipo AI (ChatGPT, Claude)


## 🌐 API Integration

La aplicación se conecta al backend Flask en `http://localhost:{puerto]/resumir` para procesar los PDFs.

## 📝 Estructura de Archivos

```
src/
├── App.jsx      # Componente principal con lógica de upload
├── App.css      # Estilos personalizados
├── main.jsx     # Punto de entrada de React
└── assets/      # Recursos estáticos
```

## 🔧 Configuración de Vite

El proyecto utiliza Vite como build tool con configuración optimizada para React y desarrollo rápido.
