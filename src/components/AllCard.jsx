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
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, limit, getDoc, startAfter, endBefore, endAt } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
export function AllCard ({addBook, delBookUser}) {
    const {booksSort, setBooksSort, booksPag, setBooksPag, limitBook} = useContext(CardsUserContext)
    const next = query(collection(db, "Books"), orderBy(booksPag.order, booksPag.sort), startAfter(booksPag.start), limit(limitBook))
    const prev = query(collection(db, "Books"), orderBy(booksPag.order, booksPag.sort), endBefore(booksPag.before), limit(limitBook))
    
    const newOrder = booksPag.order
    const getBookLimitPrev = async () => {
        const dataBooks = await getDocs(prev)
        const allBook = dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        
        const nextBooks = allBook[allBook.length - 1]
        const prevBooks = allBook[0]
        if(newOrder === 'title'){
          setBooksPag({...booksPag, 
            start: nextBooks.title,
            before: prevBooks.title}
            ) 
        }else if(newOrder === 'avtor'){
          setBooksPag({...booksPag,
            start: nextBooks.avtor,
            before: prevBooks.avtor
          })
        }
        setBooksSort(allBook)
        console.log('booksSort',booksSort)
    }
    const getBookLimitLast = async () => {
        const nextBook = await getDocs(next);
        const allBook = nextBook.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setBooksSort(allBook)
        const nextBooks = allBook[allBook.length - 1]
        const prevBooks = allBook[0]
        if(newOrder === 'title'){
          setBooksPag({...booksPag, 
            start: nextBooks.title,
            before: prevBooks.title}) 
        }else if(newOrder === 'avtor'){
          setBooksPag({...booksPag, 
            start: nextBooks.avtor,
            before: prevBooks.avtor
          })
        }
        console.log('nextBook', allBook)
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
