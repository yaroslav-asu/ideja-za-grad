import React from "react";
import './DeletableImage.scss'
import ClearIcon from '@mui/icons-material/Clear';

const DeletableImage = (props: {
    onDelete: Function,
    src: string,
}) => {
    return (
        <div className="deletable_image">
            <button className="delete_button" onClick={() => props.onDelete()}>
                <ClearIcon/>
            </button>
            <img key={props.src} src={props.src} alt="" style={{display: "block"}}/>
        </div>
    );
}
export default DeletableImage;