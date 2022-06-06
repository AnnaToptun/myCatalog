
import { React, useContext } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { Container } from '@mui/material'
import { AllCard } from './AllCard'
import { AsideUser } from './AsideUser'
import { CardBookDatails } from './books/CardBookDatails'
import { CreateCardGenre } from './create/CreateCardGenre'
import { Header } from './Header'
import { Login } from './Login'
import { Register } from './Register'
import { CardsUserContext } from '../Context/CardsUserProvider'

import { Profile } from './Profile'
import { CardAvtors } from './avtors/CardAvtors'
import { AddAvtor } from './create/AddAvtor'
import { ResetPassword } from './create/ResetPassword'
export function MainLoyout () {
  const {user} = useContext(CardsUserContext)
 
  return (
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
                <Route path="/user/create">
                  <CreateCardGenre/>
                </Route>
                <Route path="/user/addAvtor">
                  <AddAvtor/>
                </Route>
                <Route path='/user/profile/:id'>
                  <Profile/>
                </Route>
                <Route path='/avtor/:id'>
                  <CardAvtors/>
                </Route>
                <Redirect to='/user/home'/>
              </Switch>
            :
            <Switch>
              <Route path='/book/:id'>
                <CardBookDatails/>
              </Route>
              <Route path='/'>
                <Login/>
              </Route>
              <Route path="/quest/register">
                <Register/>
              </Route>
              <Route path="/quest/home">
                <AllCard/>
              </Route>
              <Route path="/quest/resetParol">
                <ResetPassword/>
              </Route>
              <Route path='/user/profile/:id'>
                  <Profile/>
              </Route>
              <Route path='/avtor/:id'>
                  <CardAvtors/>
                </Route>
              <Redirect to="/"/>
            </Switch>
          }
         
        </Header>
      </Container>
    
  )
}
