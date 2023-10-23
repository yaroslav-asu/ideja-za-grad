import React from "react";

export class ImagesUploader extends React.Component<{
    onUpdate: Function
}, {
    files: Array<File>
}> {
    private readonly inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: {
        onUpdate: Function
    }) {
        super(props);
        this.state = {
            files: [],
        }
        this.inputRef = React.createRef<HTMLInputElement>()
    }

    render() {
        return (
            <div>
                <input ref={this.inputRef} type="file" accept="image/*" onChange={(e) => {
                    const uploadedFile = e.target.files![0];
                    this.setState({
                        files: [...this.state.files, uploadedFile],
                    })
                    this.props.onUpdate([...this.state.files, uploadedFile])
                }}/>
                <div>{
                    this.state.files.map(
                        (image, index) => {
                            return <div>
                                <button onClick={() => {
                                    const newFiles = this.state.files.filter((_, i) => i !== index)
                                    this.setState({
                                        files: newFiles
                                    })
                                    this.props.onUpdate(newFiles)
                                }
                                }>Delete
                                </button>
                                <img key={index} src={URL.createObjectURL(image)} alt="" style={{display: "block"}}/>
                            </div>
                        }
                    )
                }</div>
            </div>
        )
    }
}