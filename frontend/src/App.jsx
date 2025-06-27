import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [pdf, setPdf] = useState(null);
  const [resumen, setResumen] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type === "application/pdf") {
      setPdf(file);
      setError("");
    } else {
      setError("Por favor selecciona un archivo PDF válido");
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!pdf) {
      setError("Por favor selecciona un archivo PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdf);

    setLoading(true);
    setResumen("");
    setError("");

    try {
      //const apiUrl = process.env.VITE_API_URL;
      const res = await fetch(`http://127.0.0.1:5000/resumir`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }
      
      const data = await res.json();
      if (data.resumen) {
        setResumen(data.resumen);
      } else {
        throw new Error("No se recibió un resumen válido");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Error al procesar el PDF. Verifica que el servidor esté funcionando.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPdf(null);
    setResumen("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="main-content">
              <h1 className="hero-title">🧠 ResumenIA</h1>
              <p className="hero-subtitle">
                Convierte cualquier PDF en un resumen inteligente con IA
              </p>

              <div className="upload-card">
                <form onSubmit={handleUpload}>
                  <div
                    className={`upload-area ${dragOver ? "drag-over" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      {pdf ? "¡Archivo seleccionado!" : "Arrastra tu PDF aquí o haz clic para seleccionar"}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileInputChange}
                      className="file-input"
                    />
                    {!pdf && (
                      <label className="file-input-label">
                        Seleccionar archivo
                      </label>
                    )}
                  </div>

                  {pdf && (
                    <div className="selected-file fade-in">
                      <div className="selected-file-icon">✅</div>
                      <div className="selected-file-name">{pdf.name}</div>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn btn-outline-light btn-sm"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="error-message fade-in">
                      <div className="error-icon">⚠️</div>
                      <div>{error}</div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !pdf}
                    className={`submit-btn ${loading ? "loading" : ""}`}
                  >
                    {loading ? "Generando resumen..." : "✨ Generar resumen inteligente"}
                  </button>
                </form>
              </div>

              {resumen && (
                <div className="result-card fade-in">
                  <div className="result-header">
                    <div className="result-icon">📋</div>
                    <h2 className="result-title">Resumen generado</h2>
                  </div>
                  <div className="result-content">
                    {resumen.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <footer className="footer">
                <div className="footer-content">
                  <p className="footer-text">
                    Desarrollado por <span className="footer-author">Marcos Soares</span>
                  </p>
                  <div className="social-links">
                    <a 
                      href="https://github.com/MrTorfick" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link github"
                      title="GitHub"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/marcossoares1/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link linkedin"
                      title="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
