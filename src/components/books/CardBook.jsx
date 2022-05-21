import { Card, Box } from '@mui/material'
import { React, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classIcons from '../styles/classIcons'
import classesCardBook from '../styles/classesCardBook'



export function CardBook ({card, addBook, delBookUser  }) {
  const { user, userIdBooks, setBookId } = useContext(CardsUserContext)
 const [mouse, setMouse]=useState(false)
  const bookid = userIdBooks.map(b => b.id);
 
  const route = useHistory()
  const detailsCard =()=>{
    route.push(`/book/${card.id}`)
    console.log(card.id)
    setBookId(card.id)
  }
  const changeStyle = ()=>{
    (mouse)? setMouse(false):setMouse(true)
  }
  return (
    <Card style={
        (mouse)
        ? classesCardBook.cardHover
        : classesCardBook.card
      } 
      onMouseOver={changeStyle}
      onMouseOut={changeStyle}
    >
      <img src={card.img} style={classesCardBook.cardImg} alt=''/>
      <Box style={classesCardBook.cardInfo}>
        <span style={classesCardBook.cardTitleAvtor}>Назва: {card.title}</span>
        <span style={classesCardBook.cardTitleAvtor}>Автор: {card.avtor}</span>
        <span style={classesCardBook.cardTitleAvtor}>Жанр: {card.genre.join(', ')}</span>
        <span>Рік: {card.year}</span>
        {
          (user)
          ?
            <Box style={classesCardBook.cardButton}>
              {
                (!bookid.includes(card.id))
                ?<AddCircleIcon  style={classIcons.iconsAdd} onClick={()=>addBook(card)}/>
                : <RemoveCircleIcon style={classIcons.iconsDelete}   onClick={()=> delBookUser(card)}/>
              }
              <MoreHorizIcon  style={classIcons.icons}  onClick={detailsCard}/>
            </Box>
          :
          <MoreHorizIcon style={classIcons.icons}  onClick={detailsCard}/>
        }
        
      </Box>
    </Card>
  )
}
