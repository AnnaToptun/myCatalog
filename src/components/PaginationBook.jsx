

import  React, { useContext, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { MySelect } from '../UI/select/MySelect';
import classesSelect from '../UI/select/classesSelect';
import { Box, MenuItem } from '@mui/material';

export default function PaginationBook({booksSort, children}) {
  const {books, setBooksSort} = useContext(CardsUserContext)
  const [booksPerPage, setBooksPerPage] = useState(12)
  const [bookPage, setBookPage] = useState(booksSort.slice(0, booksPerPage))
  const [currentPage, setСurrentPage] = useState(1)

  const pageCount = Math.ceil(books.length / booksPerPage)
 
  const handleChangePage = (event, value) => {  
    setСurrentPage(value);
    const pagesStart = (value -1)* booksPerPage  
    const pagesFinished = pagesStart + booksPerPage 
    const displayBooks = books.slice(pagesStart, pagesFinished)
    setBookPage(displayBooks)
  }

  useEffect(()=>{
    setBooksSort(bookPage) 
  },[currentPage])
  return (
    
      <Box style={classesSelect.sortedBox}>
        <MySelect 
          value={booksPerPage}
          labelId="demo-select-small"
          id="demo-select-small"
          label={booksPerPage}
          style={classesSelect.selectPage}
          onChange={(e)=>setBooksPerPage(e.target.value)}
          >
              <MenuItem  value={1}>1 </MenuItem>
              <MenuItem  value={2}>2</MenuItem>
              <MenuItem  value={3}>3</MenuItem>
              <MenuItem  value={4}>4</MenuItem>
              <MenuItem  value={5}>5</MenuItem>
              <MenuItem  value={6}>6</MenuItem>
              <MenuItem  value={7}>7</MenuItem>
              <MenuItem  value={8}>8</MenuItem>                   
              <MenuItem  value={9}>9</MenuItem>                   
              <MenuItem  value={10}>10</MenuItem>                   
              <MenuItem  value={12}>12</MenuItem>                   
        </MySelect>
        <Stack spacing={2}>  
          <Pagination 
            count={pageCount} 
            page={currentPage} 
            onChange={handleChangePage}/>
            {children}
        </Stack>
      </Box>
   
  );
}