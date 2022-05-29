import React from 'react'
import pets from '../..////'
import cardPet from ',,,,,'
import { Container } from '@mui/material'


export const pets = () => {
  return (
    <div>
      {
        pets.map(pet=>(
          <cardPet key={pet.id} pet={pet}/>
        ))
      }
    </div>
  )
}

function CardPets ({pet}){
  return(
    <Container>
        <span> Name Pet {pet.name}</span>
        <span> year {pet.year}</span>
    </Container>
  )
}