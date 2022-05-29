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
import classIcons from '../../styles/classIcons'
import classesCardBook from '../../styles/classesCardBook'
import AddCircleIcon from '@mui/icons-material/AddCircle'
export function CardBookDatails () {
  const {books, user, genres, editCardUser, avtors, addBooksAvtor} = useContext(CardsUserContext)
  const params = useParams()
  const route = useHistory()
  const book = books.filter((book) => {
    if( book.id === params.id){
      return (
        book
        )
    }}
  )
  const bookCurrent = book[0]
  const [newFieldBook, setNewFieldBook] = useState({
    title: bookCurrent.title,
    avtor: bookCurrent.avtor,
    year: bookCurrent.year,
    genre: bookCurrent.genre,
    discribe: bookCurrent.discribe,
    img: bookCurrent.img
  })
  
  console.log(bookCurrent)
  const back = ()=>{
    route.push('/home')
  }
  const updateBook= async(userId)=>{
    const id = userId.id
    editCardUser(id, 'Books', newFieldBook)
    route.push(`/user/home`)
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
  const avtorId = avtors.filter(avtor =>{
    if(avtor.avtor === bookCurrent.avtor)
    return (avtor)
  })
  const currentAvtor = avtorId[0]
  const detailsAvtor = ()=>{
    route.push(`/avtor/${currentAvtor.id}`)
  }
  const booksAvtor = (currentAvtor.booksAvtor)
  const addBookAvtor = ()=>{
    const id = currentAvtor.id
    const bookId = bookCurrent.id
    addBooksAvtor(id, booksAvtor, bookId)
    route.push(`/user/home`)
  }
  return (
    <Container p={10} my={4}>
          <Box  >
            <Card style={
              (window.innerWidth < 500)
                ?classesCardBook.cardDetailsSmall
                :classesCardBook.cardDetails
              }  >
              <img src={bookCurrent.img} style={classesCardBook.cardImgDetails}/>
              <Box style={classesCardBook.cardInfo}>
                <span>Назва: {bookCurrent.title}</span>
                <span> Автор: 
                  <a style={classesCardBook.cardAvtor} onClick={detailsAvtor}>{bookCurrent.avtor}</a>
                 {
                   !(booksAvtor.includes(bookCurrent.id))
                   ?<AddCircleIcon  style={classIcons.icons} onClick={addBookAvtor}/>
                   : ''
                 } 
                  
                </span>
                
                <span>Жанр: {bookCurrent.genre.join(', ')}</span>
                <span>Рік: {bookCurrent.year}</span>
                <p>Опис: {bookCurrent.discribe}</p>
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
                      <Buttons onClick={()=>updateBook(bookCurrent)}>Зберегти</Buttons>
                    </MyModal>
                    :''
                  }
                </Box>
                
              </Box>
            </Card> 
            {
              (user)
              ?<FormComment bookCurrent={bookCurrent}/>
              : <p>Незареєстровані користувачі не можуть залишати коментарі</p>
            } 
            
            <Comments bookCurrent={bookCurrent}/>
          </Box>
          
        
      
     
    </Container>
    
  )
}
