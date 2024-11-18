async function calcularTotal() {
    // Obtener el valor del token reCAPTCHA
    const recaptchaResponse = document.querySelector(".g-recaptcha-response").value;

    if (!recaptchaResponse) {
        alert("Por favor, completa el reCAPTCHA.");
        return;
    }

    // Verificar el token en la consola del navegador
    console.log("Token reCAPTCHA: ", recaptchaResponse);  // Muestra el token en la consola

    try {
        // Verificar el token con tu servidor
        const secretKey = "6Lfxxn4qAAAAAC_QsF9cwZUF8AI8W2schAmpIwsT"; // Cambia a tu clave secreta
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secretKey}&response=${recaptchaResponse}`,
        });

        const result = await response.json();

        // Verificar si la validación fue exitosa
        if (result.success) {
            console.log("Verificación reCAPTCHA exitosa:", result); // Verifica la respuesta en la consola
            // Lógica del cálculo si el reCAPTCHA es exitoso
            procesarCalculo();
        } else {
            console.log("Falló la verificación del reCAPTCHA:", result);  // Muestra detalles de la falla en la consola
            alert("Fallo en la verificación de reCAPTCHA. Intenta de nuevo.");
        }
    } catch (error) {
        console.error("Error en la verificación del reCAPTCHA:", error);
        alert("Error al verificar reCAPTCHA. Por favor, intenta más tarde.");
    }
}
