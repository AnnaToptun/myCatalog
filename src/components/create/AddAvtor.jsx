
import { Box, Container, FormGroup, MenuItem } from '@mui/material'
import {React,  useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import { MySelect } from '../../UI/select/MySelect' 
import classesCreate from '../../styles/classesCreate'
import classes from '../../UI/input/classes'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { TextArea } from '../../UI/textArea/TextArea'
export const AddAvtor = () => {
  const {addAvtor, createNotification, setAvtors, avtors} = useContext(CardsUserContext)
  const [avtor, setAvtor] = useState({
    avtor: '',
    booksAvtor: [],
    discribe: '',
    img: ''
  })
  //Фіона Э. Хігінс
  const route = useHistory()
  const avtorHandle = (value)=>{
    setAvtor({...avtor, avtor: value})
  }
  const discribeHandle = (value)=>{
    setAvtor({...avtor, discribe: value})
  }
  const imgHandle = (value)=>{
    setAvtor({...avtor, img: value})
  }
  const addNewAvtor = ()=>{
    createNotification('success', ' ', `Вітаємо ви успішно додали автора ${avtor.avtor}` )
    setAvtors([...avtors, avtor])
    addAvtor(avtor)
    setAvtor({...avtor, 
      avtor: '',
      discribe: '',
      img: ''
    })
  }
  const errorNewAvtor = ()=>{
    createNotification('error', "Перевірте чи правильно введене ім'я автора", 'Помилка додавання автора' )
  }
  const avtorCreate = avtor.avtor
  return (
    <Container  style={classesCreate.card}>
      <FormGroup>
        <MyInput
          type='text'
          value={avtor.avtor}
          placeholder="Ім'я та прізвище автора"
          onChange={(e)=>avtorHandle(e.target.value)}
          label="Ім'я та прізвище автора"
        />
        <TextArea
          type='text'
          value={avtor.discribe}
          placeholder="Про автора"
          onChange={(e)=>discribeHandle(e.target.value)}
          label="Про автора"
          style={classes.myInputDiscribe}
        />
        <MyInput
          type='text'
          value={avtor.img}
          placeholder="Фото автора"
          onChange={(e)=>imgHandle(e.target.value)}
          label="Фото автора"
        />
        <Buttons 
        onClick={
          (avtorCreate.length > 4)
          ? addNewAvtor
          : errorNewAvtor
        }>Створити</Buttons>
      </FormGroup>
      <NotificationContainer/>
    </Container>
  )
}
