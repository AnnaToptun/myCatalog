import { Input } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import classes from './classes'

export function MyInput ({...props}) {
  return (
    <Box p={1}>
      <Input style={classes.myInput} {...props}/>
    </Box>
    
  )
}
