import { Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { NewComment} from './NewComment'

export function Comments ({bookCurrent}) {
  const {commentIdBooks, books} = useContext(CardsUserContext)
  const commentsBook = bookCurrent.comments
  //const co
  console.log(commentsBook)
  return (
    <Container >
      
      { (commentsBook.length)
        ?commentsBook.map((comment)=>(
          <NewComment key={comment.id} comment={comment}/>
        ))
        : 'Ще не додано жодного коментаря'
      }
    </Container>
  )
}
