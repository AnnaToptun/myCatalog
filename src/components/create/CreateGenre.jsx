import { Container, FormGroup } from '@mui/material'
import { React, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import classesCreate from '../../styles/classesCreate'

export function CreateGenre () {
  const {addGenre} = useContext(CardsUserContext)
  const [genre, setGenre] = useState({
    genre: ''
  })
  const route = useHistory()
  const newGenreHandler =(value)=>{
    setGenre({...genre, genre: value})
   
  }
  const createGenre = ()=>{
    addGenre(genre)
    setGenre({...genre, genre: ''})
    route.push('/user/home')
  }
  
  return (
    <Container  style={classesCreate.genreForm}>
      <FormGroup>
        <MyInput
         type='text'
         value={genre.genre}
         placeholder='genre'
         label='genre'
         onChange={(e)=>newGenreHandler(e.target.value)}
        />
        <Buttons onClick={createGenre}>Create Genre</Buttons>
      </FormGroup>
    </Container>
  )
}
