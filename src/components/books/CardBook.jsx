import { Card, Container } from '@mui/material'
import { React, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons' 
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classIcons from '../styles/classIcons'



export function CardBook ({card, addBook}) {
  const { db, user, addBookUser, userCurrent, users} = useContext(CardsUserContext)
  
  
  const route = useHistory()
  const detailsCard =()=>{
    route.push(`/book/${card.id}`)
    console.log(card.id)
  }
  const deleteCard =()=>{
    //setAllCard(allCard.filter((book)=> book.id !== card.id))
  }
 
 
  return (
    <Card style={{display: 'flex', padding: '10px', flexWrap: 'wrap'}}  >
      <img src={card.img} style={{height: '150px'}}/>
      <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
        <span>Назва: {card.title}</span>
        <span>Автор: {card.avtor}</span>
        <span>Категорія: {card.category}</span>
        <span>Жанр: {card.genre}</span>
        <span>Рік: {card.year}</span>
        {
          (user)
          ?
            <Container style={{display: 'flex'}}>
              <AddCircleIcon  style={classIcons.icons} onClick={()=>addBook(card)}/>
              <RemoveCircleIcon style={classIcons.icons}   onClick={deleteCard}/>
              <MoreHorizIcon  style={classIcons.icons}  onClick={detailsCard}/>
              
            </Container>
          :
          <MoreHorizIcon style={classIcons.icons}  onClick={detailsCard}/>
        }
        
      </div>
    </Card>
  )
}
