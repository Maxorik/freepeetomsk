// растягиваем карту на экран
const map = document.getElementById('map');
map.style.width = window.innerWidth - 10 + 'px';
map.style.height = window.innerHeight - 60 + 'px';

ymaps.ready(init);

function init() {

    // создание карты.
    const myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        center: [56.50, 84.99],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12
    });

    // определение местоположения
    const location = ymaps.geolocation.get();
    location.then(
      result => {
        const user = result.geoObjects;

        // Добавление местоположения на карту.
        myMap.geoObjects.add(user);

        // центрируем карту по пользователю
        myMap.setCenter(user.position, 15, {
            checkZoomRange: true
        });
      },
      err => {
        console.log('Ошибка: ' + err)
      }
    );

    // ставим метки
    const placemark = new ymaps.Placemark([56.462526, 84.965983], {
        balloonContent: 'Красный экспресс <br /> <img width="200px"; height="auto" src="https://i8.photo.2gis.com/images/branch/0/30258560106606635_5193.jpg" />',
        hintContent: "Красный экспресс"
    }, {
        // Опции.
        iconLayout: 'default#image',
        iconImageHref: 'icon_t.png',
        // Размеры метки.
        iconImageSize: [40, 51],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38],
        // Балун будем открывать и закрывать кликом по иконке метки.
        hideIconOnBalloonOpen: false
    });
    myMap.geoObjects.add(placemark);
}