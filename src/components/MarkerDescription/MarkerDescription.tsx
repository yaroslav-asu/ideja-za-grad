import React, {useEffect, useState} from "react";
import './MarkerDescription.scss'
import axios from "../../axios";
import ComponentsSlider from "../ComponentsSlider/ComponentsSlider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type markerImage = {
    id: number,
    title: string,
}

export default function MarkerDescription(props: {
    type: string,
    description: string,
    handleClose: Function,
    markerId: number,
    additionalClass: string,
}) {
    const [images, setImages] = useState(Array<markerImage>)

    useEffect(() => {
        axios.get(`markers/${props.markerId}/images`).then((res) => {
            setImages(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [props.markerId]);

    return <div className={"marker_description " + props.additionalClass}>
        <button className="close_button" onClick={() => props.handleClose()}>
            <ArrowForwardIosIcon/>
        </button>
        <h1>{props.type}</h1>
        <ComponentsSlider
            elements={images.map(image => {
                return <img
                    src={`${process.env.REACT_APP_API_URL}/static/${image.title}`}
                    alt="marker image"
                    key={image.id}
                />
            })}
        />
        <p>{props.description}</p>
    </div>
}