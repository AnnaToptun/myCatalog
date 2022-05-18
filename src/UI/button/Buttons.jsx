import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import classes from './classes'

export function Buttons ({children, ...props}) {
  return (
    <Box p={1}>
      <Button variant='outlined' style={classes.myButton} {...props}>{children}</Button>
    </Box>
    
  )
}
