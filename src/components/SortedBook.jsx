import { Box, MenuItem } from '@mui/material'
import { React, useContext, useState } from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { MyInput } from '../UI/input/MyInput'
import { MySelect } from '../UI/select/MySelect'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import classes from '../UI/input/classes';
import classesSelect from '../UI/select/classesSelect';
import PaginationBook from './PaginationBook'


export function SortedBook () {
    const {books, genres,booksSort, setBooksSort, setBooks, booksPag} = useContext(CardsUserContext)
    const [genre, setGenre] = useState('Оберіть жанр')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('Сортувати за...')
   
    const searchHandle = (value)=>{
        setSearch(value)
        if(value.length < 2){
            setBooks(books)
        }else{
            setBooksSort(books.filter(book => book.title.toLowerCase().includes(value)))
    
        }
    }
  
    const sortGenre = (value)=>{
        setGenre(value)
        if(value==='Оберіть жанр' ){
            return(setBooks(booksPag))
        }else {
            return (setBooksSort(booksPag.filter(book => book.genre.includes(value))),
            setBooks(booksPag.filter(book => book.genre.includes(value))))
        }
    }

    const sorted = (value)=>{
        setSort(value)

        if(value === 'Сортувати за...'){
            return(setBooks(booksPag))
        } else if(value === 'Дата видавництва нові'){
            return (setBooksSort([...books].sort((prev, next) =>  Number(prev.year) < Number(next.year)  &&  -1)),
            setBooks([...books].sort((prev, next) =>  Number(prev.year) < Number(next.year)  &&  -1)))
        }else if(value === 'Дата видавництва старі'){
            return (setBooksSort([...books].sort((prev, next) => Number(prev.year) > Number(next.year)  &&  -1)),
            setBooks([...books].sort((prev, next) => Number(prev.year) > Number(next.year)  &&  -1)))
        }else if(value === 'За алфавітом А-Я'){
            return (setBooksSort([...books].sort((prev, next) =>  prev.title < next.title &&  -1)),
            setBooks([...books].sort((prev, next) =>  prev.title < next.title &&  -1)))
        } else if(value === 'За алфавітом Я-А'){
            return (setBooksSort([...books].sort((prev, next) =>  prev.title > next.title &&  -1)),
            setBooks([...books].sort((prev, next) =>  prev.title > next.title &&  -1)))
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
                        <MenuItem  value='Дата видавництва нові'>Дата видавництва <ArrowDownwardIcon/></MenuItem>
                        <MenuItem  value='Дата видавництва старі'>Дата видавництв <ArrowUpwardIcon/></MenuItem>
                        <MenuItem  value='За алфавітом А-Я'>За алфавітом А-Я<ArrowDownwardIcon/></MenuItem>
                        <MenuItem  value='За алфавітом Я-А'>За алфавітом Я-А<ArrowUpwardIcon/></MenuItem>                    
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
            <PaginationBook booksSort={booksSort}/>
        </Box>
    )
}