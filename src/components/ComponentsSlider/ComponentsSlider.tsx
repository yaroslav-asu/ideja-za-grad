import React, {useEffect, useState} from "react";
import "./ComponentsSlider.scss"

const ComponentsSlider = (
    props: { elements: Array<React.ReactElement> }
) => {
    const [currentComponentId, changeCurrentComponentId] = useState(0)

    useEffect(() => {
        if (currentComponentId > 0 && currentComponentId >= props.elements.length)
            changeCurrentComponentId(props.elements.length - 1)
    }, [props.elements.length]);
    let prevButton: React.ReactElement | null = null
    let nextButton: React.ReactElement | null = null

    if (props.elements.length > 1) {
        prevButton = <button
            className={"nav_button"}
            onClick={() => {
                if (currentComponentId > 0) {
                    changeCurrentComponentId(currentComponentId - 1)
                }
            }}
            disabled={currentComponentId <= 0}
        >
            Prev
        </button>
        nextButton = <button
            className={"nav_button"}
            onClick={() => {
                if (currentComponentId + 1 < props.elements.length) {
                    changeCurrentComponentId(currentComponentId + 1)
                }
            }}
            disabled={currentComponentId + 1 >= props.elements.length}
        >
            Next
        </button>
    }

    return (
        <div className={"components_slider"}>
            {prevButton}
            {props.elements[currentComponentId]}
            {nextButton}
        </div>
    )
}

export default ComponentsSlider