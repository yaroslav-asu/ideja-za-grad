import React from 'react';
import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css'
import {MapComponent} from "./components/Map/Map";
import CreateMarkerMenu from "./components/CreateMarkerMenu/CreateMarkerMenu";
import {MarkerComponent} from "./components/Marker/MarkerComponent";
import mapboxgl from "mapbox-gl";
import {MarkerDescription} from "./components/SideMenu/MarkerDescription";

class App extends React.Component<{}, {
    createMarkerMenuShowed: boolean,
    sideMenu: {
        showed: boolean,
        type: string,
        description: string
    }
    menuCoords: [number, number],
    screen: {
        width: number,
        height: number
    },
    marker: {
        coords: [number, number],
        type: string,
        description: string
    },
    types: string[]
}> {
    private markers: MarkerComponent[] = [];
    private mapRef = React.createRef<MapComponent>();

    constructor(props: {}) {
        super(props);
        this.state = {
            createMarkerMenuShowed: false,
            sideMenu: {
                showed: false,
                type: '',
                description: ''
            },
            marker: {
                coords: [0, 0],
                type: '',
                description: ''
            },
            menuCoords: [0, 0],
            screen: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            types: ['type_1', 'type_2']
        }
        this.render = this.render.bind(this);
    }

    handleScreenResize() {
        this.setState({
            screen: {width: window.innerWidth, height: window.innerHeight}
        })
    }

    componentDidMount() {
        this.renderMarkers()
        window.addEventListener('resize', () => this.handleScreenResize())
        this.handleScreenResize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleScreenResize())
    }


    renderMarkers() {
        for (let marker of this.markers) {
            marker.addTo(this.mapRef.current?.map as mapboxgl.Map)
        }
    }

    createMarker() {
        let marker = new MarkerComponent({...this.state.marker})
        marker.getElement().addEventListener('click', e => {
            this.setState(() => ({
                sideMenu: {
                    type: marker.type,
                    description: marker.description,
                    showed: true
                },
                createMarkerMenuShowed: false
            }))
            e.stopPropagation()
        })
        this.markers.push(marker)
    }

    render() {
        return (
            <div className="App">
                {this.state.createMarkerMenuShowed ? <CreateMarkerMenu
                    types={this.state.types}
                    coords={[
                        Math.min(this.state.menuCoords[0], this.state.screen.width - 285),
                        Math.min(this.state.menuCoords[1], this.state.screen.height - 170)
                    ]}
                    changeData={(data: { type: string, description: string }) => {
                        this.setState({
                            marker: {
                                type: data.type,
                                description: data.description,
                                coords: this.state.marker.coords
                            }
                        })
                    }}
                    onSave={() => {
                        this.setState({createMarkerMenuShowed: false})
                        this.createMarker()
                        this.renderMarkers()
                    }}
                    onClose={() => {
                        this.setState({createMarkerMenuShowed: false})
                    }}
                /> : null}
                <div className="wrapper">
                    <MapComponent
                        style={{width: this.state.sideMenu.showed ? '70vw' : '100vw'}}
                        ref={this.mapRef}
                        onClick={(e: any) => {
                            this.setState({createMarkerMenuShowed: false})
                            setTimeout(() => {
                                this.setState({
                                    createMarkerMenuShowed: true,
                                    marker: {
                                        coords: [e.lngLat.lng, e.lngLat.lat],
                                        type: this.state.marker.type,
                                        description: this.state.marker.description
                                    },
                                    menuCoords: [e.point.x, e.point.y]
                                })
                            })
                        }}
                        closeMenu={() => {
                            this.setState({createMarkerMenuShowed: false})
                        }}
                        startCoords={[20.457273, 44.787197]}
                    />
                    <MarkerDescription
                        type={this.state.sideMenu.type}
                        style={{width: this.state.sideMenu.showed ? '30vw' : '0vw'}}
                        description={this.state.sideMenu.description}
                        handleClose={() => {
                            this.setState(prevState => ({sideMenu: {...prevState.sideMenu, showed: false}}))
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default App;
