from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Obtener API key desde .env
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY no encontrada. Configura tu archivo .env")

# Configurar cliente de Gemini
client = genai.Client(api_key=api_key)

app = Flask(__name__)
CORS(app)

# Configurar límite de archivo a 50MB
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024


@app.route("/resumir", methods=["POST"])
def resumir_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No se envió ningún archivo"}), 400

    file = request.files["file"]
    if not file.filename.endswith(".pdf"):
        return jsonify({"error": "El archivo debe ser un PDF"}), 400

    # Verificar tamaño del archivo
    file.seek(0, 2)
    file_size = file.tell()
    file.seek(0)
    
    if file_size > 50 * 1024 * 1024:  # 50MB
        return jsonify({"error": "El archivo es demasiado grande (máximo 50MB)"}), 400

    try:
        # Leer el contenido del PDF como bytes
        pdf_bytes = file.read()

        prompt = """
Actúa como un experto resumidor de documentos. Tu tarea es crear un resumen claro y conciso de este PDF.

INSTRUCCIONES:
- Analiza todo el contenido del documento
- Extrae solo las ideas más importantes y relevantes
- Usa un lenguaje simple y directo
- Organiza la información en párrafos cortos (máximo 3-4 líneas cada uno)
- Evita repeticiones y información redundante
- Mantén un tono profesional pero accesible
- Si hay datos importantes, inclúyelos de manera resumida

FORMATO DE SALIDA:
- Párrafos separados por líneas en blanco
- Máximo 3-5 párrafos en total
- Cada párrafo debe abordar un tema específico

RESUMEN:
"""

        # Generar contenido usando la nueva API de Gemini con PDF directo
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=pdf_bytes,
                    mime_type='application/pdf',
                ),
                prompt
            ]
        )

        return jsonify({
            "resumen": response.text,
            "info": {
                "tamaño_archivo": f"{file_size / 1024 / 1024:.2f} MB",
                "metodo": "procesamiento_directo_pdf"
            }
        })

    except Exception as e:
        return jsonify({"error": f"Error al procesar el PDF: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
    
