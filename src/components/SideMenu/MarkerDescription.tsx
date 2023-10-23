import React from "react";
import './MarkerDescription.scss'
import axios from "../../axios";

type markerDescriptionPropsType = {
    type: string,
    description: string,
    style?: Object,
    markerId: number,
}
type markerDescriptionStateType = markerDescriptionPropsType & { images: string[] }

export class MarkerDescription extends React.Component<{
    type: string,
    description: string,
    style?: Object,
    handleClose: Function,
    markerId: number,
}, markerDescriptionStateType
> {

    constructor(props: {
        type: string,
        description: string,
        style?: Object,
        handleClose: Function,
        markerId: number,
    }) {
        super(props);
        this.state = {
            type: props.type,
            description: props.description,
            style: props.style,
            markerId: props.markerId,
            images: []
        }
    }

    componentDidUpdate(prevProps: Readonly<markerDescriptionPropsType>, prevState: Readonly<markerDescriptionPropsType>, snapshot?: any) {
        if (prevProps.markerId !== this.props.markerId && this.props.markerId !== 0) {
            this.setState({
                markerId: this.props.markerId
            })
            this.getMarkerImages(this.props.markerId)
        }
        if (prevProps.type !== this.props.type) {
            this.setState({
                type: this.props.type,
            })
        }
        if (prevProps.style !== this.props.style) {
            this.setState({
                style: this.props.style
            })
        }
        if (prevProps.description !== this.props.description) {
            this.setState({
                description: this.props.description
            })
        }
    }

    getMarkerImages(id: number) {
        axios.get(`markers/${id}/images`).then((res) => {
            this.setState({
                images: res.data.data.map((image: { id: number, title: string }) => {
                    return `${process.env.REACT_APP_API_URL}/static/${image.title}`
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="side_menu" style={this.state.style}>
                <button onClick={() => this.props.handleClose()}>Close</button>
                <h1>{this.state.type}</h1>
                <p>{this.state.description}</p>
                {this.state.images.map((imageUrl, id) => {
                    return <img src={imageUrl} alt="marker image" key={id}/>
                })}
            </div>
        )
    }
}