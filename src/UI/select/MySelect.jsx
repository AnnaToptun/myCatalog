import React from 'react'
import { Box, Select } from '@mui/material'
import classes from './Classes'

export function MySelect ({children, about, ...props}) {
 
  return (
      <Box p={1}>
        <Select
        style={classes.selectForm}
        {...props}
      >
        {children}
      </Select>
      </Box>
      
  )
}
