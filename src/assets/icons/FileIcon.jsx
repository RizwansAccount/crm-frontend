import React from 'react';
import { PictureAsPdf, Image } from "@mui/icons-material";

const FileIcon = ({ type, link, className }) => {
    
    return (
        <div className={`cursor-pointer ${className}`}>
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