import { Box, MenuItem } from '@mui/material'
import { React, useContext, useState } from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { MyInput } from '../UI/input/MyInput'
import { MySelect } from '../UI/select/MySelect'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import classes from '../UI/input/classes';
import classesSelect from '../UI/select/classesSelect';


export function SortedBook () {
    const {books, genres,booksSort, setBooksSort, setBooks, booksPag, setBooksPag} = useContext(CardsUserContext)
    const [genre, setGenre] = useState('Оберіть жанр')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('Сортувати за...')
   
    const searchHandle = (value)=>{
        setSearch(value)
        if(value.length < 2){
            setBooksPag({...booksPag, 
                order: 'title',
                sort:'asc'})
        }else{
            setBooksSort(books.filter(book => book.title.toLowerCase().includes(value)))
    
        }
    }
  
    const sortGenre = (value)=>{
        setGenre(value)
        if(value==='Оберіть жанр' ){
            setBooksPag({...booksPag, 
                order: 'title',
                sort:'asc'})
        }else {
            setBooksSort(books.filter(book => book.genre.includes(value)))
        }
    }

    const sorted = (value)=>{
        setSort(value)

        if(value === 'Сортувати за...'){
            setBooksPag({...booksPag, 
                order: 'title',
                sort:'asc'})
        } else if(value === 'За автором А-Я'){
            setBooksPag({...booksPag, 
                order: 'avtor',
                sort:'desc'})
        }else if(value === 'За автором Я-А'){
            setBooksPag({...booksPag, 
                order: 'avtor',
                sort:'asc'})
        }else if(value === 'За назвою А-Я'){
            setBooksPag({...booksPag, 
                order: 'title',
                sort:'asc'})
        } else if(value === 'За назвою Я-А'){
            setBooksPag({...booksPag, 
                order: 'title',
                sort:'desc'})
        }
       
    }
    return (
        <Box style={classesSelect.sortedPagination}>
            <Box style={classesSelect.sortedBox}>
                <MyInput
                    type="text" 
                    value={search}
                    style={classes.myInputSearch}
                    placeholder='Пошук'
                    onChange={(e)=>searchHandle(e.target.value)}
                    label='Пошук'
                />
                
                <MySelect 
                    value={sort}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label={sort}
                    style={classesSelect.selectSearch}
                    onChange={(e)=>sorted(e.target.value)}
                    >
                        <MenuItem  value='Сортувати за...'>Сортувати за...</MenuItem>
                        <MenuItem  value='За автором А-Я'>За автором <ArrowDownwardIcon/></MenuItem>
                        <MenuItem  value='За автором Я-А'>За автором <ArrowUpwardIcon/></MenuItem>
                        <MenuItem  value='За назвою А-Я'>За назвою А-Я<ArrowDownwardIcon/></MenuItem>
                        <MenuItem  value='За назвою Я-А'>За назвою Я-А<ArrowUpwardIcon/></MenuItem>                    
                </MySelect>
                <MySelect 
                    value={genre}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label={genre}
                    style={classesSelect.selectSearch}
                    onChange={(e)=>sortGenre(e.target.value)}
                    >
                        <MenuItem  value='Оберіть жанр'>Оберіть жанр</MenuItem>
                    {
                        genres.map((g)=>(
                        <MenuItem key={g.id} value={g.genre}>{g.genre}</MenuItem>
                        ))
                    }
                    
                </MySelect>
                
            </Box>
          
            {/* <PaginationBook booksSort={booksSort}/> */}
        </Box>
    )
}