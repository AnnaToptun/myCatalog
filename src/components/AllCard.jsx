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
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, limit, onSnapshot, startAfter, endBefore } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
export function AllCard ({addBook, delBookUser}) {
    const {booksSort, setBooksSort, booksPag, list, setList,setBooksPag, page, setPage,limitBook} = useContext(CardsUserContext)
   
    
    
    const newOrder = booksPag.order
    const getBookLimitPrev = async () => {
      const prev = query(collection(db, "Books"), 
        orderBy(booksPag.order, booksPag.sort), 
        endBefore(booksPag.before), 
        limit(limitBook),
        onSnapshot((querySnapshot) =>{
          const items = [];
          querySnapshot.forEach((doc) =>{
              items.push({ key: doc.id, ...doc.data() });
          });
          setList(items);
          setPage(page - 1)
        })
      )
      const nextBook = await getDocs(prev);
      const allBook = nextBook.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setBooksSort(allBook)
      console.log('prevBook',allBook)
    }
    const getBookLimitLast = async () => {
        const next = query(collection(db, "Books"), 
          orderBy(booksPag.order, booksPag.sort), 
          startAfter(booksPag.start), 
          limit(limitBook),
          onSnapshot(function(querySnapshot) {
            const items = [];
            querySnapshot.forEach(function(doc) {
                items.push({ key: doc.id, ...doc.data() });
            });
            setList(items);
            setPage(page - 1)
        }))
        const nextBook = await getDocs(next);
        const allBook = nextBook.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setBooksSort(allBook)
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
