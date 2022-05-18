
import React, { useContext } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { Container } from '@mui/material'
import { AllCard } from './AllCard'
import { AsideUser } from './AsideUser'
import { CardBookDatails } from './books/CardBookDatails'
import { CreateCard } from './CreateCard'
import { Header } from './Header'
import { Login } from './Login'
import { MyRouter } from './MyRouter'
import { Register } from './Register'
import { CardsUserContext } from '../Context/CardsUserProvider'

export function MainLoyout () {
  const {user} = useContext(CardsUserContext)
  return (
    <MyRouter>
      <Container>
        <Header>
          {
            (user)
            ?
              <Switch>
                <Route path='/book/:id'>
                  <CardBookDatails/>
                </Route>
                <Route path='/user/home'>
                    <AsideUser/>
                </Route>
                <Route path="/user/createCard">
                  <CreateCard/>
                </Route>
                <Redirect to='/user/home'/>
              </Switch>
            :
            <Switch>
              <Route path='/book/:id'>
                <CardBookDatails/>
              </Route>
              <Route path='/quest/login'>
                <Login/>
              </Route>
              <Route path="/quest/register">
                <Register/>
              </Route>
              <Route path="/quest/home">
                <AllCard/>
              </Route>
              <Redirect to="/quest/home"/>
            </Switch>
          }
         
        </Header>
      </Container>
    </MyRouter>
  )
}
