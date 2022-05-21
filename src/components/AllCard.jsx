import { Box, Container } from '@mui/material'
import { React, useContext} from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'
import { SortedBook } from './SortedBook';
import classesPages from './styles/classesPages';

export function AllCard ({addBook, delBookUser  }) {
    const {booksSort} = useContext(CardsUserContext)

  
    return (
        <Container>
            <SortedBook/>
            <Box style={classesPages.pageAllCard} >
                {
                    booksSort.map((card)=>(
                        <Box key={card.id}  my={4}>
                            <CardBook 
                                delBookUser={delBookUser}
                                addBook={addBook}
                                card={card}
                            />
                        </Box>
                    ))
                }   
            </Box>
        </Container>
        
    )
}
