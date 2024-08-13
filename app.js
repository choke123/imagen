mapboxgl.accessToken = 'pk.eyJ1Ijoic2hva2UyMCIsImEiOiJjbHR2bWZjbGcxbzVoMmlzeTF4bnk3b3NpIn0.PE8C0RC9VlgXCZemLYL7hA'; // Reemplaza 'TU_TOKEN_DE_MAPBOX' con tu token
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/shoke20/clvfawoy4057e01pk312xarev', // Reemplaza 'TU_ESTILO_DE_MAPA' con el estilo de tu mapa
  center: [-72.50329208725987, 7.901515230337783], // Coordenadas de centro inicial
  zoom: 18 // Nivel de zoom inicial
});

// Crear marcador de ubicación actual
var userLocationMarker = null;

// Obtener la ubicación actual del usuario
navigator.geolocation.watchPosition(successLocation, errorLocation, { enableHighAccuracy: true });

function successLocation(position) {
  const { latitude, longitude } = position.coords;

  // Si el marcador ya existe, actualizar su posición
  if (userLocationMarker) {
    userLocationMarker.setLngLat([longitude, latitude]);
  } else {
    // Crear un marcador con un círculo personalizado para la ubicación actual
    var el = document.createElement('div');
    el.className = 'mapboxgl-user-location-dot';
    userLocationMarker = new mapboxgl.Marker({
      element: el,
      anchor: 'center'
    }).setLngLat([longitude, latitude]).addTo(map);
  }

  // Centrar el mapa en la ubicación actual
  map.setCenter([longitude, latitude]);
}

function errorLocation() {
  alert('No se pudo obtener la ubicación actual del usuario.');
}

// Función para crear icono personalizado
function createCustomIcon(iconUrl, size = [50, 50]) {
  var iconElement = document.createElement('div');
  iconElement.className = 'marker-icon';
  iconElement.style.backgroundImage = `url(${iconUrl})`;
  iconElement.style.width = `${size[0]}px`;
  iconElement.style.height = `${size[1]}px`;
  return iconElement;
}

