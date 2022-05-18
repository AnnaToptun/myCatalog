import { Checkbox } from '@material-ui/core';
import { Box, Container, FormGroup } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { React, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardsUserContext } from '../Context/CardsUserProvider';
import { Buttons } from '../UI/button/Buttons';
import { CheckBox } from '../UI/checkbox/CheckBox';
import { MyInput } from '../UI/input/MyInput';
import classes from '../UI/checkbox/classes';
export function Register() {
  const { auth, addUser, user, setUser } = useContext(CardsUserContext);
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,2}\.[0-9]{1,2}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passSimpleReg = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{6,}/g;
  const passAvarageReg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g;
  const passStrongReg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
  const route = useHistory();

  const [errorEmail, setErrorEmail] = useState(true);
  const [errorName, setErrorName] = useState(true);
  const [errorLastName, setErrorLastName] = useState(true);
  const [errorDate, setErrorDate] = useState(true);
  const [errorPass, setErrorPass] = useState(true);
  const [passCheckbox, setPassCheckbox] = useState(false);
  const [passOpen, setPassOpen] = useState('password');
  const [errorConfirmPass, setErrorConfirmPass] = useState(true);
  const [accept, setAccept] = useState(false);
  const [fieldsForm, setFildsForm] = useState({
    fistName: '',
    lastName: '',
    birthday: '1998-04-05',
    email: '',
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
  return (
    <Container
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20% 0' }}
    >
      <FormGroup>
        <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
          <MyInput
            value={fieldsForm.fistName}
            error={errorName}
            required={true}
            type="text"
            placeholder="First Name"
            label="First Name"
            //helpertext={errorName && 'Inccorect name'}
            onChange={event => firstNameHandler(event.target.value)}
          />
          <MyInput
            value={fieldsForm.lastName}
            error={errorLastName}
            required={true}
            type="text"
            placeholder="Last Name"
            label="LastName"
            //helpertext={errorLastName && 'Inccorect lastname'}
            onChange={event => lastNameHandler(event.target.value)}
          />
        </Box>
        <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
          <MyInput
            value={fieldsForm.birthday}
            error={errorDate}
            required={true}
            type="date"
            label="Date of Birth"
            //helpertext={errorDate && 'You can`t registrate'}
            onChange={event => dateHandler(event.target.value)}
          />
          <MyInput
            required
            value={fieldsForm.email}
            error={errorEmail}
            type="text"
            placeholder="Email"
            label="Email"
            //helpertext={errorEmail && "Incorrect email"}
            onChange={event => emailHandler(event.target.value)}
          />
        </Box>

        <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
          <MyInput
            value={fieldsForm.password}
            required
            error={errorPass}
            type={passOpen}
            placeholder="Password"
            label="Password"
            //helpertext={statusPass()}
            onChange={event => passHandler(event.target.value)}
          />
          <MyInput
            value={fieldsForm.passwordComf}
            error={errorConfirmPass}
            required
            type={passOpen}
            placeholder="Confirm password"
            label="Confirm password"
            //helpertext={errorConfirmPass && "Passwords don't match"}
            onChange={event => passConfirmHandler(event.target.value)}
          />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
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
        <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Buttons onClick={() => route.push('/quest/login')}>Login</Buttons>
          <Buttons
            disabled={
              !(
                !isEmailValid ||
                !isPassStrongValid ||
                errorConfirmPass ||
                errorDate ||
                errorName ||
                errorLastName ||
                !accept
              )
                ? false
                : true
            }
            onClick={createAccount}
          >
            Registration
          </Buttons>
        </Box>
      </FormGroup>
    </Container>
  );
}
