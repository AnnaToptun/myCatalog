import { Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { NewComment} from './NewComment'

export function Comments () {
  const {commentIdBooks} = useContext(CardsUserContext)
 
  return (
    <Container >
      {
        commentIdBooks.map((comment)=>(
          <NewComment key={comment.id} comment={comment.comment}/>
        ))
      }
    </Container>
  )
}
