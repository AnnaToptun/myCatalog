import { Container, FormGroup, TextField } from '@mui/material'
import {React,  useContext, useState } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons'
import { Comments } from './Comments'

export function FormComment () {
  const {commentIdBooks, setCommentIdBooks, userCurrent} = useContext(CardsUserContext)
  const [comment, setComment] = useState({
    id: Date.now(),
    userId: userCurrent.id,
    userName: userCurrent.fistName,
    userLastName: userCurrent.lastName,
    userImg: userCurrent.img,
    comment: ''
  })
   const newComment = (value)=>{
      setComment({...comment, comment: value})
  }
  const createCommentBook = (card)=>{
    setCommentIdBooks([...commentIdBooks, comment])
    setComment({...comment, comment: ''})

  }
  return (
    <Container>
      <span>Create Title</span>
      <FormGroup>
        <TextField
         value={comment.comment}
         type='text'
         placeholder='text comment'
         onChange={(e)=>newComment(e.target.value)}
        />
        <Buttons onClick={createCommentBook}>Create Comment</Buttons>
      </FormGroup>
    </Container>
  )
}
