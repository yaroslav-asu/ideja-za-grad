import React from 'react';
import './App.scss';
import 'mapbox-gl/dist/mapbox-gl.css'
import {MapView} from "./components/Map/Map";

class App extends React.Component<{}, {}> {

    render() {
        return (
            <div className="App">
                <MapView/>
            </div>
        );
    }
}

export default App;
