import React from 'react';
import { PictureAsPdf, Image, VideoFile, AudioFile, Description, Code, Archive, TableView, InsertDriveFile } from "@mui/icons-material";

const FileIcon = ({ type = '', link, className }) => {

    // List of file types that should be downloaded instead of opened
    const downloadableTypes = [
        'application/json',
        'text/javascript',
        'application/javascript',
        'text/typescript',
        'application/typescript',
        'text/plain',
        'text/css',
        'text/html',
        'application/xml',
        'text/xml',
        'text/csv'
    ];

    const handleFileClick = () => {
        if (!link) return;

        if (downloadableTypes?.includes(type)) {
            const a = document.createElement('a');
            a.href = link;
            a.download = link.split('/').pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            window.open(link, '_blank');
        }
    };

    const getIconByMimeType = () => {
        const mimeType = type.toLowerCase();

        // PDF files
        if (mimeType.includes('pdf')) {
            return <PictureAsPdf color="error" />;
        }

        // Image files
        if (mimeType.includes('image')) {
            return <Image color="primary" />;
        }

        // Code or development files
        if (mimeType.includes('json') ||
            mimeType.includes('javascript') ||
            mimeType.includes('python') ||
            mimeType.includes('java') ||
            mimeType.includes('typescript') ||
            mimeType.includes('xml') ||
            mimeType.includes('css')) {
            return <Code color="warning" />;
        }

        // Video files
        if (mimeType.includes('video')) {
            return <VideoFile color="success" />;
        }

        // Audio files
        if (mimeType.includes('audio')) {
            return <AudioFile color="secondary" />;
        }

        // Document files
        if (mimeType.includes('doc') || mimeType.includes('word')) {
            return <Description color="info" />;
        }

        // Compressed files
        if (mimeType.includes('zip') ||
            mimeType.includes('rar') ||
            mimeType.includes('7z')) {
            return <Archive color="action" />;
        }

        // Spreadsheet files
        if (mimeType.includes('excel') ||
            mimeType.includes('spreadsheet') ||
            mimeType.includes('csv')) {
            return <TableView color="success" />;
        }

        // Default file icon
        return <InsertDriveFile color="action" />;
    };

    return (
        <div
            className={`cursor-pointer ${className}`}
            onClick={handleFileClick}
            title={`Click to ${downloadableTypes.includes(type) ? 'download' : 'view'} file`}
        >
            {getIconByMimeType()}
        </div>
    );
};

export default FileIcon;