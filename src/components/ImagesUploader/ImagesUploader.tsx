import React from "react";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import './ImagesUploader.scss'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeletableImage from "./DeletableImage/DeletableImage";

const ImagesUploader = (props: {
    onUpdate: Function
}) => {
    const [files, changeFiles] = React.useState<Array<File>>([])
    const [srcs, changeSrcs] = React.useState<Array<string>>([])
    let componentsSlider

    if (files.length !== 0) {
        componentsSlider = <ComponentsSlider elements={srcs.map(
            (image, index) => {
                return <DeletableImage
                    src={image}
                    onDelete={() => {
                        const newFiles = files.filter((_, i) => i !== index)
                        changeFiles(newFiles)
                        changeSrcs(srcs.filter((_, i) => i !== index))
                        props.onUpdate(newFiles)
                    }}
                />
            }
        )}/>
    }

    return (
        <div className="images_uploader">
            {files.length < 5 ? <button className="upload_button menu_element">
                <AddPhotoAlternateOutlinedIcon/>
                <input
                    className="image_input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const uploadedFile = e.target.files![0];
                        changeFiles([...files, uploadedFile])

                        const reader = new FileReader();
                        reader.readAsDataURL(uploadedFile);
                        reader.onload = function (e) {
                            changeSrcs([...srcs, e.target?.result as string])
                        };
                        props.onUpdate([...files, uploadedFile])
                    }}
                />
            </button> : null}

            {componentsSlider}
        </div>
    )
}
export default ImagesUploader;