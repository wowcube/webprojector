import React, { useEffect,useState } from 'react'

import { useDispatch, useSelector, useStore } from 'react-redux';

import {  Link  } from "@reach/router"

const Header = () => {
  const logout = () => {
    localStorage.access = ''
    window.location.reload();
  }
  const stateseriesData = useSelector(state => state.series);
  const [counterView, setCounterView] = useState(0);


  useEffect(() => {
		if (stateseriesData.seriesList) {
      let counter = 0;
      for(let item of stateseriesData.seriesList) {
        counter += Number(item.counter_view)
      }
      setCounterView(counter)
    }
  }, [stateseriesData.seriesList])
  return (
    <header className="top-header">
      <nav className="navbar navbar-expand">
        <div className="left-topbar d-flex align-items-center">
          <a href="javascript:;" className="toggle-btn">	<i className="bx bx-menu"></i>
          </a>
        </div>
        <div className="right-topbar ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item search-btn-mobile">
              <a className="nav-link position-relative" href="javascript:;">	<i className="bx bx-search vertical-align-middle"></i>
              </a>
            </li>						
            <li className="nav-item dropdown dropdown-lg">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="javascript:;" data-toggle="dropdown">	<i className="bx bx-show vertical-align-middle"></i>
                <span className="msg-count">{counterView}</span>
              </a>
              {/* <div className="dropdown-menu dropdown-menu-right">
                <a href="javascript:;">
                  <div className="msg-header">
                    <h6 className="msg-header-title">8 New</h6>
                    <p className="msg-header-subtitle">Application Notifications</p>
                  </div>
                </a>
                <div className="header-notifications-list">
                  <a className="dropdown-item" href="javascript:;">
                    <div className="media align-items-center">
                      <div className="notify bg-light-primary text-primary"><i className="bx bx-group"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="msg-name">New Customers<span className="msg-time float-right">14 Sec
                          ago</span></h6>
                        <p className="msg-info">5 new user registered</p>
                      </div>
                    </div>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <div className="media align-items-center">
                      <div className="notify bg-light-danger text-danger"><i className="bx bx-cart-alt"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="msg-name">New Orders <span className="msg-time float-right">2 min
                          ago</span></h6>
                        <p className="msg-info">You have recived new orders</p>
                      </div>
                    </div>
                  </a>
                </div>
                <a href="javascript:;">
                  <div className="text-center msg-footer">View All Notifications</div>
                </a>
              </div> */}
            </li>
            <li className="nav-item dropdown dropdown-user-profile">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-toggle="dropdown">
                <div className="media user-box align-items-center">
                  <div className="media-body user-info">
                    <p className="user-name mb-0">User Name</p>
                  </div>
                  <img src="https://via.placeholder.com/110x110" className="user-img" alt="user avatar" />
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {/* <a className="dropdown-item" href="javascript:;"><i
                    className="bx bx-user"></i><span>Profile</span></a> */}
                {/* <a className="dropdown-item" href="javascript:;"><i
                    className="bx bx-cog"></i><span>Settings</span></a> */}
                <Link to="/panoramas" className="dropdown-item" href="javascript:;"><i
                    className="bx bx-tachometer"></i><span>Dashboard</span></Link>
                {/* <a className="dropdown-item" href="javascript:;"><i
                    className="bx bx-wallet"></i><span>Earnings</span></a> */}
                {/* <a className="dropdown-item" href="javascript:;"><i
                    className="bx bx-cloud-download"></i><span>Downloads</span></a> */}
                <div className="dropdown-divider mb-0"></div>	<a className="dropdown-item" onClick={logout}><i
                    className="bx bx-power-off"></i><span>Logout</span></a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header