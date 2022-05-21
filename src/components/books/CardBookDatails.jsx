import { Box, Card, Container, MenuItem } from '@mui/material'
import { React, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Buttons } from '../../UI/button/Buttons'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { FormComment } from '../comment/FormComment'
import { Comments } from '../comment/Comments'
import { MyInput } from '../../UI/input/MyInput'
import { MyModal } from '../../UI/modal/myModal'
import { MySelect } from '../../UI/select/MySelect'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import classIcons from '../styles/classIcons'
import classesCardBook from '../styles/classesCardBook'
export function CardBookDatails () {
  const {books, user, genres, editCardUser} = useContext(CardsUserContext)
  const [newFieldBook, setNewFieldBook] = useState({
    title: '',
    avtor: '',
    year: 2022,
    genre: [],
    discribe: '',
    img: ''
  })
  const params = useParams()
  const route = useHistory()
  const book = books.filter((book) => book.id === params.id)

  const back = ()=>{
    route.push('/home')
  }
  const updateBook= async(userId)=>{
    const id = userId.id
    editCardUser(id, 'Books', newFieldBook)
   
  }
  const titleHandler = (value) => {
    setNewFieldBook({...newFieldBook, title: value})
  }
  const avtorHandler = (value) => {
    setNewFieldBook({...newFieldBook, avtor: value})
  }
  const yearHandler = (value) => {
    setNewFieldBook({...newFieldBook, year: value})
  }
  const discribeHandler = (value) => {
    setNewFieldBook({...newFieldBook, discribe: value})
  }
  const imgHandler = (value) => {
    setNewFieldBook({...newFieldBook, img: value})
  }
  const handleChange = (e) => {
    setNewFieldBook({...newFieldBook, genre: e.target.value})
  
  }
  return (
    <Container p={10}>
      
      {
        book.map((card)=>(
          <Box key={card.id} my={4}>
            <Card style={classesCardBook.cardDetails}  >
              <img src={card.img} style={classesCardBook.cardImgDetails}/>
              <Box style={classesCardBook.cardInfo}>
                <span>Назва: {card.title}</span>
                <span>Автор: {card.avtor}</span>
                <span>Жанр: {card.genre.join(', ')}</span>
                <span>Рік: {card.year}</span>
                <p>Опис: {card.discribe}</p>
                <Box style={classesCardBook.cardButton}>
                  <Buttons onClick={back}>
                    Назад
                  </Buttons>
                  {
                    (user)
                    ?
                    <MyModal title={<BuildCircleIcon style={classIcons.iconsEditProfile}/>}>
                      <MyInput
                        value={newFieldBook.title}
                        placeholder='Назва'
                        type='text'
                        onChange={(e)=>titleHandler(e.target.value)}
                      />
                      <MyInput
                        value={newFieldBook.avtor}
                        placeholder='Автор'
                        type='text'
                        onChange={(e)=>avtorHandler(e.target.value)}
                      />
                      <MyInput
                        value={newFieldBook.year}
                        type='number'
                        onChange={(e)=>yearHandler(e.target.value)}
                      />
                      <MySelect 
                        multiple
                        value={newFieldBook.genre}
                        onChange={handleChange}
                        >
                          {
                            genres.map((g)=>(
                              <MenuItem key={g.id} value={g.genre}>{g.genre}</MenuItem>
                            ))
                          }
                          
                      </MySelect>
                      <MyInput
                        value={newFieldBook.discribe}
                        placeholder='Опис'
                        type='text'
                        onChange={(e)=>discribeHandler(e.target.value)}
                      />
                      <MyInput
                        value={newFieldBook.img}
                        placeholder='Обкладинка'
                        type='text'
                        onChange={(e)=>imgHandler(e.target.value)}
                      />
                      <Buttons onClick={()=>updateBook(card)}>Зберегти</Buttons>
                    </MyModal>
                    :''
                  }
                </Box>
                
              </Box>
            </Card> 
            {
              (user)
              ?<FormComment/>
              : <p>Незареєстровані користувачі не можуть залишати коментарі</p>
            } 
            
            <Comments/>
          </Box>
          
        ))
      }
     
    </Container>
    
  )
}
