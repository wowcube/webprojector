import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment';

import { Link } from "@reach/router"

import img1 from '../uploads/no-image.png'


// import { seriaPreviewApi } from '../api/series'




const Panoramas = () => {
	const stateseriesData = useSelector(state => state.series);
	const setErrorImage = (e, item) => {
		const link = img1
		item.src = link
		e.target.src = img1
	}
	// const dispatch = useDispatch()
	// useEffect(() => {
	// 	if (stateseriesData.seriesList) {
	// 		console.log(stateseriesData.seriesList)
	// 		for (let item of stateseriesData.seriesList) {
	// 			seriaPreviewApi({seriaId : item.id}).then(response => {
	// 				// item.preview = response.data
	// 				console.log(response)
	// 			})
	// 		}
	// 	}
  // }, [stateseriesData.seriesList])
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
									<li className="breadcrumb-item active" aria-current="page">Panoramas</li>
								</ol>
							</nav>
						</div>
						<div className="ml-auto">
						<Link to="/add-seria"><button type="button" className="btn btn-light m-1"><i className="bx bx-plus-circle mr-1"></i>Add</button></Link>
						</div>
					</div>
					<h6 className="mb-0 text-uppercase">Panoramas</h6>
					<hr />
					<div className="row">
						{stateseriesData.seriesList?.map(item =>(
							<div className="col-12 col-lg-6 col-xl-6" key={item.id}>
								<Link to={`/panoramas/${item.id}`}>
									<div className="card mb-3">
										<img 
											src={`https://api.wowcube.xxiweb.ru/api/panoramas/seria/image/thumb/${item.id}/`}
											className="card-img-top"
											onError={(e) => setErrorImage(e, item)}
											alt={item.description}
										/>
										<div className="card-body">
											<h5 className="card-title">{item.title}</h5>
											<p className="card-text">{item.description}</p>
											<p className="card-text">
												<small><i className="bx bx-calendar-plus"></i> <Moment format="YYYY-MM-DD">{item.time_add}</Moment>&nbsp;&nbsp;<i className="bx bx-show"></i> {item.counter_view} </small>
											</p>
										</div>
									</div>
									</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  )
}

export default Panoramas