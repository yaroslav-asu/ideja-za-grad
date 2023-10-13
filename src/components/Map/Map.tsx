import React from 'react';
import {Map} from 'mapbox-gl';

export class MapComponent extends React.Component<{
    onClick: Function,
    startCoords: [number, number]
}, {}> {
    private mapRef = React.createRef<HTMLDivElement>();
    private readonly onClick: Function;
    private readonly startCoords: [number, number] = [0, 0];
    public map: Map | null = null;

    constructor(props: { onClick: Function, startCoords: [number, number] }) {
        super(props);
        this.onClick = props.onClick;
        this.startCoords = props.startCoords;
    }

    initMap() {
        if (this.mapRef.current)
            return new Map({
                container: this.mapRef?.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                pitchWithRotate: false,
                center: [this.startCoords[0], this.startCoords[1]],
                zoom: 15,
                accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
                doubleClickZoom: false
            })
        return null
    }

    componentDidMount() {
        if (this.mapRef.current) {
            this.map = this.initMap()
            this.map?.on('click', (e) => {
                this.onClick(e)
            })
        }
    }

    render() {
        return <div ref={this.mapRef} className='map'/>
    }
}