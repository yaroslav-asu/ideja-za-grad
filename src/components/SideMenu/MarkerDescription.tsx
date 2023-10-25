import React, {useEffect, useState} from "react";
import './MarkerDescription.scss'
import axios from "../../axios";

export type markerImage = {
    id: number,
    title: string,
}

export default function MarkerDescription(props: {
    type: string,
    description: string,
    style?: Object,
    handleClose: Function,
    markerId: number,
}) {
    const [images, setImages] = useState(Array<markerImage>)

    useEffect(() => {
        axios.get(`markers/${props.markerId}/images`).then((res) => {
            setImages(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [props.markerId]);

    return <div className="side_menu" style={props.style}>
        <button onClick={() => props.handleClose()}>Close</button>
        <h1>{props.type}</h1>
        <p>{props.description}</p>
        {images.map(image => {
            return <img
                src={`${process.env.REACT_APP_API_URL}/static/${image.title}`}
                alt="marker image"
                key={image.id}
            />
        })}
    </div>
}