import React from 'react';
import {Map} from 'mapbox-gl';

export class MapComponent extends React.Component<{
    onClick: Function,
    closeMenu: Function,
    startCoords: [number, number],
    style?: Object
}, { style?: Object }> {
    private mapRef = React.createRef<HTMLDivElement>();
    private readonly onClick: Function;
    private readonly closeMenu: Function;
    private readonly startCoords: [number, number] = [0, 0];
    public map: Map | null = null;

    constructor(props: {
        onClick: Function,
        closeMenu: Function,
        startCoords: [number, number],
        style?: Object
    }) {
        super(props);
        this.onClick = props.onClick;
        this.closeMenu = props.closeMenu;
        this.startCoords = props.startCoords;
        if (props.style)
            this.state = {
                style: props.style
            }
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

    componentDidUpdate(prevProps: Readonly<{
        onClick: Function;
        closeMenu: Function;
        startCoords: [number, number];
        style?: Object
    }>, prevState: Readonly<{ style?: Object }>, snapshot?: any) {
        if (prevProps.style !== this.props.style) {
            this.setState({
                style: this.props.style
            })
        }
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
        return <div style={this.state?.style} ref={this.mapRef} className='map'/>
    }
}