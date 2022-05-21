import { Box, Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import classIcons from '../styles/classIcons'
import classNewComment from '../styles/classNewComment'

import { Link } from 'react-router-dom'
export const NewComment = ({comment}) => {
  const {userCurrent} = useContext(CardsUserContext)

  return (
    <Container style={classNewComment.fieldComment}>
      <Box style={classNewComment.fieldAccount}>
        {
          (userCurrent.img === '')
          ?<AccountCircleIcon style={classIcons.iconsAccount}/>
          :<Link to={`/user/profile/${userCurrent.id}`}><img style={classNewComment.commentImg} src={userCurrent.img} alt=''/></Link>
        }
        
        <span>{userCurrent.fistName} {userCurrent.lastName}</span>
      </Box>
      <Box>{comment}</Box>
    </Container>
  )
}
