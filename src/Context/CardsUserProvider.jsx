import { React, createContext, useState, useEffect } from 'react'
import { db, auth } from '../firebase/firebase-config'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, limit, onSnapshot, startAfter, endBefore, endAt } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { createTheme } from '@mui/material'
export const CardsUserContext = createContext({})

export const CardsUserProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [avtors, setAvtors] = useState([])
  const [user, setUser] = useState(false)
  const [users, setUsers] = useState([])
  const [genres, setGenres] = useState([])
  const [userCurrent, setUserCurrent] = useState({})
  const [userId, setUserId] = useState({})
  const [userIdBooks, setUserIdBooks] = useState([])
  const [commentIdBooks, setCommentIdBooks] = useState([userIdBooks.co])
  const [bookId, setBookId] = useState('')
  const [booksSort, setBooksSort] = useState([])
  const [avtorId, setAvtorId] = useState({})
  const [list, setList] =  useState([]);
const [page, setPage] =  useState(1);
 
  const [booksPag, setBooksPag] = useState({
    order: 'title',
    sort: 'asc', 
    start: '',
    before: '',
  })
  const limitBook = 12
  const route = useHistory();
  const booksCollectionRef = collection(db, 'Books')
  const usersCollectionRef = collection(db, 'Users')
  const genresCollectionRef = collection(db, 'Genre')
  const avtorsCollectionRef = collection(db, 'Avtors')
    
  const getBookCards = async () => {
    const dataBooks = await getDocs(booksCollectionRef)
    const allBook = dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setBooks(allBook.sort((prev, next) =>  prev.title < next.title &&  -1))
    setBooksSort(allBook)
  }
  const getBookLimitStart = async () => {
    const topBooksCollectionRef = query(collection(db, 'Books'), 
    orderBy(booksPag.order, booksPag.sort), 
    limit(limitBook),
    startAfter(booksPag.start), 
    onSnapshot((querySnapshot)=> { 
      var items = []
      querySnapshot.forEach(function(doc) {
          items.push({ key: doc.id, ...doc.data() });
      });
      console.log('first item ', items[0])
      setList(items);
      })
    )
    const dataBooks = await getDocs(topBooksCollectionRef)
    const allBook = dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setBooksSort(allBook)
  }
 
  const getUsers = async (email) => {
    const dataUsers = await getDocs(usersCollectionRef)
    const allUsers = dataUsers.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setUsers(allUsers)
    allUsers.filter(user => {
      if (user.email === email) {
        const booksUser = user.userBooks
        return (
          setUserCurrent(user),
          setUserIdBooks(booksUser)
        )
      }
    })
  }
  const getAvtors = async () => {
    const dataAvtors = await getDocs(avtorsCollectionRef)
    const allAvtors = dataAvtors.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setAvtors(allAvtors.sort((prev, next) =>  prev.avtor < next.avtor &&  -1))
  }
  const getGenres = async () => {
    const dataGenres = await getDocs(genresCollectionRef);
    const allGenres = dataGenres.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setGenres(allGenres.sort((prev, next) =>  prev.genre < next.genre &&  -1))
  }

  const addUser = async (user) => {
    await addDoc(usersCollectionRef, user)
    getUsers()
  }
  const addAvtor = async (avtor) => {
    await addDoc(avtorsCollectionRef, avtor)
    getAvtors()
  }
  const addCard = async (card) => {
    await addDoc(booksCollectionRef, {...card})
    getBookCards()
  }
  
  const addGenre = async (genre) => {
    await addDoc(genresCollectionRef, {...genre})
    getGenres()
  }

  const addBookUser = async (id, userBooks, newBook) => {
    const userDoc = doc(db, 'Users', id)
    const newField = { userBooks: [...userBooks, newBook] }
    await updateDoc(userDoc, newField)
    setUserIdBooks([...userIdBooks, newBook])
    getUsers()
  }
  const addBookComment = async (id, comments, newComment) => {
    const userDoc = doc(db, 'Books', id)
    const newField = { comments: [...comments, newComment] }
    await updateDoc(userDoc, newField)
    setCommentIdBooks([...commentIdBooks, newComment])
    getBookCards()
  }
  const addBooksAvtor = async (id, booksAvtor, newBook) => {
    const userDoc = doc(db, 'Avtors', id)
    const newField = { booksAvtor: [...booksAvtor, newBook] }
    await updateDoc(userDoc, newField)
    getAvtors()
  }
  const editCardUser = async (id, collection, updateField) => {
    const userDoc = doc(db, collection, id)
    const newField = { ...updateField }
    await updateDoc(userDoc, newField)
  }

  const deleteBookUser = async (id, userBooks, delBooks) => {
    const userDoc = doc(db, 'Users', id)
    const newArray = userBooks.filter(book => book.id !== delBooks);
    const newField = { userBooks: newArray }
    await updateDoc(userDoc, newField)
    console.log(delBooks)
    setUserIdBooks(userIdBooks.filter(book => book.id !== delBooks))
    getUsers()
  }

  
  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        route.push('/user/home')
        setUser(true)
        getUsers(user.email)
      } else {
        route.push('/quest/login')
        setUser(false);
      }
    })
  }

 
  useEffect(() => {
    getUsers()
    monitorAuthState()
    getBookCards()
    getGenres()
    getAvtors()
    getBookLimitStart()
  }, [])

  return (
    <CardsUserContext.Provider
      value={{
        books,setBooks,
        users,
        user,setUser,
        auth,
        genres,
        userCurrent,setUserCurrent,
        userIdBooks,
        commentIdBooks, setCommentIdBooks,
        bookId, setBookId,
        booksSort,setBooksSort,
        booksPag,
        avtors, setAvtors,
        booksPag,setBooksPag,
        limitBook, 
        userId, setUserId,  
        avtorId, setAvtorId, 
        list, setList, 
        page, setPage,
        addAvtor,
        addBookComment,
        addUser,       
        addCard,
        addGenre,
        addBookUser,
        addBooksAvtor,
        deleteBookUser,
        editCardUser
      }}
    >
      {children}
    </CardsUserContext.Provider>
  );
};
