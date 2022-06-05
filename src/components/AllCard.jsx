import { Box, Container} from '@mui/material'
import { React, useContext} from 'react'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardBook } from './books/CardBook'
import { SortedBook } from './SortedBook';
import classesPages from '../styles/classesPages';
import { Loading } from '../UI/loading/Loading';
import { Collections } from '@material-ui/icons';
import { Buttons } from '../UI/button/Buttons'
import { db, auth } from '../firebase/firebase-config'
import { collection, limitToLast, getDocs, endAt, doc, deleteDoc, query, orderBy, limit, onSnapshot, startAfter, endBefore } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
export function AllCard ({addBook, delBookUser}) {
    const {booksSort, setBooksSort, booksPag, last, setLast,
        first, setFirst, setList,setBooksPag, page, setPage,limitBook} = useContext(CardsUserContext)
    
    const next = query(collection(db, "Books"), 
      orderBy(booksPag.order, booksPag.sort), 
      startAfter(last), 
      limit(limitBook)
    )

    const prev = query(collection(db, "Books"), 
      orderBy(booksPag.order, booksPag.sort), 
      endAt(first), 
      limitToLast(limitBook)
    )
    const newOrder = booksPag.order
    const getBookLimitPrev = async () => {
      const nextBook = await getDocs(prev);
      const allBook = nextBook.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      const lastVisible = allBook[allBook.length-1]
      const firstBook = allBook[0]
      if(booksPag.order === 'title'){
        setBooksSort(allBook)
        setLast(lastVisible.title)
        setFirst(firstBook.title) 
     } else {
        setBooksSort(allBook)
        setLast(lastVisible.avtor) 
        setFirst(firstBook.avtor) 
      }
    }
    const getBookLimitLast = async () => {
      const nextBook = await getDocs(next);
      const allBook = nextBook.docs.map(doc => ({ ...doc.data(), id: doc.id }))
       const indexLast = allBook.length -1
      const lastBook = allBook[indexLast]
      const fist = allBook[0]
      if(booksPag.order === 'title'){
        setBooksSort(allBook)
        setLast(lastBook.title)
        setFirst(fist.title) 
      }else{
        setBooksSort(allBook)
        setLast(lastBook.avtor)
        setFirst(fist.avtor) 
      }
    }

    return (
        <Container style={classesPages.pageAllCardBox}>
            <SortedBook/>
            <Box  style={
                (window.innerWidth < 500)
                ?classesPages.pageAllCardBox
                :classesPages.pageAllCard}>
                <Buttons onClick={getBookLimitPrev}>last</Buttons>   
                <Buttons onClick={getBookLimitLast}>next</Buttons> 
            </Box>
               
            {
            (booksSort.length)

              ? <Container style={classesPages.pageAllCard} >
                  {
                    booksSort.map((card)=>(
                      <Box key={card.id} mx={2}  my={2}>
                        <CardBook 
                          delBookUser={delBookUser}
                          addBook={addBook}
                          card={card}
                        />
                      </Box>
                    ))
                  }
                </Container>
                
              : <Loading/>
            }   
             
        </Container>
        
    )
}
