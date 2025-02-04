import React from 'react'

const AuthDiv = ({ children, title }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[32%] flex items-center flex-col">
                {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}
                {children}
            </div>
        </div>
    )
}

export default AuthDiv