import React from 'react';
import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css'
import {MapComponent} from "./components/Map/Map";
import CreateMarkerMenu from "./components/CreateMarkerMenu/CreateMarkerMenu";
import {MarkerComponent, markerPropsType} from "./components/Marker/MarkerComponent";
import mapboxgl from "mapbox-gl";
import {MarkerDescription} from "./components/SideMenu/MarkerDescription";
import markerType from "./types/markerTypes";
import axios from "./axios";

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
    types: { title: string, value: string }[]
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
            types: []
        }
        this.render = this.render.bind(this);
    }

    handleScreenResize() {
        this.setState({
            screen: {width: window.innerWidth, height: window.innerHeight}
        })
    }

    async componentDidMount() {
        this.renderMarkers()
        window.addEventListener('resize', () => this.handleScreenResize())
        this.handleScreenResize()
        this.setState(
            {
                types: await this.getTypes(),
            }
        )
        this.getMarkers().then(() => {
            this.renderMarkers()
        })
        this.renderMarkers()
    }

    async getTypes() {
        return await axios.get("types").then(res => {
            return res.data.data.map((type: { id: number, title: string }) => {
                return {
                    title: type.title,
                    value: type.id.toString()
                }
            })
        }).catch(err => {
            console.log(err)
            return []
        })
    }

    async getMarkers() {
        return axios.get(`markers`,).then(res => {
            for (let marker of res.data.data) {
                this.createMarker({
                    coords: [marker.coords.lng, marker.coords.lat],
                    type: marker.type.id.toString(),
                    description: marker.description
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleScreenResize())
    }


    renderMarkers() {
        for (let marker of this.markers) {
            marker.addTo(this.mapRef.current?.map as mapboxgl.Map)
        }
    }

    saveMarker(props: markerPropsType) {
        axios.post("markers", {
            type: {
                id: parseInt(props.type)
            },
            description: props.description,
            coords: {
                lat: props.coords[1],
                lng: props.coords[0]
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    createMarker(props: markerPropsType) {
        let marker = new MarkerComponent(props)
        marker.getElement().addEventListener('click', e => {
            const type = this.state.types.find(type => type.value === marker.type) as markerType
            this.setState(() => ({
                sideMenu: {
                    type: type.title,
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
                {this.state.createMarkerMenuShowed && this.state.types.length > 0 ? <CreateMarkerMenu
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
                        this.createMarker({...this.state.marker})
                        this.saveMarker({...this.state.marker})
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
