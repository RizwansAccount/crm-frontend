import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({children, onClick}) => {
  return (
    <Button variant="contained" onClick={onClick}>
        {children}
    </Button>
  )
}

export default CustomButton