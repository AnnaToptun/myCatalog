import React, { useContext, useState, useEffect } from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import logo from '../img/log.png'
import './styles/Header.css'
import { Container } from '@mui/material';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { signOut } from 'firebase/auth'
import { useHistory } from 'react-router-dom';
export function Header ({children}) {
    const {user, auth, userCurrent, activeEmail, setUserCurrent, users} = useContext(CardsUserContext)
    const [openMenu, setOpenMenu] = useState(false)
    const route = useHistory()
    const buttonMenu = ()=>{
        (openMenu)? setOpenMenu(false): setOpenMenu(true)
    }

     const logOut = async () =>{
        await signOut(auth)
        route.push('/quest/login')
     }
 
     

   
    return (
        <Container>
            <Router>
                <nav className='header'>
                    <Link to={
                        (user)
                        ? '/user/home'
                        : '/quest/home'
                    }>
                        {
                            (window.innerWidth <= 750)
                            ?<img  style={{width: '150px'}}src={logo} alt="" />
                            :<img  style={{width: '250px'}}src={logo} alt="" />
                        }
                        
                    </Link>
                    {
                        (user)
                        ?   <div>
                                {
                                    (window.innerWidth <= 750)
                                    ? <div>
                                        <button onClick={buttonMenu}>
                                            |||
                                        </button>
                                        <ul className={openMenu
                                        ?'header-burger-active'
                                        :'header-burger-none'
                                        }>  
                                            <li><Link to="/user/home">{userCurrent.email} </Link></li>
                                            <li><Link to="/user/home">Мої книги</Link></li>
                                            <li><Link to="/user/createCard">Створити книгу</Link></li>
                                            <li><Link to="/quest/login">Вихід</Link></li>
                                        </ul>
                                    </div>
                                    :
                                    <ul className='header-links'>
                                        <li><Link to="/user/home">{userCurrent.email} </Link></li>
                                        <li><Link to="/user/home">Мої книги</Link></li>
                                        <li><Link to="/user/createCard">Створити книгу</Link></li>
                                        <li><Link to="/quest/login" onClick={logOut}>Вихід</Link></li>
                                    </ul>
                                }
                                
                            </div>
                        : 
                        <div>
                        {
                            (window.innerWidth <= 850)
                            ? <div>
                                <button onClick={buttonMenu}>
                                    |||
                                </button>
                                <ul className={openMenu
                                ?'header-burger-active'
                                :'header-burger-none'
                                }>
                                    <li><Link to="/quest/home">Головна</Link></li>
                                    <li><Link to="/quest/login">Вхід</Link></li>
                                    <li><Link to="/quest/register">Регістрація</Link></li>
                                </ul>
                            </div>
                            :
                            <ul className='header-links'>
                                <li><Link to="/quest/home">Головна</Link></li>
                                <li><Link to="/quest/login">Вхід</Link></li>
                                <li><Link to="/quest/register">Регістрація</Link></li>
                            </ul>
                        }
                        
                    </div>
                    }
                            
                </nav>
                <main>
                    {children}
                </main>
            </Router>
           
           
        </Container>
        
    )
}
