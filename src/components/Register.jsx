import { Checkbox, FormControl, FormHelperText } from '@material-ui/core';
import { Box, Container, FormGroup } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { React, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { Buttons } from '../UI/button/Buttons';
import { CheckBox } from '../UI/checkbox/CheckBox';
import { MyInput } from '../UI/input/MyInput';
import classes from '../UI/checkbox/classes';
import classesPages from '../styles/classesPages';
import classesSelect from '../UI/select/classesSelect';
import classesButton from '../UI/button/classes';

export function Register() {
  const { auth, addUser,  setUser } = useContext(CardsUserContext);
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,2}\.[0-9]{1,2}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passSimpleReg = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{6,}/g;
  const passAvarageReg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g;
  const passStrongReg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
  const route = useHistory();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [passCheckbox, setPassCheckbox] = useState(false);
  const [passOpen, setPassOpen] = useState('password');
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const [accept, setAccept] = useState(false);
  const [fieldsForm, setFildsForm] = useState({
    fistName: '',
    lastName: '',
    birthday: '1998-04-05',
    email: '',
    img: '',
    password: '',
    userBooks: [],
    id: Date.now(),
  });
  const firstNameHandler = name => {
    name.length < 4 ? setErrorName(true) : setErrorName(false);
    setFildsForm({ ...fieldsForm, fistName: name });
  };
  const lastNameHandler = lastname => {
    lastname.length < 4 ? setErrorLastName(true) : setErrorLastName(false);
    setFildsForm({ ...fieldsForm, lastName: lastname });
  };
  const dateHandler = dateUser => {
    const age = new Date().getFullYear() - Number(dateUser.substr(0, 4));
    if (age < 18) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
    }
    setFildsForm({ ...fieldsForm, birthday: dateUser });
  };
  const emailHandler = valueEmail => {
    isEmailValid();
    setFildsForm({ ...fieldsForm, email: valueEmail });
    setErrorEmail(!isEmailValid());
  };
  const passHandler = pass => {
    setFildsForm({ ...fieldsForm, password: pass });
    if (!isPassValid()) {
      setErrorPass(!isPassValid());
      return 'Simple password';
    } else if (!isPassAvarageValid()) {
      setErrorPass(!isPassAvarageValid());
      return 'Avarage password';
    } else {
      setErrorPass(!isPassStrongValid());
      return 'Strong password';
    }
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
  const passConfirmHandler = confirm => {
    fieldsForm.password !== confirm ? setErrorConfirmPass(true) : setErrorConfirmPass(false);
  };
  const CheckHandler = () => {
    accept ? setAccept(false) : setAccept(true);
  };

  const isEmailValid = () => emailReg.test(fieldsForm.email);
  const isPassValid = () => passSimpleReg.test(fieldsForm.password);
  const isPassAvarageValid = () => passAvarageReg.test(fieldsForm.password);
  const isPassStrongValid = () => passStrongReg.test(fieldsForm.password);

  const disabledButton = (!isEmailValid ||
    !isPassStrongValid ||
    errorConfirmPass ||
    errorDate ||
    errorName ||
    errorLastName ||
    !accept)
  const createAccount = async () => {
    const loginEmail = fieldsForm.email
    const loginPassword = fieldsForm.password
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
      setUser(true)
      addUser({ ...fieldsForm });

    }
    catch(error){
      console.log(error)
    }
  }
  const statusPass =() =>{
    if (!isPassValid()) {
        return "Simple password"
    } else if (!isPassAvarageValid()){
        return "Avarage password"
    } else if(!isPassStrongValid()){ 
        return "Strong password"
    }else{
        return "Excallent"
    }
}
  return (
    <Container  style={classesPages.pageLoginRegister}>
      <span  style={classesPages.pageResetPassword}>
        Реєстрація
      </span>
      <Box  style={classesPages.pageResetPassword}>
        <Box style={(window.innerWidth<500)
          ?classesPages.pageAsideRegisterSmall
          :classesPages.pageAsideRegister
          }>
           <FormControl variant="standard">
              <MyInput
                value={fieldsForm.fistName}
                error={errorName}
                required={true}
                type="text"
                placeholder="First Name"
                label="First Name"
                onChange={event => firstNameHandler(event.target.value)}
              />
              <FormHelperText id="component-helper-text">
                {errorName&&'Inccorect name'}
              </FormHelperText>
           </FormControl>
         
            <FormControl variant="standard">
              <MyInput
                value={fieldsForm.lastName}
                error={errorLastName}
                required={true}
                type="text"
                placeholder="Last Name"
                label="LastName"
                onChange={event => lastNameHandler(event.target.value)}
              />
              <FormHelperText id="component-helper-text">
                {errorLastName && 'Inccorect lastname'}
              </FormHelperText>
            </FormControl>
        </Box>
        <Box style={(window.innerWidth<500)
          ?classesPages.pageAsideRegisterSmall
          :classesPages.pageAsideRegister
          }>
          <FormControl variant="standard">
            <MyInput
              value={fieldsForm.birthday}
              error={errorDate}
              required={true}
              type="date"
              label="Date of Birth"
              onChange={event => dateHandler(event.target.value)}
            />
            <FormHelperText id="component-helper-text">
              {errorDate && 'You can`t registrate'}
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard">
            <MyInput
              required
              value={fieldsForm.email}
              error={errorEmail}
              type="text"
              placeholder="Email"
              label="Email"
              onChange={event => emailHandler(event.target.value)}
            />
            <FormHelperText id="component-helper-text">
              {errorEmail && "Incorrect email"}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box style={(window.innerWidth<500)
          ?classesPages.pageAsideRegisterSmall
          :classesPages.pageAsideRegister
          }>
          <FormControl variant="standard">
            <MyInput
              value={fieldsForm.password}
              required
              error={errorPass}
              type={passOpen}
              placeholder='Password'
              label="Password"
              onChange={event => passHandler(event.target.value)}
            />
            <FormHelperText id="component-helper-text">
              {statusPass()}
            </FormHelperText>
          </FormControl>
          <FormControl variant="standard">
            <MyInput
              value={fieldsForm.passwordComf}
              error={errorConfirmPass}
              required
              type={passOpen}
              placeholder="Confirm password"
              label="Confirm password"
              onChange={event => passConfirmHandler(event.target.value)}
            />
            <FormHelperText id="component-helper-text">
            {errorConfirmPass && "Passwords don't match"}
          </FormHelperText>
          </FormControl>
          
        </Box>
        <Box  style={
            (window.innerWidth<500)
              ?classesPages.pageAsideRegisterSmall
              :classesPages.pageAsideRegister
          }>
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

          <CheckBox
            control={
              <Checkbox
                checked={accept}
                onChange={CheckHandler}
                name="checked"
                style={classes.myChackBox}
              />
            }
            label="I accept the terms of use"
          />
        </Box>
        <Box style={(window.innerWidth<500)
          ?classesPages.pageLoginButtons
          :classesPages.pageAsideRegister
          }>
          <Buttons onClick={() => route.push('/quest/login')}>Вхід</Buttons>
          <Buttons
            disabled={
              !disabledButton
                ? false
                : true
            }
            style={
              (disabledButton)
              ? classesButton.myButtonDisable
              : classesButton.myButton
            }
            onClick={createAccount}
          >
            Реєстрація
          </Buttons>
        </Box>

      </Box>
      
    </Container>
  );
}
