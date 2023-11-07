import React, {useRef, useState} from 'react';
import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css'
import {MapComponent} from "./components/Map/Map";
import CreateMarkerMenu from "./components/CreateMarkerMenu/CreateMarkerMenu";
import {MarkerComponent} from "./components/Marker/MarkerComponent";
import {Map} from "mapbox-gl";
import MarkerDescription from "./components/MarkerDescription/MarkerDescription";
import markerType from "./types/markerTypes";
import axios from "./axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";
import Header from "./components/Header/Header";
import HowToUsePopup from "./components/HowToUsePopup/HowToUsePopup";
import howToUsePopup from "./components/HowToUsePopup/HowToUsePopup";

type createMenuMarkerType = {
    type: string,
    description: string,
    images: File[],
    coords: [number, number]
}
const getTypes = async () => {
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

const getMarkers = async () => {
    return axios.get(`markers`).then(res => {
        return res.data.data.map((marker: {
            id: number,
            coords: { lat: number, lng: number },
            type: { id: number, title: string },
            description: string
        }) => {
            return {
                id: marker.id,
                coords: [marker.coords.lat, marker.coords.lng],
                type: marker.type.id.toString(),
                description: marker.description
            }
        })
    }).catch(err => {
        console.log(err)
        return []
    })
}
const saveMarker = async (marker: createMenuMarkerType) => {
    let formData = new FormData()
    formData.append('type', marker.type)
    formData.append('description', marker.description)
    formData.append('lat', JSON.stringify(marker.coords[0]))
    formData.append('lng', JSON.stringify(marker.coords[1]))
    for (let image of marker.images) {
        formData.append('images', image)
    }
    return await axios.post("markers", formData).then(res => {
        return res.data.data
    }).catch(err => {
        console.log(err)
        return 0
    })
}
const renderMarkers = (map: Map, markers: Array<MarkerComponent>) => {
    for (let marker of markers) {
        marker.addTo(map)
    }
}
const App = () => {
    const [createMarkerMenuShowed, changeCreateMarkerMenuVisibility] = React.useState(false)
    const [markers, changeMarkers] = React.useState<MarkerComponent[]>([])
    const [types, changeTypes] = React.useState<markerType[]>([])
    const [sideMenu, changeSideMenu] = React.useState({
        showed: false,
        markerId: 0,
        type: {title: '', value: ''},
        description: ''
    })
    const [newMarker, changeNewMarker] = React.useState<createMenuMarkerType>({
        type: '',
        description: '',
        images: [],
        coords: [0, 0]
    })
    const [map, changeMap] = React.useState<Map | null>(null)
    const mounted = useRef(false)
    const {t} = useTranslation()
    const [howToPopupState, changeHowToPopupState] = useState(false)
    const deactivateAllMarkers = () => {
        for (let marker of document.getElementsByClassName('marker--active') as any) {
            marker.classList.remove('marker--active')
        }
    }
    React.useEffect(() => {
        if (types.length === 0 && !mounted.current) {
            getTypes().then(res => {
                changeTypes(res)
            }).catch(() => {
                toast.error(t('notifications.gettingDataError'));
            })
        }
        if (markers.length === 0 && types.length > 0)
            getMarkers().then(res => {
                for (let markerProps of res) {
                    const type = types.find(type => type.value === markerProps.type)

                    const newMarker = new MarkerComponent({...markerProps, type: type as markerType})
                    const markerElement = newMarker.getElement()

                    markerElement.addEventListener('click', e => {
                        let isActive = markerElement.classList.contains('marker--active')
                        deactivateAllMarkers()
                        if (!isActive) {
                            markerElement.classList.add('marker--active')
                        }
                        changeSideMenu({
                            type: type as markerType,
                            description: newMarker.description,
                            showed: !isActive,
                            markerId: newMarker.id
                        })
                        changeCreateMarkerMenuVisibility(false)
                        e.stopPropagation()
                    })
                    changeMarkers((prevMarkers) => [...prevMarkers, newMarker])
                }
            }).catch(() => {
                toast.error(t('notifications.gettingDataError'));
            })
        mounted.current = true
    }, [markers, types, t])

    React.useEffect(() => {
        if (map !== null && markers.length > 0) {
            renderMarkers(map, markers)
        }
    }, [map, markers])
    let howToPopup = null
    if (howToPopupState) {
        howToPopup = <HowToUsePopup closePopup={() => changeHowToPopupState(false)}/>
    }
    return (
        <div className="app">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {howToPopup}
            <Header openHowToPopup={() => changeHowToPopupState(true)}/>
            <main className={"main"}>
                {createMarkerMenuShowed && types.length > 0 ? <CreateMarkerMenu
                    types={types}
                    changeData={(data: {
                        type: string,
                        description: string,
                        images: Array<File>
                    }) => {
                        changeNewMarker({
                            ...newMarker,
                            ...data
                        })
                    }}
                    onSave={async () => {
                        changeCreateMarkerMenuVisibility(false)
                        await saveMarker({...newMarker}).then(() => {
                            toast.success(t('notifications.saved'));
                        }).catch(() => {
                            toast.error(t('notifications.saveError'));
                        })
                        renderMarkers(map as Map, markers)
                    }}
                    onClose={() => {
                        changeCreateMarkerMenuVisibility(false)
                    }}
                /> : null}
                <div className="wrapper">
                    <MapComponent
                        map={map}
                        changeMap={changeMap}
                        onClick={(e: any) => {
                            changeCreateMarkerMenuVisibility(false)
                            setTimeout(() => {
                                changeCreateMarkerMenuVisibility(true)
                                changeNewMarker({
                                    ...newMarker,
                                    coords: [e.lngLat.lng, e.lngLat.lat]
                                })
                            })
                        }}
                        closeMenu={() => {
                            changeCreateMarkerMenuVisibility(false)
                        }}
                        startCoords={[20.4563811, 44.8014948]}
                    />
                    <MarkerDescription
                        markerId={sideMenu.markerId}
                        type={sideMenu.type.title}
                        additionalClass={'marker_description' + (sideMenu.showed ? '--showed' : '--hidden')}
                        description={sideMenu.description}
                        handleClose={() => {
                            deactivateAllMarkers()
                            changeSideMenu({
                                ...sideMenu,
                                showed: false
                            })
                        }}
                    />
                </div>
            </main>
        </div>
    )
}
export default App;
