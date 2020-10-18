import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {NewsPage} from './pages/NewsPage'
import {AuthPage} from './pages/AuthPage'
import {ProfilePage} from './pages/ProfilePage'
import {MessPage} from './pages/MessPage'
import {FriendsPage} from './pages/FriendsPage'
import {ReestrPage} from './pages/ReestrPage'


export const useRoutes = isAuth => {
  if (isAuth) {
    return(
      <Switch>
      <Route path="/news" exact>
      <NewsPage />
      </Route>
      <Route path="/profile" exact>
      <ProfilePage />
      </Route>
      <Route path="/messages" exact>
      <MessPage />
      </Route>
      <Route path="/friends" exact>
      <FriendsPage />
      </Route>
      <Redirect to="/news" />
      </Switch>
    )
  }
  return (
    <Switch>
    <Route path="/" exact>
    <AuthPage />
    </Route>
    <Route path="/reestration" exact>
    <ReestrPage />
    </Route>
    <Redirect to="/" />
    </Switch>
  )
}
