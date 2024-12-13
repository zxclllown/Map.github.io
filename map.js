import maplibregl from 'maplibre-gl';

<!-- Контейнер для карты -->
<div id="map"></div>


    // Инициализация карты
    var map = new maplibregl.Map({
        container: 'map', // id элемента div для карты
        style: 'https://demotiles.maplibre.org/style.json', // URL стиля карты (open-source пример)
        center: [37.618423, 55.751244], // Координаты центра (Москва)
        zoom: 10 // Уровень зума
    });

    // Добавление контролов для зума и вращения карты
    map.addControl(new maplibregl.NavigationControl());

    // Добавление маркера на карту
    new maplibregl.Marker()
        .setLngLat([37.618423, 55.751244]) // Координаты маркера
        .setPopup(new maplibregl.Popup().setText("Москва")) // Добавление всплывающего окна
        .addTo(map);


// Добавление маркера на карту
const marker = new maplibregl.Marker()
    .setLngLat([37.618423, 55.751244]) // Установка координат маркера
    .addTo(map); // Добавление маркера на карту

// Всплывающее окно (popup) при клике на маркер
const popup = new maplibregl.Popup({ offset: 25 })
    .setText('Это Москва');

marker.setPopup(popup);

map.on('load', function () {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [37.618423, 55.751244]
                    },
                    'properties': {
                        'title': 'Москва',
                        'description': 'Столица России'
                    }
                }
            ]
        }
    });

    map.addLayer({
        'id': 'places',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-radius': 10,
            'circle-color': '#FF5722'
        }
    });
});

map.on('load', function () {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6
        }
    });
});

// Ограничение области карты
var bounds = [
    [37.0, 55.0], // Юго-западный угол
    [38.5, 56.0]  // Северо-восточный угол
];
map.setMaxBounds(bounds);

map.getSource("my-route").setData("mo.geojson")

map.on('load', function () {
    // Добавляем источник данных GeoJSON
    map.addSource('my-geojson-source', {
        'type': 'geojson',
        'data': 'ao' // укажи путь к локальному файлу или URL
    });

    // Если нужны линии вместо заливки
    map.addLayer({
        'id': 'geojson-line-layer',
        'type': 'line',
        'source': 'my-geojson-source',
        'paint': {
            'line-color': '#ff0000',
            'line-width': 10
        }
    });
});



