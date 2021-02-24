import React, { useState, useEffect } from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Swicher from '../components/Switcher'

const Layout = () => {
  const currentPath = window.location.pathname
  return (
    currentPath.indexOf('login') == -1  && !!localStorage.access && (<div className="wrapper">
      <Sidebar />
      <Header />
      <Footer />
      <Swicher />
    </div>)
  )
}

export default Layout
