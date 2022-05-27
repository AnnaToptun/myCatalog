import { Box, Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import classIcons from '../../styles/classIcons'
import classNewComment from '../../styles/classNewComment'

import { Link } from 'react-router-dom'
export const NewComment = ({comment}) => {
  const {userCurrent,users} = useContext(CardsUserContext)
  const userComment = users.filter(u => {
    if(u.id ===comment.userId){
        return u
    }
  })
  const userId = userComment[0]
  console.log(comment.userId)
  return (
    <Container style={classNewComment.fieldComment}>
      <Box style={classNewComment.fieldAccount}>
        {
          (userCurrent.img === '')
          ?<Link to={`/user/profile/${comment.userId}`}><AccountCircleIcon style={classIcons.iconsAccount}/></Link>
          :<Link to={`/user/profile/${comment.userId}`}><img style={classNewComment.commentImg} src={userId.img} alt=''/></Link>
        }
        
        <span>{userId.fistName} {userId.lastName}</span>
      </Box>
      <Box>{comment.comment}</Box>
    </Container>
  )
}
