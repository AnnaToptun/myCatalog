import { Box, Container} from '@mui/material'
import { React, useContext} from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'
import { SortedBook } from './SortedBook';
import classesPages from '../styles/classesPages';
import { Loading } from '../UI/loading/Loading';
import PaginationBook from './PaginationBook';

export function AllCard ({addBook, delBookUser  }) {
    const {booksSort} = useContext(CardsUserContext)

    return (
        <Container>
            <SortedBook/>
            {
            (booksSort.length)

                ? <Box style={classesPages.pageAllCard} >
                    {
                        booksSort.map((card)=>(
                        <Box key={card.id}  my={4}>
                            <CardBook 
                                delBookUser={delBookUser}
                                addBook={addBook}
                                card={card}
                            />
                        </Box>))
                    }
                </Box>
                
                : <Loading/>
            }   
            
        </Container>
        
    )
}
