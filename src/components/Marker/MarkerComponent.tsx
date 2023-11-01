import mapboxgl from "mapbox-gl";
import './MarkerComponent.scss'

type markerTypeType = { title: string, value: string }

export type markerPropsType = {
    id: number,
    coords: [number, number],
    type: markerTypeType,
    description: string
}

export class MarkerComponent extends mapboxgl.Marker {
    public coords: [number, number];
    public type: { title: string, value: string };
    public description: string;
    public id: number;

    constructor(props: markerPropsType) {
        const wrapper = MarkerComponent.getImage(props.type)
        super({element: wrapper});
        this.setLngLat(props.coords)
        this.coords = props.coords
        this.type = props.type
        this.description = props.description
        this.id = props.id
    }

    static getImage(type: markerTypeType): HTMLDivElement {
        let wrapper = document.createElement('div')
        wrapper.className = 'marker'

        const img = document.createElement('img')
        img.src = `/assets/icons/marker.svg`
        img.className = 'marker_image'

        const typeImage = document.createElement('img')
        typeImage.src = `/assets/icons/${type.title}.svg`
        typeImage.className = 'marker_type'

        wrapper.appendChild(typeImage)
        wrapper.appendChild(img)

        return wrapper
    }
}