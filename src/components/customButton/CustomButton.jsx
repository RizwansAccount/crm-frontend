import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({children, onClick, className, style}) => {
  return (
    <Button className={className} style={style} variant="contained" onClick={onClick}>
      {children}
    </Button>
  )
}

export default CustomButton