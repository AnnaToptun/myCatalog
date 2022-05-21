import { Box, Container, FormGroup, MenuItem } from '@mui/material'
import {React,  useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import { MySelect } from '../../UI/select/MySelect' 
import classesCreate from '../styles/classesCreate'

export function CreateCard () {
  const { addCard, genres} = useContext(CardsUserContext)
  const [cardBook, setCardBook] = useState({
    title: '',
    avtor: '',
    genre: [],
    year: 2022,
    discribe: '',
    img: ''
  })
  const route = useHistory()
  const titleHandle = (value)=>{
    setCardBook({...cardBook, title: value})
  }
  const avtorHandle = (value)=>{
    setCardBook({...cardBook, avtor: value})
  }
  const yearHandle = (value)=>{
    setCardBook({...cardBook, year: value})
  }
  const discribeHandle = (value)=>{
    setCardBook({...cardBook, discribe: value})
  }
  const imgHandle = (value)=>{
    setCardBook({...cardBook, img: value})
  }
  const createCard = ()=>{
    addCard(cardBook)
    route.push('/user/home')
  }
  const handleChange = (e) => {
    setCardBook({...cardBook, genre: e.target.value})
  }
  return (
    <Container  style={classesCreate.card}>
      <FormGroup>
        <Box style={classesCreate.cardForm}>
          <MyInput
            type='text'
            value={cardBook.title}
            placeholder='Title'
            onChange={(e)=>titleHandle(e.target.value)}
            label='Title'
          />
          <MyInput
            type='text'
            value={cardBook.avtor}
            placeholder='Автор'
            onChange={(e)=>avtorHandle(e.target.value)}
            label='Автор'
          />
        </Box>
        <Box style={classesCreate.cardForm}>
          
          <MySelect 
            multiple
            value={cardBook.genre}
            onChange={handleChange}
            >
              
              {
                genres.map((g)=>(
                  <MenuItem key={g.id} value={g.genre}>{g.genre}</MenuItem>
                ))
              }
              
          </MySelect>
          
          <MyInput
            type="number" 
            min="1000" step='1'
            value={cardBook.year}
            placeholder='Рік створення'
            onChange={(e)=>yearHandle(e.target.value)}
            label='Рік створення'
          />
        </Box>
 
        <Box style={classesCreate.cardForm}>
          <MyInput
            type='text'
            value={cardBook.discribe}
            placeholder='Опис'
            onChange={(e)=>discribeHandle(e.target.value)}
            label='Опис'
          />
          <MyInput
            type='text'
            value={cardBook.img}
            placeholder='URL-посилання на картинку'
            onChange={(e)=>imgHandle(e.target.value)}
            label='URL-посилання на картинку'
          />
        </Box>
        <Buttons
          onClick={createCard}
        >
          Створити
        </Buttons>
      </FormGroup>
    </Container>
  )
}
