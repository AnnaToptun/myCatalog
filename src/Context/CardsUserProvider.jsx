import { React, createContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase-config';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
export const CardsUserContext = createContext();

export const CardsUserProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeEmail, setActiveEmail] = useState('');
  const [userCurrent, setUserCurrent] = useState({});
  const [userIdBooks, setUserIdBooks] = useState([]);
  const route = useHistory();
  const booksCollectionRef = collection(db, 'Books');
  const usersCollectionRef = collection(db, 'Users');
  const genresCollectionRef = collection(db, 'Genre');
  const getBookCards = async () => {
    const dataBooks = await getDocs(booksCollectionRef)
    setBooks(dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };
  const getUsers = async () => {
    const dataUsers = await getDocs(usersCollectionRef)
    setUsers(dataUsers.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    
  };
  const getUserActual = async (email) => {
    const usersDoc = await getDocs(usersCollectionRef);
    const allUsers = usersDoc.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    allUsers.filter(user=>{
      if(user.email === email){
        return setUserCurrent(user)
      }
    })
  };
  const getUserBooks = async (email) => {
    const usersDoc = await getDocs(usersCollectionRef);
    const allUsers = usersDoc.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    allUsers.filter(user=>{
      if(user.email === email){
        const booksUser = user.userBooks
        return setUserIdBooks(booksUser)
      }
    })
  };
  const getGenres = async () => {
    const dataGenres = await getDocs(genresCollectionRef);
    setGenres(dataGenres.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };
  const addUser = async card => {
    await addDoc(usersCollectionRef, card);
    getUsers();
  };
  const addCard = async (collections, card) => {
    await addDoc(collections, card);
    getBookCards();
  };
  const addBookUser = async ( id, userBooks, newBook) => {
    const userDoc = doc(db, "Users", id)
    const newField = {userBooks: [...userBooks, newBook]}
    await updateDoc(userDoc, newField)
  };
  const deleteCard = async id => {
    const userDoc = doc(db, 'book', id);
    deleteDoc(userDoc);
    getBookCards();
  };
  const monitorAuthState = async () => {
   
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(users);
        route.push('/user/home');
        setUser(true);
        getUserActual(user.email)
        getUserBooks(user.email)
      } else {
        route.push('/quest/login');
        setUser(false);
      }
    });
  };
 
   useEffect(() => {
    getUsers()
    monitorAuthState();
    getBookCards();
    getGenres();
    
  }, [])
   
  
  
  return (
    <CardsUserContext.Provider
      value={{
        books,
        user,
        genres,
        setUser,
        addCard,
        addBookUser,
        deleteCard,
        booksCollectionRef,
        usersCollectionRef,
        userCurrent,
        setUserCurrent,
        addUser,
        users,
        activeEmail,
        setActiveEmail,
        db,
        auth,
        userIdBooks
      }}
    >
      {children}
    </CardsUserContext.Provider>
  );
};
