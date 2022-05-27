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
import classes from '../UI/checkbox/classes';
import classesButton from '../UI/button/classes';

export function Login() {
  const { auth} = useContext(CardsUserContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [passCheckbox, setPassCheckbox] = useState(false);
  const [passOpen, setPassOpen] = useState('password');
  const route = useHistory();
  const loginUse = e => {
    setLogin(e);
    setErrorLogin(!isEmailValid());
  };
  const passwordUser = e => {
    setPassword(e);
    setErrorPass(!isPassValid());
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
      
    } catch (error) {
      console.log(error);
    }
  };
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,2}\.[0-9]{1,2}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passSimpleReg = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{6,}/g;
  const isEmailValid = () => emailReg.test(login);
  const isPassValid = () => passSimpleReg.test(password);
  const disabledButton = (errorPass || errorLogin)
 
  return (
    <Container>
      <FormGroup style={classesPages.pageLoginRegister}>
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
              style={classes.myChackBox}
            />
          }
          label="Show password"
        />
         <FormHelperText id="component-helper-text">
            {(errorPass && errorLogin)? "Некорректно введений логін чи пароль": ''}
          </FormHelperText>
        <Box style={classesPages.pageLoginButtons}>
          <Buttons onClick={signIn }>Реєстрація</Buttons>
          <Buttons 
            disabled={(disabledButton)
              ? true
              : false
            }
            style={
              (disabledButton)
              ? classesButton.myButtonDisable
              : classesButton.myButton
            }
            onClick={loginEmailPassword}
          >
            Вхід
          </Buttons>
        </Box>
      </FormGroup>
    </Container>
  );
}
