import { Box, Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import classIcons from '../../styles/classIcons'
import classNewComment from '../../styles/classNewComment'

import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
export const NewComment = ({comment}) => {
  const {userCurrent,users,setUserId} = useContext(CardsUserContext)
  const route = useHistory()
  const userComment = users.filter(user => {
    if(user.id ===comment.userId){
        return user
    }
  })
  const userId = userComment[0]
  const detailsUser = ()=>{
    setUserId(userId)
  }
  return (
    <Container style={classNewComment.fieldComment}>
      <Box style={classNewComment.fieldAccount}>
        {
          (userId.img === '')
          ?
            <Link to={`/user/profile/${comment.userId}`}>
              <AccountCircleIcon 
                style={classIcons.iconsAccount}
                onClick={detailsUser}
              />
            </Link>
          :<Link to={`/user/profile/${comment.userId}`} style={classNewComment.commentImgBox}>
            <img 
              style={classNewComment.commentImg} 
              src={userId.img} 
              alt=''
              onClick={detailsUser}
            />
          </Link>
        }
        
        <span>{userId.fistName} </span>
      </Box>
      <Box>{comment.comment}</Box>
    </Container>
  )
}
