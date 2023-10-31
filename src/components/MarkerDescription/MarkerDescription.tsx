import React, {useEffect, useState} from "react";
import './MarkerDescription.scss'
import axios from "../../axios";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type markerImage = {
    id: number,
    title: string,
}

export default (props: {
    type: string,
    description: string,
    handleClose: Function,
    markerId: number,
    additionalClass: string,
}) => {
    const [images, setImages] = useState(Array<markerImage>)

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
                    alt="marker image"
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
            <h1>{props.type}</h1>
            {imagesSlider}
            <p>{props.description}</p>
        </div>
    </div>
}