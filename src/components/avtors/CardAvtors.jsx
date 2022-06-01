import { Box } from '@mui/system'
import React, {useContext, useState} from 'react'
import {useParams} from 'react-router-dom'
import classIcons from '../../styles/classIcons'
import profile from '../../styles/Profile'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { useHistory } from 'react-router-dom'
import classesPages from '../../styles/classesPages'
import classesCardBook from '../../styles/classesCardBook'
import { Card } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Buttons } from '../../UI/button/Buttons'
import { MyModal } from '../../UI/modal/myModal'
import { MyInput } from '../../UI/input/MyInput'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import classes from '../../UI/input/classes'
import { TextArea } from '../../UI/textArea/TextArea'
export function CardAvtors () {
  const {  avtors, setAvtors, books, user, editCardUser, setBookId, setCommentIdBooks, avtorId, setAvtorId} = useContext(CardsUserContext);
  const route = useHistory()
  const avtorBooksId = avtorId.booksAvtor
  const avtorBooks = books.filter(book =>{
    if(avtorBooksId.includes(book.id)){
      return book
    }
  }) 
  const [newFieldAvtor, setNewFieldAvtor] = useState({
    discribe: avtorId.discribe,
    img: avtorId.img
  })
  const discribeHandle = (value)=>{
    setNewFieldAvtor({...newFieldAvtor, discribe: value})
  }
  const imgHandle = (value)=>{
    setNewFieldAvtor({...newFieldAvtor, img: value})
  }
  const detailsCard =(card)=>{
    route.push(`/book/${card.id}`)
    setBookId(card)
    setCommentIdBooks([...card.comments])
  }
  const back = ()=>{
    route.push('/home')
  }
  const updateAvtor = ()=>{
    const id = avtorId.id
    setAvtorId({...avtorId, ...newFieldAvtor})
    setAvtors(avtors.map(avtor =>{
      if(avtor.id === avtorId.id){
        return {...avtor, ...newFieldAvtor}
      } else{
        return avtor
      }
    }))
    editCardUser(id, 'Avtors', newFieldAvtor) 
  }
  return (
    
      <Box style={
        (window.innerWidth < 500)
          ?profile.profileSmall
          :profile.profile
        }>
        <Box >
          {
            (avtorId.img ==='')
            ?<AccountCircleIcon style={classIcons.iconsAccountProfile}/>
            :<Box style={classesPages.avtorBookImgBox}>
              <img style={{height: '320px'}} src={avtorId.img} alt=''/>
            </Box>
          }
        </Box>
        <Box style={profile.profileDitails}>
          <Box style={profile.profileEdit}>
            <span  style={profile.profileName}>{avtorId.avtor}</span>
            {
              (user) 
              ?
              <MyModal title={<BuildCircleIcon style={classIcons.iconsEditProfile}/>}>
              
                <TextArea
                  value={newFieldAvtor.discribe}
                  placeholder='Опис'
                  type='text'
                  onChange={(e)=>discribeHandle(e.target.value)}
                  style={classes.myInputDiscribeEdit}
                />
                <MyInput
                  value={newFieldAvtor.img}
                  placeholder='Обкладинка'
                  type='text'
                  onChange={(e)=>imgHandle(e.target.value)}
                />
                <Buttons onClick={()=>updateAvtor(avtorId)}>Зберегти</Buttons>
              </MyModal>
              :''
            }
          </Box>
          
          <p style={profile.profileDiscribe}>{avtorId.discribe}</p>
          <Buttons onClick={back}>  Назад</Buttons>
          
           <Container  style={classesPages.pageAllCard}>
            {
              avtorBooks.map(book =>(
                <Box key={book.id} mx={2} my={2}>
                  <Card style={classesPages.pageAvtors}  onClick={()=>detailsCard(book)}  >
                    <div style={classesCardBook.cardImgBox}>
                      <img src={book.img} style={{width: '100%'}} alt=''/>
                    </div>
                    <p style={profile.profileBookName}>{book.title}</p>
                  </Card>     
                </Box>
              ))
            }
          </Container>
        </Box>
          
      </Box>
  )
}
