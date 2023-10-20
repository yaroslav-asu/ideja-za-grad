import mapboxgl from "mapbox-gl";
import './MarkerComponent.scss'

export type markerPropsType = {
    coords: [number, number],
    type: string,
    description: string
}

export class MarkerComponent extends mapboxgl.Marker {
    public coords: [number, number];
    public type: string;
    public description: string;

    constructor(props: { coords: [number, number], type: string, description: string }) {
        let el = document.createElement('div')
        el.className = 'marker'
        super({element: el});
        this.setLngLat(props.coords)
        this.coords = props.coords
        this.type = props.type
        this.description = props.description
    }
}