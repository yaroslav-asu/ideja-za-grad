import mapboxgl from "mapbox-gl";
import './MarkerComponent.scss'

export class MarkerComponent extends mapboxgl.Marker {
    constructor(props: { coords: [number, number] }) {
        let el = document.createElement('div')
        el.className = 'marker'
        super({element: el});
        this.setLngLat(props.coords)
    }
}