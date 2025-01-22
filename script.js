const video = document.getElementById("camera");
const captureButton = document.getElementById("captureButton");
const canvas = document.getElementById("snapshot");
const ctx = canvas.getContext("2d");
const extractedTextElement = document.getElementById("extractedText");

const constraints = {
  video: {
    facingMode: "environment", // Cámara trasera
  },
};

// Función para habilitar la cámara
async function enableCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
  } catch (error) {
    alert("Error al acceder a la cámara: " + error.message);
    console.error("Error:", error);
  }
}

// Capturar una imagen del video
captureButton.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convertir la imagen a formato base64
  const imageData = canvas.toDataURL("image/png");
  processOCR(imageData);
});

// Procesar OCR con Tesseract.js
async function processOCR(imageData) {
  extractedTextElement.textContent = "Procesando...";
  try {
    const result = await Tesseract.recognize(imageData, "spa", {
      logger: (info) => console.log(info), // Opcional: muestra el progreso en la consola
    });

    // Filtrar datos específicos del texto
    const text = result.data.text;
    const extractedData = extractVoucherData(text);
    extractedTextElement.textContent = formatExtractedData(extractedData);
  } catch (error) {
    extractedTextElement.textContent = "Error al procesar el texto.";
    console.error("Error de OCR:", error);
  }
}

// Función para extraer datos específicos del voucher
function extractVoucherData(text) {
  return {
    producto: text.match(/Producto:\s*(.*)/i)?.[1]?.trim() || "No encontrado",
    valor: text.match(/VALOR\s*\$\s*([\d,]+)/i)?.[1]?.trim() || "No encontrado",
    titular: text.match(/Titular:\s*(.*)/i)?.[1]?.trim() || "No encontrado",
    recibo: text.match(/Recibo:\s*(\d+)/i)?.[1]?.trim() || "No encontrado",
  };
}

// Formatear los datos extraídos para mostrarlos en pantalla
function formatExtractedData(data) {
  return `
    Producto: ${data.producto}
    Valor: $${data.valor}
    Titular: ${data.titular}
    Recibo: ${data.recibo}
  `;
}

enableCamera();
