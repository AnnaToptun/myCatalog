import { Card, Container, FormGroup, Typography } from '@mui/material'
import { sendPasswordResetEmail } from 'firebase/auth'
import { React, useContext, useState } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { auth } from '../../firebase/firebase-config'
import classesPages from '../../styles/classesPages'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'

export function ResetParol () {
  const {users} = useContext(CardsUserContext)
  const [email, setEmail] = useState('')
  const emailHandler = (value)=>{
    setEmail(value)
  }

  const resetPassword = async()=>{
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!')
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      })
    
  }
  return (
    <Container  style={classesPages.pageResetBox}>
      
        <span style={classesPages.pageResetPassword}>
          Відновлення паролю
        </span>
      <FormGroup style={classesPages.pageResetPassword}>
          <MyInput
          value={email}
          type="text"
          placeholder="Введіть свій e-mail"
          label="Введіть свій e-mail"
          onChange={e => emailHandler(e.target.value)}
        />
        <Buttons onClick={resetPassword}>Відправити</Buttons>
      </FormGroup>
      
    </Container>
  )
}
