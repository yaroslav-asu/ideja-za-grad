import React, {useEffect, useRef} from 'react';
import {Map} from 'mapbox-gl';


export const MapComponent = (props: {
    onClick: Function,
    closeMenu: Function,
    startCoords: [number, number],
    map: React.MutableRefObject<Map | null>
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.map.current) return
        if (mapContainer.current) {
            props.map.current = new Map({
                container: mapContainer?.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                pitchWithRotate: false,
                center: props.startCoords,
                zoom: 13,
                accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
                doubleClickZoom: false
            })
            props.map.current?.on('click', e => props.onClick(e))
        }
    }, [props]);

    return (
        <div ref={mapContainer} className='map'/>
    )
}