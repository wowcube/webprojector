import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from "@reach/router"
import { GET_SERIES_LIST_DATA } from '../actions/series';
import { seriesListApi, addSeriesApi } from '../api/series';

import '../css/addSeria.css';

const AddSeria = ()=> {
  const [seriesData, setSeriesData] = useState({});
	const [counterView] = useState(0)
  const dispatch = useDispatch();
	const navigate = useNavigate()

  const handleChange = (event, key) => {
    setSeriesData(prev => ({...prev, [key]: event.target.value }))
  }

  const handleSave = () => {
    if (!!seriesData.title && !!seriesData.description) {
      addSeriesApi({...seriesData, counter_view: counterView}).then(response => {
        getSeriasData()
      })
    } else {
      console.error('empty inputs')
    }
  }

  const getSeriasData = () => {
		seriesListApi().then(response => {
			dispatch(GET_SERIES_LIST_DATA(response.data));
			navigate('/panoramas')
		})
	}

  return (
    <div className="page-wrapper">
			<div className="page-content-wrapper">
				<div className="page-content">
					<div className="page-breadcrumb d-none d-md-flex align-items-center mb-3">
						<div className="breadcrumb-title pr-3">Wowcube</div>
						<div className="pl-3">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb mb-0 p-0">
									<li className="breadcrumb-item"><a href="javascript:;"><i className='bx bx-home-alt'></i></a>
									</li>
									<li className="breadcrumb-item active" aria-current="page">Add series</li>
								</ol>
							</nav>
						</div>
					</div>
					<div className="card shadow-none border radius-15">
						<div className="card-body" >
							<div className="card-title">
								<h4 className="mb-0">Add series</h4>
							</div>
							<hr />
              <label htmlFor="title">Title</label>
              <input onChange={(event)=> handleChange(event, 'title')} id="title" type="text" className="seria-input shadow-none p-3 mb-3 bg-light rounded" placeholder="Enter Title" />
              <label htmlFor="description">Description</label>
              <input onChange={(event)=> handleChange(event, 'description')} id="description" type="text" className="seria-input shadow-none p-3 mb-3 bg-light rounded" placeholder="Enter Description" />
							<button type="button" className="btn btn-light m-1" onClick={handleSave}>+ Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default AddSeria