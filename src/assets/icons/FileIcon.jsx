import React from 'react';
import { PictureAsPdf, Image } from "@mui/icons-material";

const FileIcon = ({ type, link, className }) => {

    const fnOnClick = () => {
        if (link) { window.open(link, "_blank"); };
    };

    return (
        <div onClick={fnOnClick} className={`cursor-pointer ${className}`}>
            {type.includes("pdf") ? (
                <PictureAsPdf color="error" />
            ) : type.includes("image") ? (
                <Image color="primary" />
            ) : (
                "N/A"
            )}
        </div>
    )
}

export default FileIcon