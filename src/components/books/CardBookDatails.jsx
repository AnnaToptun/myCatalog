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
import BookIcon from '@mui/icons-material/Book';
import { TextArea } from '../../UI/textArea/TextArea'
export function CardBookDatails () {
  const {booksSort, setBooksSort, user, genres, editCardUser, avtors, addBooksAvtor, bookId, setBookId,  avtorId, setAvtorId} = useContext(CardsUserContext)

  const route = useHistory()
  
  const [newFieldBook, setNewFieldBook] = useState({
    title: bookId.title,
    year: bookId.year,
    genre: bookId.genre,
    discribe: bookId.discribe,
    img: bookId.img
  })
  
  const back = ()=>{
    (user)
    ? route.push('/user/home')
    : route.push('/quest/home')
  }
  const avtorIdCurrent = avtors.filter(avtor =>{
    if(avtor.avtor === bookId.avtor)
    return (avtor)
  })
  const currentAvtor = avtorIdCurrent[0]  
  const updateBook= async()=>{
    setBookId({...bookId, ...newFieldBook})
    setBooksSort(booksSort.map(book =>{
      if(book.id === bookId.id){
        return {...book, ...newFieldBook}
      } else{
        return book
      }
    }))
    editCardUser(bookId.id, 'Books', newFieldBook)
  }
  const detailsAvtor = ()=>{
    const booksAvtor = currentAvtor.booksAvtor
    setAvtorId({...currentAvtor, booksAvtor: [...booksAvtor,bookId.id]})
    route.push(`/avtor/${currentAvtor.id}`)
  }

  const titleHandler = (value) => {
    setNewFieldBook({...newFieldBook, title: value})
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
    <Container p={10} my={4}>
          <Box  >
            <Box style={
              (window.innerWidth < 500)
                ?classesCardBook.cardDetailsSmall
                :classesCardBook.cardDetails
              }>
              
                {
                  (bookId.img === "") 
                  ? <BookIcon style={classesCardBook.cardImgDetails}/>
                  : <img src={bookId.img} style={classesCardBook.cardImgDetails}/>
                }
              
              <Box style={classesCardBook.cardInfoDet}> 
                <Box style={classesCardBook.cardEdit}>
                  <span  style={classesCardBook.cardName}>{bookId.title}</span>
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
                      <TextArea
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
                      <Buttons onClick={()=>updateBook(bookId)}>Зберегти</Buttons>
                    </MyModal>
                    :''
                  }
                </Box>
                
                <span> Автор: 
                  <a style={classesCardBook.cardAvtor} onClick={detailsAvtor}> {bookId.avtor}</a>                  
                </span>
                
                <span>Жанр: {bookId.genre.join(', ')}</span>
                <span>Рік: {bookId.year}</span>
                <p>Опис: {bookId.discribe}</p>
                <Box style={classesCardBook.cardButton}>
                  <Buttons onClick={back}>
                    Назад
                  </Buttons>
                  
                </Box>
                
              </Box>
            </Box> 
            {
              (user)
              ?<FormComment bookCurrent={bookId}/>
              : <p>Незареєстровані користувачі не можуть залишати коментарі</p>
            } 
            
            <Comments bookCurrent={bookId.comments}/>
          </Box>
    </Container>
    
  )}
