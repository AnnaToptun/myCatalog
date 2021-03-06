import { React, useContext } from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { signOut } from 'firebase/auth'
import { useHistory } from 'react-router-dom';
import TemporaryDrawer from '../UI/drawer/TemporaryDrawer';
import logo from '../img/log.png'
import '../styles/Header.css'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import classIcons from '../styles/classIcons';
export function Header ({children}) {
    const {user, auth, userCurrent, setUserId} = useContext(CardsUserContext)
    const route = useHistory()
     const logOut = async () =>{
        await signOut(auth)
        route.push('/quest/login')
     }
     const myProfile = ()=>{
        setUserId(userCurrent)
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
                                    ? <Link to={`/user/profile/${userCurrent.id}`}><AccountCircleIcon style={classIcons.iconsAccountHeader} onClick={myProfile}/></Link>
                                    : <Link 
                                        to={`/user/profile/${userCurrent.id}`}
                                        className='avatarUserBox'
                                        >
                                        <img className='avatarUser' src={userCurrent.img} alt='' onClick={myProfile}/>
                                    </Link>
                                }
                                
                                <TemporaryDrawer>
                                    <ul className='header-links'>
                                        <li onClick={myProfile}><Link to={`/user/profile/${userCurrent.id}`}>?????????????? </Link></li>
                                        <li><Link to="/user/home">?????? ??????????</Link></li>
                                        <li><Link to="/user/create">???????????????? ??????????/????????</Link></li>
                                        <li><Link to="/user/addAvtor">???????????? ????????????</Link></li>
                                        <li><Link to="/" onClick={logOut}>??????????</Link></li>
                                    </ul>
                                </TemporaryDrawer>
                            </Box>
                        : 
                        <Box className='header-adaptive'>
                            <TemporaryDrawer>
                                <ul className='header-links'>
                                    <li><Link to="/quest/home">??????????????</Link></li>
                                    <li><Link to="/">????????</Link></li>
                                    <li><Link to="/quest/register">??????????????????????</Link></li>
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
