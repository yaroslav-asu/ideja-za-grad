import React, {ReactElement} from 'react';
import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css'
import {MapComponent} from "./components/Map/Map";
import CreateMarkerMenu from "./components/CreateMarkerMenu/CreateMarkerMenu";
import {MarkerComponent} from "./components/Marker/MarkerComponent";
import mapboxgl from "mapbox-gl";

class App extends React.Component<{}, {
    createMarkerMenuShowed: boolean,
    markerCoords: [number, number],
    menuCoords: [number, number]
}> {
    private markers: MarkerComponent[] = [];
    private mapRef = React.createRef<MapComponent>();

    constructor(props: {}) {
        super(props);
        this.state = {
            createMarkerMenuShowed: false,
            markerCoords: [0, 0],
            menuCoords: [0, 0]
        }
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        this.renderMarkers()
    }


    renderMarkers() {
        for (let marker of this.markers) {
            marker.remove()
            marker.addTo(this.mapRef.current?.map as mapboxgl.Map)
        }
    }

    render() {
        let createMarkerMenu: ReactElement | null = null;
        if (this.state.createMarkerMenuShowed) {
            createMarkerMenu = <CreateMarkerMenu
                menuCoords={this.state.menuCoords}
                onClose={() => {
                    this.setState({createMarkerMenuShowed: false})
                }}
                onSave={() => {
                    this.setState({createMarkerMenuShowed: false})
                    this.markers.push(new MarkerComponent({coords: this.state.markerCoords}))
                    this.renderMarkers()
                }}
            />
        }
        return (
            <div className="App">
                {createMarkerMenu}
                <MapComponent
                    ref={this.mapRef}
                    onClick={(e: any) => {
                        this.setState({createMarkerMenuShowed: false})
                        setTimeout(() => {
                            this.setState({
                                createMarkerMenuShowed: true,
                                markerCoords: [e.lngLat.lng, e.lngLat.lat],
                                menuCoords: [e.point.x, e.point.y]
                            })
                        })
                    }}
                    startCoords={[20.457273, 44.787197]}
                />
            </div>
        );
    }
}

export default App;
