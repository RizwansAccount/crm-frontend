import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({children, onClick, className}) => {
  return (
    <Button className={className} variant="contained" onClick={onClick}>
        {children}
    </Button>
  )
}

export default CustomButton