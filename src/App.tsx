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
    menuCoords: [number, number],
    screen: {
        width: number,
        height: number
    },
}> {
    private markers: MarkerComponent[] = [];
    private mapRef = React.createRef<MapComponent>();

    constructor(props: {}) {
        super(props);
        this.state = {
            createMarkerMenuShowed: false,
            markerCoords: [0, 0],
            menuCoords: [0, 0],
            screen: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        this.render = this.render.bind(this);
    }

    handleResize() {
        this.setState({
            screen: {width: window.innerWidth, height: window.innerHeight}
        })
    }

    componentDidMount() {
        this.renderMarkers()
        window.addEventListener('resize', () => this.handleResize())
        this.handleResize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize())
    }


    renderMarkers() {
        for (let marker of this.markers) {
            marker.addTo(this.mapRef.current?.map as mapboxgl.Map)
        }
    }

    render() {
        let createMarkerMenu: ReactElement | null = null;
        if (this.state.createMarkerMenuShowed) {
            createMarkerMenu = <CreateMarkerMenu
                menuCoords={[Math.min(this.state.menuCoords[0], this.state.screen.width - 285), Math.min(this.state.menuCoords[1], this.state.screen.height - 170)]}
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
                    closeMenu={() => {
                        this.setState({createMarkerMenuShowed: false})
                    }}
                    startCoords={[20.457273, 44.787197]}
                />
            </div>
        );
    }
}

export default App;
