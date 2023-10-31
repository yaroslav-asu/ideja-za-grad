import React from "react";
import './CreateMarkerMenu.scss';
import markerType from "../../types/markerTypes";
import {ImagesUploader} from "../ImagesUploader/ImagesUploader";
import CloseIcon from '@mui/icons-material/Close';

class CreateMarkerMenu extends React.Component<{
    onClose: Function,
    onSave: Function,
    changeData: Function,
    types: markerType[]
}, {
    type: string,
    description: string,
    images: Array<File>
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
            description: '',
            images: []
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
            >
                <button className="close_button" onClick={() => this.props.onClose()}>
                    <CloseIcon/>
                </button>
                <select
                    className="menu_element"
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
                        (images: Array<File>) => {
                            this.setState({images})
                            this.props.changeData(
                                {...this.state, images: images}
                            )
                        }
                    }
                />
                <textarea className="menu_element description_textarea" value={this.state.description} onChange={e => {
                    this.setState({description: e.target.value})
                    this.props.changeData({...this.state, description: e.target.value})
                }}/>
                <button className="menu_element" onClick={() => this.props.onSave()}>Save</button>
            </div>
        )
    }
}

export default CreateMarkerMenu;