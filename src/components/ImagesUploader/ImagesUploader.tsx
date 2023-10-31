import React from "react";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import './ImagesUploader.scss'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeletableImage from "./DeletableImage/DeletableImage";

const ImagesUploader = (props: {
    onUpdate: Function
}) => {
    const [files, changeFiles] = React.useState<Array<File>>([])
    return (
        <div className="images_uploader">
            {files.length < 5 ? <button className="upload_button menu_element">
                <AddPhotoAlternateOutlinedIcon/>
                <input className="image_input" type="file" accept="image/*" onChange={(e) => {
                    const uploadedFile = e.target.files![0];
                    changeFiles([...files, uploadedFile])
                    props.onUpdate([...files, uploadedFile])
                }}/>
            </button> : null}

            <ComponentsSlider elements={files.map(
                (image, index) => {
                    return <DeletableImage
                        src={URL.createObjectURL(image)}
                        onDelete={() => {
                            const newFiles = files.filter((_, i) => i !== index)
                            changeFiles(newFiles)
                            props.onUpdate(newFiles)
                        }}
                    />
                }
            )}/>
        </div>
    )
}
export default ImagesUploader;