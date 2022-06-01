import { Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { NewComment} from './NewComment'

export function Comments () {
  const {commentIdBooks, books} = useContext(CardsUserContext)
  
  return (
    <Container >
      
      { (commentIdBooks.length)
        ?commentIdBooks.map((comment)=>(
          <NewComment key={comment.id} comment={comment}/>
        ))
        : 'Ще не додано жодного коментаря'
      }
    </Container>
  )
}
