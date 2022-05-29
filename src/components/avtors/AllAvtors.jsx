import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Card } from '@material-ui/core'
import {React, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import classesPages from '../../styles/classesPages'

export function AllAvtors () {
 const {avtors} = useContext(CardsUserContext)
 const route = useHistory()
 const detailsAvtor = (card)=>{
  route.push(`/avtor/${card.id}`)
}
  return (
    <Container  style={classesPages.pageAllCard}>
      {avtors.map(card => (
            <Box key={card.id} my={4}>
              <Card style={classesPages.pageAvtors}>
                <img src={card.img} style={{height: '250px'}} alt="" />
                <a onClick={() => detailsAvtor(card)}>{card.avtor}</a>
              </Card>
            </Box>
          ))}
    </Container>
  )
}
