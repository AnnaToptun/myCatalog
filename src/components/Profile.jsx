import { Box, Container } from '@mui/material'
import { React, useContext, useState } from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { useHistory} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { MyInput } from '../UI/input/MyInput'
import { MyModal } from '../UI/modal/myModal'
import { Buttons } from '../UI/button/Buttons'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import profile from '../styles/Profile'
import classIcons from '../styles/classIcons'
import { Loading } from '../UI/loading/Loading'
import classesPages from '../styles/classesPages'
import { Card } from '@material-ui/core'
import classesCardBook from '../styles/classesCardBook'

export function Profile () {
  const {userCurrent, setBookId,editCardUser, users, setUserCurrent, userId, setUserId}= useContext(CardsUserContext)
  
  const [newFieldUser, setNewFieldUser] = useState({
    fistName: userCurrent.fistName,
    lastName: userCurrent.lastName,
    birthday:  userCurrent.birthday,
    img: userCurrent.img,
  })
  const route = useHistory()

  const updateUser = async()=>{
    const id = userId.id
    setUserId({...userId, ...newFieldUser})
    setUserCurrent({...userCurrent, ...newFieldUser})
    editCardUser(id, 'Users', newFieldUser)
    console.log(userCurrent)
  }
  const back = ()=>{
    route.push('/home')
  }
  const detailsCard =(card)=>{
    route.push(`/book/${card.id}`)
    setBookId(card)
  }
  const nameHandler =(value)=>{
    setNewFieldUser({...newFieldUser, fistName: value})
  }
  const lastNameHandler =(value)=>{
    setNewFieldUser({...newFieldUser, lastName: value})
  }
  const birthdayHandler =(value)=>{
    setNewFieldUser({...newFieldUser, birthday: value})
  }
  const imgHandler =(value)=>{
    setNewFieldUser({...newFieldUser, img: value})
  }
  
  return (
    <Container>
      {
        (userId)
        ? <Box key={userId.id} style={(window.innerWidth < 500)
          ?profile.profileSmall
          :profile.profile
        }>
              
              <Box style={profile.profileImgBox}>
                {
                  (userId.img === '')
                  ?<AccountCircleIcon style={classIcons.iconsAccountProfile}/>
                  :<img style={profile.profileImg} src={userId.img} alt=''/>
                }
              </Box>
              <Box style={profile.profileDitails}>
                <Box style={profile.profileEdit}>
                     <span style={profile.profileName}>{userId.fistName} {userId.lastName}</span>
                      {
                        (userCurrent.id===userId.id)
                        ?
                        <MyModal title={<BuildCircleIcon style={classIcons.iconsEditProfile}/>}>
                          <MyInput
                            value={newFieldUser.fistName}
                            type='text'
                            onChange={(e)=>nameHandler(e.target.value)}
                          />
                          <MyInput
                            value={newFieldUser.lastName}
                            type='text'
                            onChange={(e)=>lastNameHandler(e.target.value)}
                          />
                          <MyInput
                            value={newFieldUser.birthday}
                            type='date'
                            onChange={(e)=>birthdayHandler(e.target.value)}
                          />
                          <MyInput
                            value={newFieldUser.img}
                            type='text'
                            onChange={(e)=>imgHandler(e.target.value)}
                          />
                          <Buttons onClick={()=>updateUser(userId)}>Зберегти</Buttons>
                        </MyModal>
                        :''
                      }
                </Box>
               
                
                <Box style={profile.profileData}>
                  <a style={profile.profileInfo} src={userId.email}>Email: {userId.email}</a>
                  <span style={profile.profileInfo}>Дата народження: {userId.birthday}</span>
                  <span style={profile.profileInfo}>Додані книги: </span>
                  <Buttons onClick={back}>  Назад</Buttons>
                  <Container  style={classesPages.pageAllCard}>
                  {
                    userId.userBooks.map(book =>(
                      <Box key={book.id} my={2} mx={2}>
                        <Card style={classesPages.pageAvtors} onClick={()=>detailsCard(book)}>
                          <div style={classesCardBook.cardImgBox}>
                            <img src={book.img} style={{width: '100%'}} alt=''/>
                          </div>
                          <p style={profile.profileBookName}>{book.avtoe}{book.title}</p>
                          
                        </Card>     
                      </Box>

                    ))
                  }
                  </Container>
                </Box>
                
              </Box>
            </Box>
        
          
        
        : <Loading/>
      }
        
    </Container>
  )
}
