import React, {MutableRefObject, useEffect, useRef} from 'react';
import {Map} from 'mapbox-gl';
import "./Map.scss"
import {MarkerComponent} from "../Marker/MarkerComponent";


export const MapComponent = (props: {
    onClick: Function,
    startCoords: [number, number],
    map: Map | null,
    changeMap: Function
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    let showMarker: MutableRefObject<MarkerComponent | null> = useRef(null)

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
            map.on('click', e => {
                const {lng, lat} = e.lngLat
                const marker = new MarkerComponent({
                    coords: [lng, lat],
                    type: {title: "cross", value: ""},
                    description: '',
                    id: 10
                })
                showMarker?.current?.remove()
                showMarker.current = marker
                marker.addTo(map)
                props.onClick(e)
            })
            props.changeMap(map)
        }
    }, [props]);

    return (
        <div ref={mapContainer} className='map'/>
    )
}