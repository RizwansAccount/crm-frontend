import { Modal } from '@mui/material'
import React from 'react'

const CustomModal = ({ title, open, onClose, children, className }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[70vw] max-h-[80vh] min-h-[40vh] overflow-y-auto bg-white shadow-2xl p-8 rounded-md ${className}`}>
                {title && <h1 className="text-xl font-bold mb-4">{title}</h1>}
                {children}
            </div>
        </Modal>
    )
}

export default CustomModal