import React from "react";
import './MarkerDescription.scss'

export class MarkerDescription extends React.Component<{
    type: string,
    description: string,
    style?: Object,
    handleClose: Function
}, {
    type: string,
    description: string,
    style?: Object,
}> {

    constructor(props: {
        type: string,
        description: string,
        style?: Object,
        handleClose: Function
    }) {
        super(props);
        this.state = {
            type: props.type,
            description: props.description,
            style: props.style,
        }
    }

    componentDidUpdate(prevProps: Readonly<{ type: string; description: string; style?: Object }>, prevState: Readonly<{
        type: string;
        description: string;
        style?: Object
    }>, snapshot?: any) {
        if (prevProps.type !== this.props.type) {
            this.setState({
                type: this.props.type,
                description: this.props.description,
                style: this.props.style
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

    render() {
        return (
            <div className="side_menu" style={this.state.style}>
                <button onClick={() => this.props.handleClose()}>Close</button>
                <h1>{this.state.type}</h1>
                <p>{this.state.description}</p>
            </div>
        )
    }
}