// Agregar marcadores con información y estilos personalizados
// Marcador SENA
var markerSena = new mapboxgl.Marker({
  element: createCustomIcon('img/sena.jpg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.50329208725987, 7.901515230337783]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>SENA INDUSTRIAL</h3><p>Servicio Nacional de Aprendizaje.</p><img src="img/sena.jpg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);

// Marcador Biblioteca
var markerBiblioteca = new mapboxgl.Marker({
  element: createCustomIcon('img/biblioteca.jpg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503483, 7.900696]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Biblioteca</h3><p>Biblioteca de industria.</p><img src="img/biblioteca.jpg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


// Marcador Cancha Industria
var markerCanchain = new mapboxgl.Marker({
  element: createCustomIcon('img/canchain.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503403, 7.900761]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Canchain</h3><p>Cancha de industria.</p><img src="img/canchain.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


// Marcador Agencia de Empleo
var markerApe = new mapboxgl.Marker({
  element: createCustomIcon('img/ape.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503888, 7.900528]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Ape</h3><p> Agencia de Empleo.</p><img src="img/ape.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


  // Marcador Cancha Comercio
var markerCanchacomer = new mapboxgl.Marker({
  element: createCustomIcon('img/basque.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503132, 7.900049]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Canchacomer</h3><p> Cancha Comercio.</p><img src="img/basque.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


// Marcador Entrada de los Aprendices
var markerEntrada = new mapboxgl.Marker({
  element: createCustomIcon('img/entrada.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503403, 7.900761]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Entrada</h3><p> Entrada de los Aprendices.</p><img src="img/entrada.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


// Marcador Cancha futbool
var markerCancha = new mapboxgl.Marker({
  element: createCustomIcon('img/cancha.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503484, 7.89909]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Cancha </h3><p> Cancha Futbool.</p><img src="img/cancha.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


  // Marcador Tecnoparque
var markerTecnoparque = new mapboxgl.Marker({
  element: createCustomIcon('img/tecno.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.502703, 7.898330]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Tecnoparque </h3><p> Tecnoparque.</p><img src="img/tecno.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);



 // Marcador Gimnasio
 var markerGimnasio = new mapboxgl.Marker({
  element: createCustomIcon('img/gym.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503091, 7.898626]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Gimnasio </h3><p> Gimnasio.</p><img src="img/gym.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);



// Marcador Club
var markerClub = new mapboxgl.Marker({
  element: createCustomIcon('img/club.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503292, 7.898611]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Club </h3><p> Club.</p><img src="img/club.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);



// Marcador Cafeteria
var markerCafeteria = new mapboxgl.Marker({
  element: createCustomIcon('img/cafeteria.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.503222, 7.902151]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Cafeteria </h3><p> Cafeteria Industria.</p><img src="img/cafeteria.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);


// Marcador Baños
var markerBanos = new mapboxgl.Marker({
  element: createCustomIcon('img/baños.jpeg'), // Ruta de la imagen del icono
  anchor: 'bottom' // Anclar el icono al centro inferior del marcador
})
  .setLngLat([-72.5035325, 7.9006852]) // Coordenadas del marcador
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Baños</h3><p>Baños de caballero.</p><img src="img/baños.jpeg" alt="Imagen del lugar" style="max-width: 100%; height: auto;">'))
  .addTo(map);
  
  // Lista de lugares con sus marcadores
var places = [
  {
    name: "SENA INDUSTRIAL",
    coordinates: [-72.50329208725987, 7.901515230337783],
    icon: "img/sena.jpg",
    description: "Servicio Nacional de Aprendizaje."
  },
  {
    name: "BIBLIOTECA",
    coordinates: [-72.503483, 7.900696],
    icon: "img/cafeteria.jpg",
    description: "Biblioteca de industria."
  },
  {
    name: "BAÑOS",
    coordinates: [-72.5035325, 7.9006852],
    icon: "img/baños.jpeg",
    description: "Baños de caballero."
  },
  {
    name: "CLUB",
    coordinates: [-72.503292, 7.898611],
    icon: "img/club.jpeg",
    description: "Club."
  },
  {
    name: "CANCHA DE FUTBOL",
    coordinates: [-72.503484, 7.89909],
    icon: "img/cancha.jpeg",
    description: "CANCHA DE FUTBOL."
  },
  {
    name: "GIMNASIO",
    coordinates: [-72.503091, 7.898626],
    icon: "img/gym.jpeg",
    description: "Club."
  },
  {
    name: "TECNOPARQUE",
    coordinates: [-72.503292, 7.898611],
    icon: "img/tecno.jpeg",
    description: "TECNOPARQUE."
  },
  {
    name: "CANCHA MICROFUTBOL",
    coordinates: [-72.503132, 7.900049],
    icon: "img/basque.jpeg",
    description: "TECNOPARQUE."
  },
  {
    name: "APE",
    coordinates: [-72.503888, 7.900528],
    icon: "img/ape.jpeg",
    description: "AGENCIA PUBLICA DE EMPLEO."
  },
  {
    name: "Cafeteria",
    coordinates: [-72.503222, 7.902151],
    icon: "img/cafeteria.jpeg",
    description: " Cafeteria Industria."
  }
];

places.forEach((place) => {
  var marker = new mapboxgl.Marker({
    element: createCustomIcon(place.icon),
    anchor: 'bottom'
  })
    .setLngLat(place.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${place.name}</h3><p>${place.description}</p><img src="${place.icon}" alt="Imagen del lugar" style="max-width: 100%; height: auto;">`))
    .addTo(map);

  place.marker = marker;
});

// Implementar la barra de búsqueda con lista desplegable
var searchInput = document.getElementById('search-input');
var autocompleteList = document.getElementById('autocomplete-list');

searchInput.addEventListener('input', function () {
  var searchText = searchInput.value.toLowerCase();
  autocompleteList.innerHTML = '';

  var filteredPlaces = places.filter(place => place.name.toLowerCase().includes(searchText));

  filteredPlaces.forEach(place => {
    var listItem = document.createElement('div');
    listItem.className = 'autocomplete-item';
    listItem.textContent = place.name;
    listItem.addEventListener('click', function () {
      map.flyTo({
        center: place.coordinates,
        zoom: 18
      });
      place.marker.getPopup().addTo(map);
      autocompleteList.innerHTML = '';
      searchInput.value = place.name;
    });
    autocompleteList.appendChild(listItem);
  });
});

searchInput.addEventListener('blur', function () {
  setTimeout(() => {
    autocompleteList.innerHTML = '';
  }, 200);
});

// Evento para el botón de AR
document.getElementById('arButton').addEventListener('click', function () {
  window.location.href = 'ar.html';
});


