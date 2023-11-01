import mapboxgl from "mapbox-gl";
import './MarkerComponent.scss'

export type markerPropsType = {
    id: number,
    coords: [number, number],
    type: { title: string, value: string },
    description: string
}

export class MarkerComponent extends mapboxgl.Marker {
    public coords: [number, number];
    public type: { title: string, value: string };
    public description: string;
    public id: number;

    constructor(props: markerPropsType) {
        let el = document.createElement('div')
        el.className = 'marker'
        super({element: el});
        this.setLngLat(props.coords)
        this.coords = props.coords
        this.type = props.type
        this.description = props.description
        this.id = props.id
    }
}