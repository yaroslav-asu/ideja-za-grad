import React, {useEffect, useState} from "react";
import './MarkerDescription.scss'
import axios from "../../axios";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useTranslation} from "react-i18next";

export type markerImage = {
    id: number,
    title: string,
}

const MarkerDescription = (props: {
    type: string,
    description: string,
    handleClose: Function,
    markerId: number,
    additionalClass: string,
}) => {
    const [images, setImages] = useState(Array<markerImage>)
    const {t} = useTranslation();

    useEffect(() => {
        axios.get(`markers/${props.markerId}/images`).then((res) => {
            setImages(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [props.markerId]);

    let imagesSlider: React.ReactElement | null = null
    if (images.length > 0) {
        imagesSlider = <ComponentsSlider
            elements={images.map(image => {
                return <img
                    src={`${process.env.REACT_APP_API_URL}/static/${image.title}`}
                    alt=""
                    key={image.id}
                />
            })}
        />
    }

    return <div className={"marker_description " + props.additionalClass}>
        <button className="close_button" onClick={() => props.handleClose()}>
            <ArrowForwardIosIcon/>
        </button>
        <div className="content_wrapper">
            <h1>{t(`types.${props.type}`)}</h1>
            {imagesSlider}
            <p>{props.description}</p>
        </div>
    </div>
}
export default MarkerDescription;