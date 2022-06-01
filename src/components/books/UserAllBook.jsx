import { Box, Container } from '@mui/material'
import React from 'react'
import classesPages from '../../styles/classesPages'
import { CardBook } from './CardBook'

export function UserAllBook ({userIdBooks, delBookUser, addBook}) {
  return (
    <Container>
      { 
      (userIdBooks.length)
        ?<Container style={classesPages.pageAllCard}  p={0} m={0} > 
          {
            userIdBooks.map(card => (
              <Box key={card.id} my={2} mx={2} >
                <CardBook 
                  addBook={addBook} 
                  delBookUser={delBookUser} 
                  card={card} />
              </Box>
            ))
          }
        </Container>
        :<p>Ще не додано жодної книги</p>
      }
    </Container>
  )
}
