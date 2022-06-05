import { React, createContext, useState, useEffect } from 'react'
import { db, auth } from '../firebase/firebase-config'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy, limit, onSnapshot, startAfter, endBefore, endAt } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
  const [commentIdBooks, setCommentIdBooks] = useState([])
  const [bookId, setBookId] = useState('')
  const [booksSort, setBooksSort] = useState([])
  const [avtorId, setAvtorId] = useState({})
  const [list, setList] =  useState([]);
  const [page, setPage] =  useState(1);
  const [last, setLast] =  useState({});
  const [first, setFirst] =  useState({});
 
  const [booksPag, setBooksPag] = useState({
    order: 'title',
    sort: 'asc', 
    start: '',
    before: '',
  })
  const limitBook = 6
  const route = useHistory();
  const usersCollectionRef = collection(db, 'Users')
  const genresCollectionRef = collection(db, 'Genre')
  const avtorsCollectionRef = collection(db, 'Avtors')
  const booksCollectionRef = collection(db, 'Books')
  
  const getBookCards = async () => {
    const dataBooks = await getDocs(booksCollectionRef)
    const allBook = dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setBooks(allBook.sort((prev, next) =>  prev.title < next.title &&  -1))
    
  }
  const getBookLimitStart = async () => {
    const booksStartRef = query(collection(db, 'Books'), 
      orderBy(booksPag.order, booksPag.sort), 
      limit(limitBook)
    )
    const documentSnapshots = await getDocs(booksStartRef)
    const allBook = documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setBooksSort(allBook)
    const lastbook = allBook[allBook.length-1]
   if (booksPag.order === 'title'){
     setBooksSort(allBook)
      setLast(lastbook.title)
    }else {
      setBooksSort(allBook)
      setLast(lastbook.avtor)
    }

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
    const newArray = userBooks.filter(book => book !== delBooks);
    const newField = { userBooks: newArray }
    await updateDoc(userDoc, newField)
    console.log(delBooks)
    setUserIdBooks(userIdBooks.filter(book => book !== delBooks))
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
    
    const createNotification = (type,  massage, title, ) => {
      switch (type) {
        case 'info':
          NotificationManager.info(massage);
          break;
        case 'success':
          NotificationManager.success(massage, title);
          break;
        case 'warning':
          NotificationManager.warning(massage, title, 3000);
          break;
        case 'error':
          NotificationManager.error( massage, title, 5000, () => {
            alert('callback');
          });
          break;
      }
    }
 
  useEffect(() => {
    getUsers()
    monitorAuthState()
    getBookCards()
    getGenres()
    getAvtors()
    getBookLimitStart()
  }, [])
  ;
  return (
    <CardsUserContext.Provider
      value={{
        books,setBooks,
        users,
        user,setUser,
        auth,
        genres, setGenres,
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
        editCardUser,
        createNotification,
        last, setLast,
        first, setFirst,
        getBookLimitStart
      }}
    >
      {children}
    </CardsUserContext.Provider>
  );
};
