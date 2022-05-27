import { React, useContext } from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { signOut } from 'firebase/auth'
import { useHistory } from 'react-router-dom';
import TemporaryDrawer from '../UI/drawer/TemporaryDrawer';
import logo from '../img/log.png'
import '../styles/Header.css'

export function Header ({children}) {
    const {user, auth, userCurrent} = useContext(CardsUserContext)
    const route = useHistory()
     const logOut = async () =>{
        await signOut(auth)
        route.push('/quest/login')
     }
    return (
        <Container>
            <Router>
                <nav className={
                        (window.innerWidth<500)
                        ?'header-adaptive'
                        :'header'
                    }>
                    <Link to={(user)? '/user/home': '/quest/home'}>
                        <img  style={{width: '250px'}}src={logo} alt="" />
                    </Link>
                    {
                        (user)
                        ?   
                            <Box className='header' >
                                {
                                    (userCurrent.img === '')
                                    ? <Link className='link-account' to={`/user/profile/${userCurrent.id}`}>{userCurrent.fistName} {userCurrent.lastName} </Link>
                                    : <Link to={`/user/profile/${userCurrent.id}`}><img className='avatarUser' src={userCurrent.img} alt=''/></Link>
                                }
                                <TemporaryDrawer>
                                    <ul className='header-links'>
                                        <li><Link to={`/user/profile/${userCurrent.id}`}>Профіль </Link></li>
                                        <li><Link to="/user/home">Мої книги</Link></li>
                                        <li><Link to="/user/create">Створити книгу/жанр</Link></li>
                                        <li><Link to="/quest/login" onClick={logOut}>Вихід</Link></li>
                                    </ul>
                                </TemporaryDrawer>
                            </Box>
                        : 
                        <Box className='header-adaptive'>
                            <TemporaryDrawer>
                                <ul className='header-links'>
                                    <li><Link to="/quest/home">Головна</Link></li>
                                    <li><Link to="/quest/login">Вхід</Link></li>
                                    <li><Link to="/quest/register">Регістрація</Link></li>
                                </ul>
                            </TemporaryDrawer>
                        </Box>
                    }
                            
                </nav>
                <main>
                    {children}
                </main>
            </Router>
        </Container>
        
    )
}
