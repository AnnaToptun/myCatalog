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

export function Profile () {
  const {userCurrent, setBookId,editCardUser, users}= useContext(CardsUserContext)
  const params = useParams()
  
  const [newFieldUser, setNewFieldUser] = useState({
    fistName: userCurrent.fistName,
    lastName: userCurrent.lastName,
    birthday:  userCurrent.birthday,
    img: userCurrent.img,
  })
  const route = useHistory()
  const findUserId = users.filter((u) =>{
    if(u.id === params.id){
      return u
    }
  })
  const userId = findUserId[0]

  const updateUser = async(userId)=>{
    const id = userId.id
    console.log(id)
    editCardUser(id, 'Users', newFieldUser)
    route.push('/user/home')
  }
  const detailsCard =(card)=>{
    route.push(`/book/${card.id}`)
    console.log(card.id)
    setBookId(card.id)
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
        (findUserId.length)
        ? <Box key={userId.id} style={profile.profile}>
              
              <Box>
                {
                  (userId.img ==='')
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
                            //placeholder="Ім'я"
                            onChange={(e)=>nameHandler(e.target.value)}
                          />
                          <MyInput
                            value={newFieldUser.lastName}
                            type='text'
                            placeholder='Прізвище'
                            onChange={(e)=>lastNameHandler(e.target.value)}
                          />
                          <MyInput
                            value={newFieldUser.birthday}
                            type='date'
                            placeholder='1965-10-25'
                            onChange={(e)=>birthdayHandler(e.target.value)}
                          />
                          <MyInput
                            value={newFieldUser.img}
                            type='text'
                            placeholder='Аватар'
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
                  {
                    userId.userBooks.map(book =>(
                      <Box key={book.id} style={profile.profileBook}>
                        <p style={profile.profileBookName}>{book.avtor}. {book.title}</p>
                        <span>{book.discribe}</span>
                        <MoreHorizIcon  style={classIcons.iconsMoreProfile}  onClick={()=>detailsCard(book)}/>
                      </Box>

                    ))
                  }
                </Box>
                
              </Box>
            </Box>
        
          
        
        : <Loading/>
      }
        
    </Container>
  )
}
