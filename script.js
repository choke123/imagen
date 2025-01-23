const uploadInput = document.getElementById("uploadInput");
const extractedTextElement = document.getElementById("extractedText");

// Procesar archivo subido
uploadInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    extractedTextElement.textContent = "Procesando...";
    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;
      await processOCR(imageData);
    };
    reader.readAsDataURL(file);
  } else {
    extractedTextElement.textContent = "No se seleccionó ningún archivo.";
  }
});

// Procesar OCR con Tesseract.js
async function processOCR(imageData) {
  try {
    const result = await Tesseract.recognize(imageData, "spa", {
      logger: (info) => console.log(info), // Opcional: muestra el progreso en la consola
    });

    const text = result.data.text;
    const vouchersData = extractVouchers(text);
    extractedTextElement.textContent = formatExtractedVouchersData(vouchersData);
  } catch (error) {
    extractedTextElement.textContent = "Error al procesar el texto.";
    console.error("Error de OCR:", error);
  }
}

// Extraer datos de múltiples vouchers (sin buscar datos específicos)
function extractVouchers(text) {
  const vouchers = [];
  const lines = text.split('\n'); // Divide el texto en líneas

  let currentVoucher = '';
  lines.forEach(line => {
    if (line.trim() === '') {
      if (currentVoucher) {
        vouchers.push(currentVoucher.trim());
        currentVoucher = ''; // Resetea para el siguiente voucher
      }
    } else {
      currentVoucher += line + '\n'; // Acumula la información de cada voucher
    }
  });

  // Asegura que el último voucher se agregue
  if (currentVoucher.trim()) {
    vouchers.push(currentVoucher.trim());
  }

  return vouchers;
}

// Formatear los datos extraídos
function formatExtractedVouchersData(vouchers) {
  if (vouchers.length === 0) {
    return "No se encontraron datos válidos.";
  }
  return vouchers
    .map((voucher, index) => 
      `Voucher ${index + 1}:\n${voucher}\n`
    )
    .join("\n");
}
