import React, { useContext, useState, ReactNode } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { AllCard } from './AllCard';
import { AllCards } from '../App';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { CardBook } from './books/CardBook';
import { SortedArray } from './books/SortedArray';
interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function AsideUser() {
  const { books,  genres, setUserCurrent, users, userCurrent, addBookUser, userIdBooks} = useContext(CardsUserContext)
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
  
  const addBook = async (card) =>{
    const id = userCurrent.id
    console.log(userIdBooks) 
    addBookUser(id, userIdBooks, card)
    //window.location.reload()
    
  }

  return (
    <Box style={{ display: 'flex', flexWrap: 'wrap', height: 10 }}>
      
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: '1px solid #000' }}
        style={{ width: '250px', height: '60vh' }}
      >
        <Tab label="Всі книги"  />
        <Tab label="Мої книги"  />
        {
          genres.map((g) =>(
            <Tab
              key={g.id}
              label={g.genre}
              onClick={() => sortBooksGenre(g.genre)}
            />
          ))
        }
      </Tabs>
      

      <TabPanel value={value} index={0}>
        {
          books.map(card => (
            <Box key={card.id} my={4}>
              <CardBook addBook={addBook} card={card} />
            </Box>
          ))
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          userIdBooks.map(card => (
            <Box key={card.id} my={4}>
              <CardBook card={card}/>
            </Box>
          ))
        }
      </TabPanel>

      {genres.map((g, index) => (
        <TabPanel value={value} key={g.id} index={index + 2}>
          <SortedArray books={sortBooks}/>
        </TabPanel>
      ))}
    </Box>
  );
}
