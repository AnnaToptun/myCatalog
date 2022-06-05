import { Card, Box } from '@mui/material'
import { React, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classIcons from '../../styles/classIcons'
import classesCardBook from '../../styles/classesCardBook'

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { AddBoxOutlined } from '@mui/icons-material'


export function CardBook ({card, addBook, delBookUser  }) {
  const { user, userIdBooks, setBookId, avtors, setCommentIdBooks,  setAvtorId, addBooksAvtor} = useContext(CardsUserContext)
 const [mouse, setMouse]=useState(false)
  const bookid = userIdBooks.map(b => b.id);
 
  const route = useHistory()
  const detailsCard =()=>{
    route.push(`/book/${card.id}`)
    setBookId(card)
    setCommentIdBooks([...card.comments])
  }
  const changeStyle = ()=>{
    (mouse)? setMouse(false):setMouse(true)
  }
  const avtor = avtors.filter(avtor =>{
    if(avtor.avtor === card.avtor){
      return (avtor)
    }
    
  })
  const currentAvtor = avtor[0]
  const detailsAvtor = ()=>{
    const booksAvtor = currentAvtor.booksAvtor
 
      setAvtorId({...currentAvtor, booksAvtor: [...booksAvtor, card.id]})
      const id = currentAvtor.id
      addBooksAvtor(id, booksAvtor, card.id)
        setAvtorId({...currentAvtor})
    route.push(`/avtor/${currentAvtor.id}`)
    
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
      {
          (user)
          ?
            <Box style={classesCardBook.cardButton}>
              {
                (!userIdBooks.includes(card.id))
                ?<AddCircleIcon  style={classIcons.iconsAdd} onClick={()=>addBook(card)}/>
                : <RemoveCircleIcon style={classIcons.iconsDelete} onClick={()=> delBookUser(card)}/>
              }
              
            </Box>
          :''
        }  
      <Box onClick={detailsCard}>
        <Box style={classesCardBook.cardImgBox}>
          <img src={card.img} style={classesCardBook.cardImg} alt=''/>
        </Box>
      
        
      </Box>
      <Box style={classesCardBook.cardInfo}>
        <span style={classesCardBook.cardTitleAvtor}>Назва: {card.title}</span>
        <span>Автор:
          <a style={classesCardBook.cardAvtor} onClick={detailsAvtor}> {card.avtor} </a> 
        </span>
      </Box>
      
    </Card>
  )
}
