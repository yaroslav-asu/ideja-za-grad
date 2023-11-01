import React from "react";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import './ImagesUploader.scss'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeletableImage from "./DeletableImage/DeletableImage";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

const ImagesUploader = (props: {
    onUpdate: Function
}) => {
    const [files, changeFiles] = React.useState<Array<File>>([])
    const [srcs, changeSrcs] = React.useState<Array<string>>([])
    const {t} = useTranslation()
    let componentsSlider, uploader;

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
    if (files.length < 5) {
        uploader = <div className="uploader_wrapper">
            <p>{t("imagesUploader.uploadImage")}</p>
            <button className="upload_button menu_element">
                <AddPhotoAlternateOutlinedIcon/>
                <input
                    className="image_input"
                    type="file"
                    accept="image/jpg, image/png, image/jpeg, image/wepb, image/JPG"
                    onChange={(e) => {
                        const uploadedFile = e.target.files![0];

                        const reader = new FileReader();
                        reader.readAsDataURL(uploadedFile);
                        reader.onload = function (e) {
                            const img = new Image();
                            img.src = e.target?.result as string;
                            img.onload = () => {
                                if (!(img.width / img.height < 20 && img.height / img.width < 20)) {
                                    toast.error(t("images.narrow"))
                                    return
                                }
                                if (uploadedFile.size > 5000000) {
                                    toast.error(t("images.big"))
                                    return
                                }
                                changeFiles([...files, uploadedFile])
                                changeSrcs([...srcs, e.target?.result as string])

                            }
                        };
                        props.onUpdate([...files, uploadedFile])
                    }}
                />
            </button>
        </div>
    }
    return (
        <div className="images_uploader">
            {uploader}
            {componentsSlider}
        </div>
    )
}
export default ImagesUploader;