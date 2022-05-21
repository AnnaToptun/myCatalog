import { Container, FormGroup, TextField } from '@mui/material'
import {React,  useContext, useState } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons'
import { Comments } from './Comments'

export function FormComment () {
  const {commentIdBooks, setCommentIdBooks} = useContext(CardsUserContext)
  const [comment, setComment] = useState( '')
   const newComment = (valueComment)=>{
      setComment(valueComment)
  }
  const createComment = ()=>{
    setCommentIdBooks([...commentIdBooks,{id: Date.now(), comment: comment} ])
    setComment('')
  }
  return (
    <Container>
      <span>Create Title</span>
      <FormGroup>
        <TextField
         value={comment}
         type='text'
         placeholder='text comment'
         onChange={(e)=>newComment(e.target.value)}
        />
        <Buttons onClick={createComment}>Create Commnet</Buttons>
      </FormGroup>
    </Container>
  )
}
