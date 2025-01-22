const video = document.getElementById("camera");
const canvas = document.getElementById("snapshot");
const context = canvas.getContext("2d");
const output = document.getElementById("data");

// Activar cámara
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => console.error("Error al acceder a la cámara:", error));

// Capturar imagen
document.getElementById("capture").addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  alert("Imagen capturada. Ahora presiona 'Extraer Información'");
});

// Procesar imagen con OCR
document.getElementById("extract").addEventListener("click", () => {
  const imageData = canvas.toDataURL("image/png");
  Tesseract.recognize(imageData, "spa")
    .then(({ data: { text } }) => {
      output.innerText = text;
    })
    .catch((error) => console.error("Error en OCR:", error));
});
