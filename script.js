
function formatNumber(input) {
    // Reemplaza los puntos para manejar correctamente el número
    let value = input.value.replace(/\./g, '').replace(',', '.');
    
    // Permitir el signo negativo al inicio
    if (value.startsWith('-')) {
        value = value.replace('-', ''); // Elimina temporalmente el signo para formatear el número

        if (!isNaN(value) && value !== '') {
            let formattedValue = new Intl.NumberFormat('es-CO').format(value);
            input.value = `-${formattedValue}`; // Vuelve a agregar el signo negativo
        } else {
            input.value = '-'; // Si no hay valor después del signo, deja solo el signo
        }
    } else {
        // Si el valor es positivo o vacío
        if (!isNaN(value) && value !== '') {
            input.value = new Intl.NumberFormat('es-CO').format(value);
        } else {
            input.value = ''; // Asegúrate de que no deje "-0" o algún valor inválido
        }
    }
}

function calcularTotal() {
const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert("Por favor, complete el reCAPTCHA para continuar.");
        return; // Detener si el reCAPTCHA no está completado
    }
    // Obtener los valores de los campos, y si están vacíos, tratarlos como 0
    let saldoEfectivo = parseInt(document.getElementById('saldoEfectivo').value.replace(/\./g, '').replace(',', '.')) || 0;
    let saldoSomos = parseFloat(document.getElementById('saldoSomos').value.replace(/\./g, '').replace(',', '.')) || 0;
    let cierreDiaAnterior = parseFloat(document.getElementById("cierreDiaAnterior").value.replace(/\./g, '').replace(',', '.')) || 0;
    let retirosTarjeta = parseFloat(document.getElementById("retirosTarjeta").value.replace(/\./g, '').replace(',', '.')) || 0;
    let retirosST = parseFloat(document.getElementById("retirosST").value.replace(/\./g, '').replace(',', '.')) || 0;
    let depositos = parseFloat(document.getElementById("depositos").value.replace(/\./g, '').replace(',', '.')) || 0;
    let recaudos = parseFloat(document.getElementById("recaudos").value.replace(/\./g, '').replace(',', '.')) || 0;
    let abonoTarjeta = parseFloat(document.getElementById("abonoTarjeta").value.replace(/\./g, '').replace(',', '.')) || 0;
    let abonoCredito = parseFloat(document.getElementById("abonoCredito").value.replace(/\./g, '').replace(',', '.')) || 0;
    let compensaciones = parseFloat(document.getElementById("compensaciones").value.replace(/\./g, '').replace(',', '.')) || 0;
    let codigoComercio = document.getElementById("codigoComercio").value;
    let total = document.getElementById("total").value;
    let totalDescuadre = document.getElementById("totalDescuadre").value;
    let tipoDeCierreInput = document.querySelector('input[name="inlineRadioOptions"]:checked');
    let tipoDeCierre = tipoDeCierreInput?.value || '';
    let fechaCierre = document.getElementById("fechaCierre").value;

    if (!tipoDeCierre) {
        alert("Recuerde seleccionar qué tipo de cierre va a realizar");
        document.getElementById("T").focus(); // Opcional: enfoca el primer radio para comodidad del usuario
        return; // Detiene la ejecución si no hay selección
    }
    
    
    if (saldoSomos == "") {
        alert("El valor del cierre anterior es obligatorio.");
        return; // Detiene el proceso si no es válido
    }
    
    if (saldoEfectivo < 0 || saldoSomos < 0 || retirosTarjeta <0 || retirosST < 0 || depositos < 0 || recaudos < 0 || abonoTarjeta < 0 || abonoCredito < 0 ||compensaciones < 0) {
        alert("Los valores no pueden ser negativos.");
        return; // Detiene el proceso si hay un valor negativo  
    }

    if (codigoComercio<2000) {
        alert("Codigo de comercio no valido .");
        return; // Detiene el proceso si hay un valor negativo  
    }
    // Mostrar el total en el elemento <p> con formato monetario
    total = cierreDiaAnterior - retirosTarjeta - retirosST + depositos + recaudos + abonoTarjeta + abonoCredito - compensaciones;
    totalDescuadre = total - saldoEfectivo;
    let totalTransacional = total- saldoSomos;

    // Muestra los resultados
    
    document.getElementById("total").innerText = `Total efectivo: ${new Intl.NumberFormat('es-CO').format(total)}`;
    document.getElementById("totalDescuadre").innerText = `Descuadre: ${new Intl.NumberFormat('es-CO').format(totalDescuadre)}`;
    
    



    // Acumula mensajes de error
    let errorMessages = [];

    

    if (totalDescuadre < 0|| totalDescuadre > 0) {
        errorMessages.push({
            title: "<strong>Tienes un descuadre</strong>",
            html: `
            <div style="text-align: left;">
            <p>Realiza los siguientes pasos:</p>
            <ol>
            <li>                       Ingresa a la página <a href="https://www.somosbancolombia.com.co/login" target="_blank">www.somosbancolombia.com.co</a>, entra a la zona transaccional y seguidamente a <strong>movimientos</strong>.</li>
            <li>Con tu tira de cierre total, realiza el comparativo de la cantidad de transacciones que allí  registra con lo que tienes en movimientos.</li>
                <li>
                   
                    
            Después de realizar la validación. Si identificas que las transacciones que aparecen en la tira son las mismas que las de los movimientos, significa que tu descuadre es <strong>operativo</strong> (el CB debe responder por este recurso).
      <ul>  <li>Si las transacciones que aparecen en la tira son diferentes a los movimientos, significa que tu descuadre es <strong>transaccional</strong>.</li>
                    </ul>
                </li>
                <li>En caso de presentar un descuadre operativo o transaccional gestiona tu PQR en el siguiente enlace: <a href="https://www.districol.net/Districol/pqrs/pqrs" target="_blank">www.districol.net</a>.</li>
            </ol>
            </div>
            `,
        });
    }
    
    

  

    // Función para mostrar las alertas de manera secuencial
    function mostrarAlertas(messages) {
        if (messages.length === 0) return;

        const { title, html } = messages[0];
        Swal.fire({
            title: title,
            icon: "info",
            html: html,
            showCloseButton: true,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entendido',
        }).then(() => {
            // Mostrar la siguiente alerta después de cerrar la actual
            mostrarAlertas(messages.slice(1));
        });
    }

    // Mostrar alertas si hay errores
    if (errorMessages.length > 0) {
        mostrarAlertas(errorMessages);
    }

    
