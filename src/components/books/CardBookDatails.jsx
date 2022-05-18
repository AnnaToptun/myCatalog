import { Box, Card, Container } from '@mui/material'
import { React, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Buttons } from '../../UI/button/Buttons'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'

export function CardBookDatails () {
  const {books} = useContext(CardsUserContext)
  //const [arrayBook, setArrayBook] = useState()
  const params = useParams()
  const route = useHistory()
  const book = books.filter((book) => book.id === params.id)
  console.log(params.id)
  
  const back = ()=>{
    route.push('/home')
    console.log(params.id)
  }
  return (
    <Container p={10}>
      
      {
        book.map((card)=>(
          <Box key={card.id} my={4}>
            <Card style={{display: 'flex', padding: '10px'}}  >
              <img src={card.img} style={{height: '300px'}}/>
              <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
                <span>Назва: {card.title}</span>
                <span>Автор: {card.avtor}</span>
                <span>Категорія: {card.category}</span>
                <span>Рік: {card.year}</span>
                <p>Опис: {card.discribe}</p>

                <Buttons onClick={back}>
                  Назад
                </Buttons>
              </div>
            </Card>  
          </Box>
          
        ))
      }
     
    </Container>
    
  )
}
