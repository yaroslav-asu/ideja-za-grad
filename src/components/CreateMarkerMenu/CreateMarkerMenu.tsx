import React from "react";
import './CreateMarkerMenu.scss';

class CreateMarkerMenu extends React.Component<{
    menuCoords: [number, number],
    onClose: Function,
    onSave: Function,
    changeData: Function
}, {
    type: string,
    description: string,
    onClose: Function,
    onSave: Function,
    coords: [number, number]
}> {
    protected wrapperRef = React.createRef<HTMLDivElement>();
    public width: number = 0;
    public height: number = 0;
    private readonly changeData: Function;

    constructor(props: {
        onClose: Function;
        onSave: Function;
        menuCoords: [number, number];
        changeData: Function;
    }) {
        super(props);
        this.state = {
            type: '',
            description: '',
            onClose: props.onClose,
            onSave: props.onSave,
            coords: this.props.menuCoords
        }
        this.changeData = this.props.changeData;
    }

    componentDidMount() {
        this.width = this.wrapperRef.current?.offsetWidth as number;
        this.height = this.wrapperRef.current?.offsetHeight as number;
    }

    render() {
        return (
            <div
                ref={this.wrapperRef}
                className="create_marker_menu"
                style={{left: this.state.coords[0] + 10, top: this.state.coords[1] + 10}}
            >
                <select
                    value={this.state.type}
                    onChange={e => {
                        this.setState({type: e.target.value})
                    }}
                >
                    <option value="type_1">Type 1</option>
                    <option value="type_2">Type 2</option>
                </select>
                <textarea value={this.state.description} onChange={e => {
                    this.setState({description: e.target.value})
                    this.changeData({type: this.state.type, description: e.target.value})
                }}/>
                <button onClick={() => this.state.onSave()}>Save</button>
                <button onClick={() => this.state.onClose()}>Close</button>
            </div>
        )
    }
}

export default CreateMarkerMenu;