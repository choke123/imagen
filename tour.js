// tour.js
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si el tour ya ha sido mostrado
    if (localStorage.getItem('hasVisited') !== 'true') {
        iniciarTour();
        // Marcar que el usuario ya ha visitado la página
        localStorage.setItem('hasVisited', 'true');
    }
});

function iniciarTour() {
   
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            classes: 'shepherd',
            scrollTo: true
        }
    });

    tour.addStep({
        title: 'Bienvenido, amigo usuario!',
        text: 'Esta herramienta te ayudará  hacer el cuadre de tu cb.',
        attachTo: {
            element: '.chat-box',
            on: 'top'
        },
        buttons: [
            {
                text: 'Siguiente',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'Completa el formulario',
        text: 'En cada campo de texto podrás ingresar la cantidad de dinero correspondiente a cada una de las operaciones que haces en tu corresponsal.',
        attachTo: {
            element: '#cierreDiaAnterior',
            on: 'right'
        },
        buttons: [
            {
                text: 'Siguiente',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'logros',
        text: 'Recuerda, si tienes un un valor negativo en tus ajustes colocar el signo negativo(-)',
        attachTo: {
            element: '#logros',
            on: 'right'
        },
        buttons: [
            {
                text: 'Siguiente',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'Revisa el total',
        text: 'Aquí se mostrará el total que deberás tener de dinero en tu corresponsal.',
        attachTo: {
            element: '#total',
            on: 'left'
        },
        buttons: [
            {
                text: 'Siguiente',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'Descuadre',
        text: 'Si visualizas el valor en 0 significa que no estas descuadrado y si presentas otro valor, tu cb presenta un descuadre.',
        attachTo: {
            element: '#totalDescuadre',
            on: 'right'
        },
        buttons: [
            {
                text: 'Finalizar',
                action: tour.next
            }
        ]
    });

    // Iniciar el tour
    tour.start();
}
