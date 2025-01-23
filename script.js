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
    const vouchersData = extractMultipleVouchers(text);
    extractedTextElement.textContent = formatExtractedVouchersData(vouchersData);
  } catch (error) {
    extractedTextElement.textContent = "Error al procesar el texto.";
    console.error("Error de OCR:", error);
  }
}

// Extraer datos de múltiples vouchers
function extractMultipleVouchers(text) {
  const vouchers = [];
  const voucherRegex = /Producto:\s*(.*)\n.*Titular:\s*(.*)\n.*VALOR\s*\$\s*([\d,]+)/g;
  let match;

  while ((match = voucherRegex.exec(text)) !== null) {
    vouchers.push({
      producto: match[1].trim(),
      titular: match[2].trim(),
      valor: match[3].replace(',', '').trim(),
    });
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
      `Voucher ${index + 1}:\nProducto: ${voucher.producto}\nTitular: ${voucher.titular}\nValor: $${voucher.valor}\n`
    )
    .join("\n");
}
