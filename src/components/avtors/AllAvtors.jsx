import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Card } from '@material-ui/core'
import {React, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import classesPages from '../../styles/classesPages'

export function AllAvtors () {
 const {avtors, setAvtorId} = useContext(CardsUserContext)
 const route = useHistory()
 const detailsAvtor = (card)=>{
  setAvtorId(card)  
  route.push(`/avtor/${card.id}`)
}
  return (
    <Container  style={classesPages.pageAllCard}>
      {avtors.map(card => (
            <Box key={card.id} my={2} mx={2}>
              <Card style={classesPages.pageAvtors} onClick={() => detailsAvtor(card)}>
                <div  style={classesPages.avtorBookImgBox} >
                  <img src={card.img} style={{height: '320px'}} alt="" />
                </div>
                
                <a style={classesPages.avtorName}>{card.avtor}</a>
              </Card>
            </Box>
          ))}
    </Container>
  )
}
