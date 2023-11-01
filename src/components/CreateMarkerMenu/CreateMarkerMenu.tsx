import React from "react";
import './CreateMarkerMenu.scss';
import markerType from "../../types/markerTypes";
import ImagesUploader from "../ImagesUploader/ImagesUploader";
import CloseIcon from '@mui/icons-material/Close';

const CreateMarkerMenu = (props: {
    onClose: Function,
    onSave: Function,
    changeData: Function,
    types: markerType[]
}) => {
    const [type, changeType] = React.useState(props.types[0].value)
    const [images, changeImages] = React.useState<Array<File>>([])
    const [description, changeDescription] = React.useState('')

    return (
        <div className="create_marker_menu">
            <button className="close_button" onClick={() => props.onClose()}>
                <CloseIcon/>
            </button>
            <select
                className="menu_element"
                value={type as string}
                onChange={e => {
                    changeType(e.target.value)
                    props.changeData({type: e.target.value, images, description})
                }}
            >
                {props.types.map((type, index) => {
                    return <option key={index} value={type.value}>{type.title}</option>
                })}
            </select>
            <ImagesUploader
                onUpdate={
                    (images: Array<File>) => {
                        changeImages(images)
                        props.changeData(
                            {type, description, images}
                        )
                    }
                }
            />
            <textarea className="menu_element description_textarea" value={description} onChange={e => {
                changeDescription(e.target.value)
                props.changeData({type, description: e.target.value, images})
            }}/>
            <button className="menu_element" onClick={() => props.onSave()}>Save</button>
        </div>
    )
}

export default CreateMarkerMenu;