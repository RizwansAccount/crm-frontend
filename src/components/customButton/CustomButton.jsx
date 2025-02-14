import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({children, onClick, className, style}) => {
  return (
    <Button className={className} style={style} variant="contained" onClick={onClick}>
      {children}
    </Button>
  )
}

export const RoundedBtn = ({children, onClick, disabled = false})=>{
  return (
    <button onClick={onClick} disabled={disabled} className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' >
      {children}
    </button>
  )
}

export default CustomButton