import React from 'react';
import { Box, Container } from '@material-ui/core';
import { CardBook } from './CardBook';
import classesPages from '../../styles/classesPages';

export function SortedArray({ books, delBookUser, includeBook }) {
  return (
    <Container>
      {
        (books.length)
        ? <Container style={classesPages.pageAllCard}>
            {
              books.map(card => (
                <Box key={card.id} my={4} mx={2} >
                  <CardBook includeBook={includeBook} delBookUser={delBookUser} card={card} />
                </Box>
              ))
            }
          </Container>
        : <p>Ще не додано жодної книги з цього жанру</p>
      
      }
    </Container>
      
  )
  
}
