import { Box, Container, Skeleton } from '@mui/material'
import { React, useContext} from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'
import { SortedBook } from './SortedBook';
import classesPages from '../styles/classesPages';
import { Loading } from '../UI/loading/Loading';

export function AllCard ({addBook, delBookUser  }) {
    const {booksSort} = useContext(CardsUserContext)

  
    return (
        <Container>
            <SortedBook/>
            <Box style={classesPages.pageAllCard} >
                {
                (booksSort.length)
                    ? booksSort.map((card)=>(
                        <Box key={card.id}  my={4}>
                            <CardBook 
                                delBookUser={delBookUser}
                                addBook={addBook}
                                card={card}
                            />
                        </Box>
                    ))
                    : <Loading/>
                }   
            </Box>
        </Container>
        
    )
}
