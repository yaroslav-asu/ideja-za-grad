import React from "react";
import './CreateMarkerMenu.scss';

class CreateMarkerMenu extends React.Component<{
    coords: [number, number],
    onClose: Function,
    onSave: Function,
    changeData: Function,
    types: string[]
}, {
    type: string,
    description: string,
}> {
    protected wrapperRef = React.createRef<HTMLDivElement>();
    public width: number = 0;
    public height: number = 0;
    private readonly changeData: Function;

    constructor(props: {
        onClose: Function;
        onSave: Function;
        coords: [number, number];
        changeData: Function;
        types: string[];
    }) {
        super(props);
        this.state = {
            type: props.types[0],
            description: ''
        }
        this.changeData = this.props.changeData;
        this.changeData(this.state);
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
                style={{left: this.props.coords[0] + 10, top: this.props.coords[1] + 10}}
            >
                <select
                    value={this.state.type}
                    onChange={e => {
                        this.setState({type: e.target.value})
                        this.changeData({...this.state, type: e.target.value})
                    }}
                >
                    {this.props.types.map((type, index) => {
                        return <option key={index} value={type}>{type}</option>
                    })}
                </select>
                <textarea value={this.state.description} onChange={e => {
                    this.setState({description: e.target.value})
                    this.changeData({type: this.state.type, description: e.target.value})
                }}/>
                <button onClick={() => this.props.onSave()}>Save</button>
                <button onClick={() => this.props.onClose()}>Close</button>
            </div>
        )
    }
}

export default CreateMarkerMenu;