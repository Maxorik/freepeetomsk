import React, {useEffect, useState} from 'react';
import axios from "axios";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { YMapsApi } from "@pbe/react-yandex-maps/typings/util/typing";
import { Button } from "@mui/material";
import WcIcon from '@mui/icons-material/Wc';
import AddIcon from '@mui/icons-material/Add';
import { AddPlaceWindow } from './AddPlaceWindow';

import { config } from "../config";
import { IPoint } from "./models";

export function MapRender() {
    const [mapWidth, setMapWidth] = useState(0);
    const [mapHeight, setMapHeight] = useState(0);
    const [mapUser, setMapUser] = useState(config.tomskCenter);
    const [mapZoom, setMapZoom] = useState(18);
    const [points, setPoints] = useState<IPoint[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [showWindow, setShowWindow] = useState(false);
    const [cX, setCX] = useState(0);
    const [cY, setCY] = useState(0);

    const closeModal = () => { setShowWindow(false); }

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
            const response = await axios.get<IPoint[]>(config.apiUrl.getPoints);
            setPoints(Object.values(response.data));
            console.log(points)
        } catch (e: unknown) {  }
    }

    // При щелчке
    const handleClick = (event: any) => {
        if (editMode) {
            const coords = event.get('coords');
            setCX(coords[0]);
            setCY(coords[1]);
            setEditMode(false);
            setShowWindow(true);
        }
    };

    return (
        <>
            {  showWindow &&
                <AddPlaceWindow
                    onCloseHandler={ closeModal }
                    cX={ cX }
                    cY={ cY }
                />
            }
            { config.isMobile &&
            <div className={ 'main-title' }>
                <WcIcon fontSize="large" />
                <p>ТУАЛЕТЫ ТОМСКА</p>
            </div> }
            { config.adminMode && <div className='admin-panel interface'>
                <Button
                    startIcon={<AddIcon/>}
                    onClick={() => {
                        setEditMode(!editMode);
                    }}
                >
                    Режим "Добавить место"
                </Button>
                { editMode && <span className="button-qtip">нажмите на место на карте</span> }
            </div> }
            <div className={ editMode ? 'map-edit-mode' : '' }>
                <YMaps query={{ apikey: config.apiKey }}>
                <Map
                    width={ mapWidth }
                    height={ mapHeight }
                    state={{ center: mapUser, zoom: mapZoom }}
                    modules={ ["geolocation", "geocode", "geoObject.addon.balloon", "geoObject.addon.hint" ] }
                    onLoad={ (ymaps) => getGeoLocation(ymaps) }
                    onClick={ handleClick }
                >
                    <Placemark
                        geometry={ mapUser }
                        width={ '100' }
                        height={ '100' }
                        properties={{ iconContent: "Я" }}
                        options={{ preset: 'islands#redCircleIcon' }}
                    />
                    { Array.isArray(points) && points.map(point => {
                         let content = `<div style="width: 220px">${point.name} <br /> ${point.descr} </div>`;
                         if(point.image) {
                             content += `<br /> <img alt="Фото..." width="220px" height="auto" src=${point.image} />`;
                         }
                         return <Placemark
                             key={ point.positionX }
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
            </div>
        </>
    );
}