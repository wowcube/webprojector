import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Link } from "@reach/router"

import { GET_SERIES_LIST_DATA } from '../actions/series';
import { seriesListApi } from '../api/series';


import logo from '../assets/images/wowcube-logo.png'

const Sidebar = () => {
  const dispatch = useDispatch();
	const stateseriesData = useSelector(state => state.series);

  useEffect(() => {
		getSeriasData()
  }, [])
	

	const getSeriasData = () => {
		seriesListApi().then(response => {
			dispatch(GET_SERIES_LIST_DATA(response.data));
		})
	}
	
  return (
    <div className="sidebar-wrapper" data-simplebar="true">
			<div className="sidebar-header">
				<div className="">
					<img src={logo} className="logo-icon-2" alt="" />
				</div>
				<div>
					<h4 className="logo-text">WOWcube</h4>
				</div>
				<a href="javascript:;" className="toggle-btn ml-auto"> <i className="bx bx-menu"></i>
				</a>
			</div>
			<ul className="metismenu" id="menu">
				<li>
					<Link to="/panoramas">
						<div className="parent-icon"><i className="bx bx-home-alt"></i>
						</div>
						<div className="menu-title">Dashboard</div>
					</Link>
				</li>
				<li className="menu-label">Panoramas</li>
				<li>
					<Link to="/add-seria">
						<div className="parent-icon"><i className="bx bx-plus-circle"></i>
						</div>
						<div className="menu-title">Add</div>
					</Link>
				</li>
				{stateseriesData.seriesList?.map(item => 
					<li key={item.id}>
						<Link to={`/panoramas/${item.id}`}>
							<div className="parent-icon"><i className="bx bx-image"></i>
							</div>
							<div className="menu-title">{item.title}</div>
						</Link>
					</li>
				)}
			</ul>
		</div>
  )
}

export default Sidebar