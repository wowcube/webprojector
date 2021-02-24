

import React from 'react'

const Switcher = () => {
  return (
    <div className="switcher-wrapper">
      <div className="switcher-btn"> <i className='bx bx-cog bx-spin'></i>
      </div>
      <div className="switcher-body">
        <h5 className="mb-0 text-uppercase">Theme Customizer</h5>
        <hr/>
        <p className="mb-0">Gaussian Texture</p>
          <hr/>
          <ul className="switcher">
            <li id="theme1"></li>
            <li id="theme2"></li>
            <li id="theme3"></li>
            <li id="theme4"></li>
            <li id="theme5"></li>
            <li id="theme6"></li>
          </ul>
          <hr/>
          <p className="mb-0">Gradient Background</p>
          <hr />
          <ul className="switcher">
            <li id="theme7"></li>
            <li id="theme8"></li>
            <li id="theme9"></li>
            <li id="theme10"></li>
            <li id="theme11"></li>
            <li id="theme12"></li>
          </ul>
      </div>
    </div>
  )
}

export default Switcher