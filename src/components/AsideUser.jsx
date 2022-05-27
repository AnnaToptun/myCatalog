
import React from 'react';
import { useState, useContext }from 'react';
import { Tabs, Tab, Box } from '@mui/material'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'
import { SortedArray } from './books/SortedArray'
import { AllCard } from './AllCard';
import classesPages from '../styles/classesPages';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function AsideUser() {
  const {  genres, deleteBookUser, userCurrent, addBookUser, userIdBooks, booksPag, bookSort } =
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
    deleteBookUser(id, userIdBooks, booksid);
  }
  const addBook = async card => {
    const id = userCurrent.id;
    console.log(userIdBooks);
    addBookUser(id, userIdBooks, card);
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
          label={`Всі книги (${booksPag.length})`}/>
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
      <TabPanel value={value} index={1} style={classesPages.pageAllCard}>
        <Box style={classesPages.pageAllCard}>
          {userIdBooks.map(card => (
            <Box key={card.id} my={4} >
              <CardBook delBookUser={delBookUser} card={card} />
            </Box>
          ))}
        </Box>
        
      </TabPanel>

      {genres.map((g, index) => (
        <TabPanel value={value} key={g.id} index={index + 2}>
          <SortedArray delBookUser={delBookUser} books={sortBooks} />
        </TabPanel>
      ))}
    </Box>
  );
}
