# Backend - ResumenIA

Servidor Flask que maneja el procesamiento de PDFs y la generación de resúmenes usando Google Gemini AI.

## 🚀 Instalación

```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
# Crear archivo .env con:
# GEMINI_API_KEY=tu_api_key_aqui
# FLASK_ENV=development
# FLASK_DEBUG=True

# Ejecutar servidor
python app.py
```

## 📋 Dependencias

- **flask**: Framework web
- **flask-cors**: Manejo de CORS
- **google-generativeai**: API de Google Gemini
- **python-dotenv**: Manejo de variables de entorno

## 🔗 Endpoints

### POST /resumir
Procesa un PDF y devuelve un resumen generado por IA.

**Request:**
- Content-Type: multipart/form-data
- Body: archivo PDF en campo 'file'

**Response:**
```json
{
  "resumen": "Texto del resumen generado por IA...",
  "info": {
    "tamaño_archivo": "2.5 MB",
    "metodo": "procesamiento_directo_pdf"
  }
}
```

**Errores:**
- 400: No se proporcionó archivo o archivo inválido
- 500: Error en procesamiento

## ⚙️ Configuración

Variables de entorno requeridas en `.env`:

```env
GEMINI_API_KEY=tu_api_key_de_google_gemini
FLASK_ENV=development
FLASK_DEBUG=True
MAX_CONTENT_LENGTH=16777216
UPLOAD_FOLDER=./uploads
```
