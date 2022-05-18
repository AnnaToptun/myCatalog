import { FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'


export function CheckBox ({...props}) {
  return (
    <FormGroup >
        <FormControlLabel
           
             {...props}
        />
     
    </FormGroup>
  )
}
