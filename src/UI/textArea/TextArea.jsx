import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import classesTextArea from './classesTextArea';
import { Box } from '@mui/material';

export function TextArea ({ ...props}) {
  return (
    <Box p={1}>
      <TextareaAutosize style={classesTextArea.myAreaDiscribeEdit}{...props}/>
    </Box>
    
  )
}
