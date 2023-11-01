import React, {useEffect, useRef} from 'react';
import {Map} from 'mapbox-gl';


export const MapComponent = (props: {
    onClick: Function,
    closeMenu: Function,
    startCoords: [number, number],
    map: Map | null,
    changeMap: Function
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.map) return
        if (mapContainer.current) {
            const map = new Map({
                container: mapContainer?.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                pitchWithRotate: false,
                center: props.startCoords,
                zoom: 13,
                accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
                doubleClickZoom: false
            })
            map.on('click', e => props.onClick(e))
            props.changeMap(map)
        }
    }, [props]);

    return (
        <div ref={mapContainer} className='map'/>
    )
}