// campos obligatorios 

if (cierreDiaAnterior === "") {
    alert("El valor del cierre anterior es obligatorio.");
    return; // Detiene el proceso si no es válido
}

    if (codigoComercio === "" || codigoComercio.length > 5) {
        alert("El código de comercio es obligatorio y debe tener máximo 5 caracteres.");
        return;  // Detiene el envío si no es válido
    }
    
    // Llamar a la función para enviar los datos al backend
    enviarDatos(codigoComercio,saldoEfectivo, saldoSomos,cierreDiaAnterior, retirosTarjeta, retirosST, depositos, recaudos, abonoTarjeta, abonoCredito, compensaciones,total,totalDescuadre, tipoDeCierre,fechaCierre);
    

    document.querySelectorAll('input[name="inlineRadioOptions"]').forEach(radio => {
        radio.checked = false;
    });

    // Mostrar el botón de imprimir factura
    document.getElementById("imprimirFacturaBtn").style.display = "inline-block";
}


// Simulación de función para enviar datos al backend (a implementar)
function enviarDatos(codigoComercio,saldoEfectivo,saldoSomos, cierreDiaAnterior, retirosTarjeta, retirosST, depositos, recaudos, abonoTarjeta, abonoCredito, compensaciones,total,totalDescuadre,tipoDeCierre,fechaCierre) {
   
    const data = {
        codigoComercio,
        saldoEfectivo,
        saldoSomos,
        cierreDiaAnterior,
        retirosTarjeta,
        retirosST,
        depositos,
        recaudos,
        abonoTarjeta,
        abonoCredito,
        compensaciones,
        total,
        totalDescuadre,
        tipoDeCierre,
        fechaCierre
    };

    console.log("Datos enviados al backend:", data);
    // Aquí se debería realizar el envío al backend usando fetch o XMLHttpRequest.
}

