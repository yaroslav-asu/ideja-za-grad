import {useEffect, useRef} from 'react';
import {Map} from 'mapbox-gl';

export const initMap = (container: HTMLDivElement, coords: [number, number]) => {
    return new Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
        doubleClickZoom: false
    })
}

export const MapView = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            initMap(
                mapRef.current,
                [20.457273, 44.787197]
            )
        }
    }, []);

    return (
        <div ref={mapRef} className='map'/>
    )
}
