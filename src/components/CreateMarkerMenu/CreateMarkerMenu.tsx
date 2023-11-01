import React from "react";
import './CreateMarkerMenu.scss';
import markerType from "../../types/markerTypes";
import ImagesUploader from "../ImagesUploader/ImagesUploader";
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from "react-i18next";

const CreateMarkerMenu = (props: {
    onClose: Function,
    onSave: Function,
    changeData: Function,
    types: markerType[]
}) => {
    const [type, changeType] = React.useState(props.types[0].value)
    const [images, changeImages] = React.useState<Array<File>>([])
    const [description, changeDescription] = React.useState('')
    const {t} = useTranslation()

    return (
        <form className="create_marker_menu" onSubmit={e => {
            e.preventDefault()
        }}>
            <h2 className="title">{t('createMarkerMenu.title')}</h2>
            <button className="close_button" onClick={() => props.onClose()}>
                <CloseIcon/>
            </button>
            <div className="type_select_wrapper">
                <p>{t('createMarkerMenu.type')}:</p>
                <select
                    className="type_select menu_element"
                    value={type as string}
                    onChange={e => {
                        changeType(e.target.value)
                        props.changeData({type: e.target.value, images, description})
                    }}
                >
                    {props.types.map((type, index) => {
                        return <option key={index} value={type.value}>{t(`types.${type.title}`)}</option>
                    })}
                </select>
            </div>
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
            <textarea
                className="menu_element description_textarea"
                value={description}
                placeholder={t('createMarkerMenu.description')}
                onChange={e => {
                    changeDescription(e.target.value)
                    props.changeData({type, description: e.target.value, images})
                }}
            />
            <button className="menu_element" onClick={() => props.onSave()}>{t('createMarkerMenu.save')}</button>
        </form>
    )
}

export default CreateMarkerMenu;