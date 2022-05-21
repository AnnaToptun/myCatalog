import { React, createContext, useState, useEffect } from 'react'
import { db, auth } from '../firebase/firebase-config'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
export const CardsUserContext = createContext()

export const CardsUserProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(false)
  const [users, setUsers] = useState([])
  const [genres, setGenres] = useState([])
  const [userCurrent, setUserCurrent] = useState({})
  const [userIdBooks, setUserIdBooks] = useState([])
  const [commentIdBooks, setCommentIdBooks] = useState([])
  const [bookId, setBookId] = useState('')
  const [booksSort, setBooksSort] = useState([...books])
  
  const route = useHistory();
  const booksCollectionRef = collection(db, 'Books')
  const usersCollectionRef = collection(db, 'Users')
  const genresCollectionRef = collection(db, 'Genre')
  const getBookCards = async () => {
    const dataBooks = await getDocs(booksCollectionRef)
    setBooks(dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    setBooksSort(dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id })))
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

  const getGenres = async () => {
    const dataGenres = await getDocs(genresCollectionRef);
    setGenres(dataGenres.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  const addUser = async (card) => {
    await addDoc(usersCollectionRef, card)
    getUsers()
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
  }

  const editCardUser = async (id, collection, updateField) => {
    const userDoc = doc(db, collection, id)
    const newField = { ...updateField }
    await updateDoc(userDoc, newField)
  }

  const deleteBookUser = async (id, userBooks, delBooks) => {
    const userDoc = doc(db, 'Users', id)
    console.log(userBooks)
    const newArray = userBooks.filter(book => book.id !== delBooks);
    const newField = { userBooks: newArray }
    await updateDoc(userDoc, newField)
  }

  const deleteCard = async id => {
    const userDoc = doc(db, 'book', id)
    deleteDoc(userDoc)
    getBookCards()
  }
  
  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(users)
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
  }, [])

  return (
    <CardsUserContext.Provider
      value={{
        books,
        user,
        genres,
        setUser,
        addCard,
        addGenre,
        addBookUser,
        deleteCard,
        userCurrent,
        setUserCurrent,
        addUser,
        users,
        auth,
        userIdBooks,
        deleteBookUser,
        commentIdBooks, 
        setCommentIdBooks,
        bookId, 
        setBookId,
        genresCollectionRef,
        booksCollectionRef,
        booksSort, 
        setBooksSort,
        editCardUser
      }}
    >
      {children}
    </CardsUserContext.Provider>
  );
};
