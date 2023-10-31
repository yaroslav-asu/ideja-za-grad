import React from "react";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import './ImagesUploader.scss'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeletableImage from "./DeletableImage/DeletableImage";

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
            <div className="images_uploader">
                {this.state.files.length < 5 ? <button className="upload_button menu_element">
                    <AddPhotoAlternateOutlinedIcon/>
                    <input className="image_input" ref={this.inputRef} type="file" accept="image/*" onChange={(e) => {
                        const uploadedFile = e.target.files![0];
                        this.setState({
                            files: [...this.state.files, uploadedFile],
                        })
                        this.props.onUpdate([...this.state.files, uploadedFile])
                    }}/>
                </button> : null}

                <ComponentsSlider elements={this.state.files.map(
                    (image, index) => {
                        return <DeletableImage
                            src={URL.createObjectURL(image)}
                            onDelete={() => {
                                    const newFiles = this.state.files.filter((_, i) => i !== index)
                                    this.setState({
                                        files: newFiles
                                    })
                                    this.props.onUpdate(newFiles)
                                }}
                        />
                    }
                )}/>
            </div>
        )
    }
}