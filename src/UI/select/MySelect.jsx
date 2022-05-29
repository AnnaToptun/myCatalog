import React, { useContext } from 'react'
import { Box, Select } from '@mui/material'
import classesSelect from './classesSelect'
export function MySelect ({children, about, ...props}) {
  
  return (
      <Box p={1}>
        <Select
        style={classesSelect.selectForm}
        {...props}
      >
        {children}
      </Select>
      </Box>
      
  )
}
