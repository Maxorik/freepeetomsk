import React, {useEffect, useState} from 'react';
import axios from "axios";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {YMapsApi} from "@pbe/react-yandex-maps/typings/util/typing";
import WcIcon from '@mui/icons-material/Wc';

import { config } from "../config";
import { IPoint } from "./models";

export function MapRender() {
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const [mapUser, setMapUser] = useState(config.tomskCenter);
    const [mapZoom, setMapZoom] = useState(18);
    const [points, setPoints] = useState<IPoint[]>([]);

    // ставим карту на весь экран устройства
    // подгружаем точки
    useEffect(() => {
        const busyPlace = config.isMobile ? 100 : 60; // место, занятое интерфейсом
        setMapWidth(window.innerWidth);
        setMapHeight(window.innerHeight - busyPlace);
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

    // // скрываем лишнее с карты
    // const hideCopyright = () => {
    //     try {
    //         const mapClass = document.querySelector('.header')!.nextElementSibling!.firstElementChild!.className;
    //         const hideElement = document.querySelector<HTMLElement>(`.${mapClass}-map-copyrights-promo`);
    //         hideElement!.style.display = 'none !important';
    //     } catch (e) {}
    // }

    return (
        <> { config.isMobile &&
            <div className={ 'header' }>
                <WcIcon fontSize="large" />
                <p>ТУАЛЕТЫ ТОМСКА</p>
            </div> }
            <YMaps query={{ apikey: config.apiKey }}>
                <Map
                    width={mapWidth}
                    height={mapHeight}
                    state={{ center: mapUser, zoom: mapZoom }}
                    modules={["geolocation", "geocode", "geoObject.addon.balloon", "geoObject.addon.hint" ]}
                    onLoad={(ymaps) => getGeoLocation(ymaps)}
                >
                    <Placemark
                        geometry={ mapUser }
                        width={'100'}
                        height={'100'}
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
            </YMaps>
        </>
    );
}