import React from 'react'
import RouterComponent from './RouterComponent'
import Layout from './Layout/Layout'
import Login from './pages/Login'

const App = () => {
  if (!!localStorage.access) {
    return (
      <div>
        <RouterComponent />
        <Layout />
      </div>
    )
    
  } else {
    return (
      <Login />
    )
  }
}

export default App