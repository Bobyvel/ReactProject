import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Auth from '../utils/auth'

const AdminRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={props => (
    
    Auth.isUserAdmin() ? (
      
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }} />
    )
  )
  
  } />
  
)

export default AdminRoute
