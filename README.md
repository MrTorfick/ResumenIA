# 🧠 ResumenIA - AI PDF Summarizer

Un resumidor inteligente de PDFs utilizando IA (Google Gemini) con una interfaz moderna desarrollada en React.

![ResumenIA](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-18-blue) ![Flask](https://img.shields.io/badge/Flask-3.0-green) ![Python](https://img.shields.io/badge/Python-3.9+-yellow)

## ✨ Características

- 📄 **Procesamiento de PDFs**: Extrae y procesa texto de documentos PDF
- 🤖 **IA Integrada**: Utiliza Google Gemini para generar resúmenes inteligentes
- 🎨 **Interfaz Moderna**: Diseño minimalista estilo AI con drag & drop
- 📱 **Responsive**: Funciona perfectamente en desktop y móvil
- ⚡ **Tiempo Real**: Procesamiento rápido con indicadores de carga

## 🏗️ Estructura del Proyecto

```
Resumen inteligente de PDFs o artículos/
├── backend/                # Servidor Flask (Python)
│   ├── app.py             # Aplicación principal
│   ├── .env.example       # Variables de entorno
│   └── README.md         # Documentación del backend
├── frontend/             # Cliente React
│   ├── src/
│   │   ├── App.jsx      # Componente principal
│   │   ├── App.css      # Estilos
│   │   └── main.jsx     # Punto de entrada
│   ├── package.json     # Dependencias Node.js
│   ├── vite.config.js   # Configuración Vite
│   └── README.md        # Documentación del frontend
└── README.md            # Este archivo
```

## 🚀 Instalación y Uso

### Backend (Flask)

1. **Navegar al directorio backend:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configurar variables de entorno:**
   - Crear archivo `.env` en la carpeta backend
   - Agregar tu API key de Google Gemini:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

4. **Ejecutar el servidor:**
   ```bash
   python app.py
   ```
   El servidor estará disponible en `http://localhost:{puerto}`

### Frontend (React)

1. **Navegar al directorio frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

## 🛠️ Tecnologías Utilizadas

### Backend
- **Flask**: Framework web de Python
- **Google Gemini AI**: Generación de resúmenes inteligentes  
- **Flask-CORS**: Manejo de CORS para comunicación frontend-backend
- **python-dotenv**: Manejo de variables de entorno

### Frontend
- **React 18**: Biblioteca de interfaz de usuario
- **Vite**: Herramienta de build rápida
- **Bootstrap 5**: Framework CSS
- **CSS Custom**: Diseño moderno con gradientes y animaciones

## 🎯 Cómo Usar

2. **Abrir la aplicación** en tu navegador
3. **Seleccionar o arrastrar** un archivo PDF
4. **Hacer clic en "Generar resumen inteligente"**
5. **Esperar** a que la IA procese el documento
6. **Leer** el resumen generado

## 🔑 Configuración de API

Para usar Google Gemini AI:

1. Visita [Google AI Studio](https://aistudio.google.com/apikey)
2. Crea una API key
3. Crear archivo `.env` en la carpeta backend y agregar:
   ```env
   GEMINI_API_KEY=tu_api_key_real_aqui
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```


## 👨‍💻 Desarrollado por

**Marcos Soares**
- GitHub: [@MrTorfick](https://github.com/MrTorfick)
- LinkedIn: [marcossoares1](https://www.linkedin.com/in/marcossoares1/)

---
