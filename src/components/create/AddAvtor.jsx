
import { Box, Container, FormGroup, MenuItem } from '@mui/material'
import {React,  useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import { MySelect } from '../../UI/select/MySelect' 
import classesCreate from '../../styles/classesCreate'
import classes from '../../UI/input/classes'

export const AddAvtor = () => {
  const {addAvtor} = useContext(CardsUserContext)
  const [avtor, setAvtor] = useState({
    avtor: '',
    booksAvtor: [],
    discribe: '',
    img: ''
  })
  const route = useHistory()
  const avtorHandle = (value)=>{
    setAvtor({...avtor, avtor: value})
  }
  const discribeHandle = (value)=>{
    setAvtor({...avtor, discribe: value})
  }
  const imgHandle = (value)=>{
    setAvtor({...avtor, img: value})
  }
  const addNewAvtor = ()=>{
    addAvtor(avtor)
    route.push('/user/home')
  }
  return (
    <Container  style={classesCreate.card}>
      <FormGroup>
        <MyInput
          type='text'
          value={avtor.avtor}
          placeholder="Ім'я та прізвище автора"
          onChange={(e)=>avtorHandle(e.target.value)}
          label="Ім'я та прізвище автора"
        />
        <MyInput
          type='text'
          value={avtor.discribe}
          placeholder="Про автора"
          onChange={(e)=>discribeHandle(e.target.value)}
          label="Про автора"
        
        />
        <MyInput
          type='text'
          value={avtor.img}
          placeholder="Фото автора"
          onChange={(e)=>imgHandle(e.target.value)}
          label="Фото автора"
        />
        <Buttons onClick={addNewAvtor}>Створити</Buttons>
      </FormGroup>
    </Container>
  )
}
