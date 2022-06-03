
import React from 'react';
import { useState, useContext }from 'react';
import { Tabs, Tab, Box } from '@mui/material'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'
import { SortedArray } from './books/SortedArray'
import { AllCard } from './AllCard';
import classesPages from '../styles/classesPages';
import { Link } from '@material-ui/core';
import {useHistory} from  'react-router-dom'
import { Card } from '@material-ui/core';
import { AllAvtors } from './avtors/AllAvtors';
import { UserAllBook } from './books/UserAllBook';
import {NotificationContainer, NotificationManager} from 'react-notifications';
interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index} 
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 0, m: 0}}>{children}</Box>}
    </div>
  );
}

export function AsideUser() {
  const {  avtors, genres, deleteBookUser, userCurrent, addBookUser, userIdBooks, books, createNotification} =
    useContext(CardsUserContext);
  const [value, setValue] = React.useState(0)
  const [sortBooks, setSortBooks] = useState([''])
  
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }
  const sortBooksGenre = sort => {
    setSortBooks(
      userIdBooks.filter(book => {
        return book.genre.includes(sort);
      })
    )
  }
  const delBookUser = async cardId => {
    const id = userCurrent.id;
    const booksid = cardId.id;
    const userBooks = userCurrent.userBooks
    deleteBookUser(id, userBooks, booksid); 
    createNotification('warning', `Ви видалили книгу ${cardId.title} зі свого каталогу`)
  }
  const addBook = async card => {
    const id = userCurrent.id;
    const userBooks = userCurrent.userBooks
    addBookUser(id, userBooks, card);
    createNotification('success', `Ви успішно додали книгу ${card.title} до свого каталогу`)
  }
  
 
  return (
    <Box style={
      (window.innerWidth < 500)
      ?classesPages.pageAsideRegisterSmall
      :classesPages.pageAsideRegister}>

      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        textColor="inherit"
        style={
          (window.innerWidth < 500)
          ?classesPages.pageAsideTabsSmall
          :classesPages.pageAsideTabs
        }
        >
        <Tab 
          style={classesPages.pageAsideTab}
          label={`Всі книги (${books.length})`}/>
        <Tab 
          style={classesPages.pageAsideTab}
          label={`Автори (${avtors.length})`}/>
        <Tab 
          style={classesPages.pageAsideTab}
          label={`Мої книги (${userIdBooks.length})`} />
        {genres.map(g => (
          <Tab  
            key={g.id} 
            style={classesPages.pageAsideTab}
            label={g.genre } 
            onClick={() => sortBooksGenre(g.genre)} />
        ))}
      </Tabs>

      <TabPanel value={value} index={0} >
        <AllCard
            delBookUser={delBookUser}
            addBook={addBook}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
         <AllAvtors/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserAllBook
           delBookUser={delBookUser}
           addBook={addBook}
           userIdBooks={userIdBooks}
        />
      </TabPanel>

      {genres.map((g, index) => (
        <TabPanel value={value} key={g.id} index={index + 3}>
          <SortedArray delBookUser={delBookUser} books={sortBooks} />
        </TabPanel>
      ))}

    <NotificationContainer/>
    </Box>
  );
}
