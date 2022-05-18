import { Box, Container, Grid } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'

export function AllCard () {
    const {books} = useContext(CardsUserContext)
 
    return (
      
        <Box style={{display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'space-around'}} >
           
            {
                books.map((card)=>(
                    <Box key={card.id} style={{width: '450px'}} my={4}>
                        <CardBook card={card}/>
                    </Box>
                ))
            }    
              
        </Box>
    )
}
