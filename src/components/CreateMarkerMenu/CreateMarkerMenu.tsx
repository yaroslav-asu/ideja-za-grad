import React from "react";
import './CreateMarkerMenu.scss';

class CreateMarkerMenu extends React.Component<any, any> {

    constructor(props: {
        onClose: Function;
        onSave: Function;
        menuCoords: [number, number];
    }) {
        super(props);
        this.state = {
            title: '',
            description: '',
            onClose: props.onClose,
            onSave: props.onSave,
            coords: this.props.menuCoords
        }
    }

    render() {
        return (
            <div className="create_marker_menu"
                 style={{left: this.state.coords[0] + 10, top: this.state.coords[1] + 10}}>
                <select name="" id="">
                    <option value="">Type 1</option>
                    <option value="">Type 2</option>
                </select>
                <textarea/>
                <button onClick={() => this.state.onSave()}>Save</button>
                <button onClick={() => this.state.onClose()}>Close</button>
            </div>
        )
    }
}

export default CreateMarkerMenu;