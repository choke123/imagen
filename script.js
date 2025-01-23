const uploadInput = document.getElementById("uploadInput");
const extractedTextElement = document.getElementById("extractedText");

uploadInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    extractedTextElement.textContent = "Procesando...";
    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;
      const processedImage = await preprocessImage(imageData); // Preprocesar imagen
      await processOCR(processedImage);
    };
    reader.readAsDataURL(file);
  } else {
    extractedTextElement.textContent = "No se seleccionó ningún archivo.";
  }
});

async function preprocessImage(imageData) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = imageData;

  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convertir a escala de grises
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const gray = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
        pixels[i] = gray;
        pixels[i + 1] = gray;
        pixels[i + 2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);

      resolve(canvas.toDataURL());
    };
  });
}

async function processOCR(imageData) {
  try {
    const result = await Tesseract.recognize(imageData, "spa", {
      logger: (info) => console.log(info),
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:$',
    });

    extractedTextElement.textContent = result.data.text || "No se pudo extraer información.";
  } catch (error) {
    extractedTextElement.textContent = "Error al procesar el texto.";
    console.error("Error de OCR:", error);
  }
}
