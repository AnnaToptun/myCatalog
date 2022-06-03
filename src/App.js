import  {React, createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Container from '@mui/material/Container';
import {db, auth} from './firebase/firebase-config'
import {collection, addDoc, getDocs, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import './App.css';
import { MainLoyout } from './components/MainLoyout';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { CardsUserProvider } from './Context/CardsUserProvider';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export const AllCards = createContext()
function App() {
  
  return (
    
    <BrowserRouter>
     <Container className='App'>
        <CardsUserProvider>
          
         <MainLoyout/>
        </CardsUserProvider>
      </Container>
    </BrowserRouter>
     
  );
}

export default App;
