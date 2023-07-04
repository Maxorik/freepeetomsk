import React, {useEffect, useState} from 'react';
import axios from "axios";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {YMapsApi} from "@pbe/react-yandex-maps/typings/util/typing";

import { config } from "../config";
import { IPoint } from "./models";

export function MapRender() {
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const [mapUser, setMapUser] = useState(config.tomskCenter);
    const [mapZoom, setMapZoom] = useState(16);
    const [points, setPoints] = useState<IPoint[]>([]);

    // ставим карту на весь экран устройства
    // подгружаем точки
    useEffect(() => {
        setMapWidth(window.innerWidth - 4);
        setMapHeight(window.innerHeight - 64);
        getPoints();
    }, [])

    // при загрузке карты центрируем по местонахождению пользователя
    // ставим маркер с местонахождением пользователя
    const getGeoLocation = (ymaps: YMapsApi) => {
        ymaps.geolocation.get().then((res: any) => { // TODO интерфейс?
            const newZoom = config.isMobile ? 18 : 16;
            setMapZoom(newZoom);
            setMapUser(res.geoObjects.position);
        })
    };

    // получаем с апи точки
    async function getPoints() {
        try {
            const response = await axios.get<IPoint[]>(config.apiUrl);
            setPoints(response.data);
        } catch (e: unknown) {  }
    }

    return (
        <YMaps query={{ apikey: config.apiKey }}>
            <div>
                <Map
                    width={mapWidth}
                    height={mapHeight}
                    state={{ center: mapUser, zoom: mapZoom }}
                    modules={["geolocation", "geocode", "geoObject.addon.balloon", "geoObject.addon.hint" ]}
                    onLoad={(ymaps) => getGeoLocation(ymaps)}
                >
                    <Placemark
                        geometry={ mapUser }
                        properties={{ iconContent: "Я" }}
                        options={{ preset: 'islands#redCircleIcon' }}
                    />

                    { points.map(point => {
                         let content = `<div style="width: 220px">${point.name} <br /> ${point.descr} </div>`;
                         if(point.image) {
                             content += `<br /> <img alt="Фото" width="220px" height="auto" src=${point.image} />`;
                         }
                         return <Placemark
                             key={new Date().toString()}
                             geometry={ [point.positionX, point.positionY] }
                             properties={{
                                 iconCaption: point.name,
                                 balloonContent: content,
                                 hideIconOnBalloonOpen: false
                             }}
                             options={{ preset: 'islands#brownToiletIcon' }}
                         />
                        }
                    )}
                </Map>
            </div>
        </YMaps>
    );
}