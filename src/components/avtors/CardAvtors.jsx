import { Box } from '@mui/system'
import React, {useContext, useState} from 'react'
import {useParams} from 'react-router-dom'
import classIcons from '../../styles/classIcons'
import profile from '../../styles/Profile'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { useHistory } from 'react-router-dom'
import classesPages from '../../styles/classesPages'
import { Card } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Buttons } from '../../UI/button/Buttons'
import { MyModal } from '../../UI/modal/myModal'
import { MyInput } from '../../UI/input/MyInput'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
export function CardAvtors () {
  const {  avtors, books, user, editCardUser} = useContext(CardsUserContext);
  const route = useHistory()
  const params = useParams()
  const avtorId = avtors.filter(avtor => {
    if(avtor.id === params.id){
      return avtor
    }
  })
  const avtor = avtorId[0]
  const avtorBooksId = avtor.booksAvtor
  const avtorBooks = books.filter(book =>{
    if(avtorBooksId.includes(book.id)){
      return book
    }
  }) 
  const [newFieldAvtor, setNewFieldAvtor] = useState({
    avtor: avtor.avtor,
    discribe: avtor.discribe,
    img: avtor.img
  })
  const avtorHandle = (value)=>{
    setNewFieldAvtor({...avtor, avtor: value})
  }
  const discribeHandle = (value)=>{
    setNewFieldAvtor({...avtor, discribe: value})
  }
  const imgHandle = (value)=>{
    setNewFieldAvtor({...avtor, img: value})
  }
  const detailsCard =(card)=>{
    route.push(`/book/${card.id}`)
  }
  const back = ()=>{
    route.push('/home')
  }
  const updateAvtor = ()=>{
    const id = avtor.id
    editCardUser(id, 'Avtors', newFieldAvtor)
    route.push(`/user/home`)
  }
  return (
    
      <Box style={
        (window.innerWidth < 500)
          ?profile.profileSmall
          :profile.profile
        }>
        <Box>
          {
            (avtor.img ==='')
            ?<AccountCircleIcon style={classIcons.iconsAccountProfile}/>
            :<img style={profile.profileImg} src={avtor.img} alt=''/>
          }
        </Box>
        <Box style={profile.profileDitails}>
          <span  style={profile.profileName}>{avtor.avtor}</span>
          <span>{avtor.discribe}</span>
          <Buttons onClick={back}>  Назад</Buttons>
          {
            (user)
            ?
            <MyModal title={<BuildCircleIcon style={classIcons.iconsEditProfile}/>}>
             
              <MyInput
                value={newFieldAvtor.avtor}
                placeholder='Автор'
                type='text'
                onChange={(e)=>avtorHandle(e.target.value)}
              />
              
              <MyInput
                value={newFieldAvtor.discribe}
                placeholder='Опис'
                type='text'
                onChange={(e)=>discribeHandle(e.target.value)}
              />
              <MyInput
                value={newFieldAvtor.img}
                placeholder='Обкладинка'
                type='text'
                onChange={(e)=>imgHandle(e.target.value)}
              />
              <Buttons onClick={()=>updateAvtor(avtor)}>Зберегти</Buttons>
            </MyModal>
            :''
          }
           <Container  style={classesPages.pageAllCard}>
            {
              avtorBooks.map(book =>(
                <Box key={book.id} m={1}>
                  <Card style={classesPages.pageAvtors}>
                    <img src={book.img} style={{height: '250px'}} alt=''/>
                    <p style={profile.profileBookName}>{book.title}</p>
                    <MoreHorizIcon  style={classIcons.iconsMoreProfile}   onClick={()=>detailsCard(book)}  />
                  </Card>     
                </Box>

              ))
            }
          </Container>
        </Box>
          
      </Box>
  )
}