function imprimirFactura() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cargar el logo desde una ruta local
    let logoPath = 'img/logo.jpg';

    // Cargar imagen y agregarla al PDF
    let img = new Image();
    img.src = logoPath;
    img.onload = function () {
        // Agregar el logo una vez cargado
        doc.addImage(img, 'JPEG', 10, 10, 50, 20); // (x, y, width, height)

        // Bloque naranja para el título
        doc.setFillColor(255, 165, 0); // Color naranja
        doc.rect(10, 35, 190, 15, 'F'); // (x, y, width, height, fill)

        // Título dentro del bloque
        doc.setFontSize(16);
        doc.setTextColor(255, 255, 255); // Color blanco para el texto
        doc.text('Cierre Manual', 15, 45);

        // Información del corresponsal y fecha
        let codigoComercio = document.getElementById("codigoComercio").value || 'N/A';
        let fechaActual = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Restablecer color negro para el texto
        doc.text(`Corresponsal: ${codigoComercio}`, 10, 60);
        doc.text(`Fecha: ${fechaActual}`, 10, 70);

        // Datos para la tabla
    let saldoEfectivo = parseInt(document.getElementById('saldoEfectivo').value.replace(/\./g, '').replace(',', '.')) || 0;
    let saldoSomos = parseFloat(document.getElementById('saldoSomos').value.replace(/\./g, '').replace(',', '.')) || 0;
    let cierreDiaAnterior = parseFloat(document.getElementById("cierreDiaAnterior").value.replace(/\./g, '').replace(',', '.')) || 0;
    let retirosTarjeta = parseFloat(document.getElementById("retirosTarjeta").value.replace(/\./g, '').replace(',', '.')) || 0;
    let retirosST = parseFloat(document.getElementById("retirosST").value.replace(/\./g, '').replace(',', '.')) || 0;
    let depositos = parseFloat(document.getElementById("depositos").value.replace(/\./g, '').replace(',', '.')) || 0;
    let recaudos = parseFloat(document.getElementById("recaudos").value.replace(/\./g, '').replace(',', '.')) || 0;
    let abonoTarjeta = parseFloat(document.getElementById("abonoTarjeta").value.replace(/\./g, '').replace(',', '.')) || 0;
    let abonoCredito = parseFloat(document.getElementById("abonoCredito").value.replace(/\./g, '').replace(',', '.')) || 0;
    let compensaciones = parseFloat(document.getElementById("compensaciones").value.replace(/\./g, '').replace(',', '.')) || 0;
        // Crear una tabla con los datos
        let data = [
          
            ['saldoEfectivo', `$${saldoEfectivo.toFixed(2)}`],
            ['saldoSomos', `$${saldoSomos.toFixed(2)}`],
            ['Cierre del día anterior', `$${cierreDiaAnterior.toFixed(2)}`],
            ['Retiros tarjeta', `-$${retirosTarjeta.toFixed(2)}`],
            ['Retiros ST', `-$${retirosST.toFixed(2)}`],
            ['Depósitos', `+$${depositos.toFixed(2)}`],
            ['Recaudos', `+$${recaudos.toFixed(2)}`],
            ['Abono tarjeta', `+$${abonoTarjeta.toFixed(2)}`],
            ['Abono crédito', `+$${abonoCredito.toFixed(2)}`],
            ['Compensaciones', `-$${compensaciones.toFixed(2)}`]
        ];

        // Generar la tabla usando autoTable
        doc.autoTable({
            startY: 80, // Donde empieza la tabla
            head: [['Descripción', 'Valor']],
            body: data,
            theme: 'grid',
            styles: {
                halign: 'right' // Alinear el contenido de las celdas a la derecha
            },
            headStyles: {
                fillColor: [255, 165, 0], // Color naranja para la cabecera
                textColor: [255, 255, 255], // Color blanco para el texto de la cabecera
            },
        });

        // Calcular el total
        let total = cierreDiaAnterior - retirosTarjeta - retirosST + depositos + recaudos + abonoTarjeta + abonoCredito - compensaciones;
        let totalDescuadre = total - saldoEfectivo;
        // Agregar el total
        let totalFormatted = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        let totalDescuadreFormatted = totalDescuadre.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        doc.setFontSize(14);
        doc.text(`TOTAL: ${totalFormatted}`, 10, doc.lastAutoTable.finalY + 10) ;    // Posición después de la tabla
        doc.text(`TOTAL DESCUADRE: ${totalDescuadreFormatted}`, 10, doc.lastAutoTable.finalY + 20);
        // Nota final
       

        // Descargar el PDF
        doc.save('factura.pdf');
    };
}

let alertShown = false; // Variable para controlar si la alerta ya fue mostrada

function mostrarAlerta() {
    // Si la alerta ya se mostró, no hacemos nada
    if (alertShown) {
        return;
    }
    
    // Mostrar la alerta utilizando SweetAlert
    Swal.fire({
        title: "Información Importante",
        text: "Recuerda poner el signo negativo si tienes saldo negativo.",
        icon: "info",
        confirmButtonText: "Entendido"
    }).then(() => {
        alertShown = true; // Marcamos que la alerta ha sido mostrada
    });
}
