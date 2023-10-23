import React from "react";
import './CreateMarkerMenu.scss';
import markerType from "../../types/markerTypes";
import {ImagesUploader} from "../ImagesLoad/ImagesUploader";

class CreateMarkerMenu extends React.Component<{
    coords: [number, number],
    onClose: Function,
    onSave: Function,
    changeData: Function,
    types: markerType[]
}, {
    type: string,
    description: string,
}> {
    protected wrapperRef = React.createRef<HTMLDivElement>();
    public width: number = 0;
    public height: number = 0;

    constructor(props: {
        onClose: Function;
        onSave: Function;
        coords: [number, number];
        changeData: Function;
        types: markerType[];
    }) {
        super(props);
        this.state = {
            type: props.types[0].value,
            description: ''
        }
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
                        this.props.changeData({...this.state, type: e.target.value})
                    }}
                >
                    {this.props.types.map((type, index) => {
                        return <option key={index} value={type.value}>{type.title}</option>
                    })}
                </select>
                <ImagesUploader
                    onUpdate={
                        (images: Array<File>) => this.props.changeData(
                            {...this.state, images: images}
                        )
                    }
                />
                <textarea value={this.state.description} onChange={e => {
                    this.setState({description: e.target.value})
                    this.props.changeData({type: this.state.type, description: e.target.value})
                }}/>
                <button onClick={() => this.props.onSave()}>Save</button>
                <button onClick={() => this.props.onClose()}>Close</button>
            </div>
        )
    }
}

export default CreateMarkerMenu;