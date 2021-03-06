import { Checkbox, Container, FormGroup, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { React, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { Buttons } from '../UI/button/Buttons';
import { CheckBox } from '../UI/checkbox/CheckBox';
import { MyInput } from '../UI/input/MyInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import classesPages from '../styles/classesPages';
import classesChackBox from '../UI/checkbox/classes';
import classesButton from '../UI/button/classes';
import classes from '../UI/input/classes';
import { Link } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
export function Login() {
  const { auth, users, createNotification} = useContext(CardsUserContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [passCheckbox, setPassCheckbox] = useState(false);
  const [passOpen, setPassOpen] = useState('password');
  const [user, setUser] = useState({});
  const route = useHistory();
  
  const loginUse = e => {
    setLogin(e);
    users.filter(user =>{ 
      if(user.email === e){
        setErrorLogin(false)
        setUser(user)
      } else {
        setErrorLogin(true)
        
      }
    })

  };
  const passwordUser = e => {
    setPassword(e);
    (user.pasword===e)? setErrorPass(false): setErrorPass(true)
  };
  const passCheckHandler = () => {
    if (passCheckbox) {
      setPassOpen('password');
      setPassCheckbox(false);
    } else {
      setPassOpen('text');
      setPassCheckbox(true);
    }
  };
  const signIn = () => {
    route.push('/quest/register');
  };

  const loginEmailPassword = async () => {
    const loginEmail = login;
    const loginPassword = password;
 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      createNotification('success', '???????? ?????????? ???????????? ??????', '?????????????? ??????????????' ) 
      
    } catch (error) {
      console.log(error);
      createNotification('error', '?????????? ???? ???????????? ???? ??????????', '?????????????? ??????????' )
    }
   
  };
  
  
  const disabledButton = (!errorPass ||!errorLogin)
  return (
    <Container style={classesPages.pageLoginRegister}>
        <span  style={classesPages.pageResetPassword}>
          ??????????????????????
        </span>
      <FormGroup style={classesPages.pageResetPassword}>
        
        <MyInput
          error={errorLogin}
          value={login}
          type="text"
          placeholder="Login"
          label="Login"
          onChange={e => loginUse(e.target.value)}
        />
        <MyInput
          error={errorPass}
          value={password}
          type={passOpen}
          placeholder="Password"
          label="Password"
          onChange={e => passwordUser(e.target.value)}
        />
        <CheckBox
          control={
            <Checkbox
              checked={passCheckbox}
              onChange={passCheckHandler}
              name="checked"
              style={classesChackBox.myChackBox}
            />
          } 
          label="Show password"
        />
         <Link to='/quest/resetParol' style={classesPages.forgotPassword}>
           ???????????? ????????????
         </Link>
        <Box style={classesPages.pageLoginButtons}>
          <Buttons onClick={signIn }>????????????????????</Buttons>
          <Buttons 
           
            style={ classesButton.myButton }
            onClick={loginEmailPassword}
          >
            ????????
          </Buttons>
        </Box>
      </FormGroup>
      <NotificationContainer/>
    </Container>
  );
}
