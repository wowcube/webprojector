import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { GET_PANORAMA_LIST_DATA } from '../actions/panorama';
import { GET_SERIA_DATA, GET_SERIES_LIST_DATA } from '../actions/series';

import { getSeriaApi, deleteSeriaApi, seriesListApi } from '../api/series'

import { useNavigate } from "@reach/router"

import { panoramasListApi, addPanoramaFileApi, deletePanoramaApi } from '../api/panorama';

import '../css/panoramas.css'


const Panorama = (props) => {
	const PanoramaLocationModal = React.lazy(()=> import('../modals/addPanoramaLocation'))
	const [modalShow, setModalShow] = React.useState(false);
	const modalData = React.useState({})
	const [show, setShow] = useState(false);
	const [cbFunction, setCb] = useState(()=>{})

  const handleClose = () => setShow(false);
  const handleShow = (cb) => {
		setShow(true);
		setCb(()=>cb);
	}

	const handleDelete = ()=> {
		cbFunction();
		setShow(false);
	}

  const dispatch = useDispatch();
	const stateSeriaData = useSelector(state => state.series);
	const statePanoramaData = useSelector(state => state.panorama);

	const ref = React.createRef();

	const navigate = useNavigate()

  useEffect(() => {
    getPanoramas()
  }, [props])
	useEffect(() => {
		getSeria()
	}, [props])
	// useEffect(() => {
	// 	if (!!statePanoramaData.panoramaData) {
	// 		console.log(statePanoramaData.panoramaData)
	// 	}
	// }, [statePanoramaData.panoramaData])

	const getSeriasData = (cb) => {
		seriesListApi().then(response => {
			dispatch(GET_SERIES_LIST_DATA(response.data));
			cb && cb()
		})
	}

  const getPanoramas = () => {
    panoramasListApi({seriasId: props.id}).then(response => {
      dispatch(GET_PANORAMA_LIST_DATA(response.data));
    })
  };

	const getSeria = () => {
    getSeriaApi({seriasId: props.id}).then(response => {
      dispatch(GET_SERIA_DATA(response.data));
    })
  };
	const goToDashboard = () => {
		navigate('/panoramas')

	}
	const deleteSeria = () => {
    deleteSeriaApi({seriasId: props.id}).then(response => {
			getSeriasData(goToDashboard)
    })
  };

	const deletePanorama = (id) => {
		deletePanoramaApi({pk: id}).then(response => {
			getPanoramas()
    })
	}

	const handleChange = () => {
		const formData = new FormData();
		// const images = []
		for (var i = 0; i < ref.current.files.length; i++) {
			let file = ref.current.files.item(i);
			formData.append("images", file);
		}
		addPanoramaFileApi({seriasId: props.id, formData}).then(response => {
			getPanoramas()
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
									<li className="breadcrumb-item" aria-current="page">Panoramas</li>
									<li className="breadcrumb-item active" aria-current="page">{stateSeriaData.seriaData?.title}</li>
								</ol>
							</nav>
						</div>
						<div className="ml-auto">
							<button type="button" className="btn btn-light m-1" onClick={()=> {handleShow(deleteSeria)}}><i className="bx bx-trash-alt mr-1"></i>Delete</button>
						</div>
					</div>
					<div className="card shadow-none border radius-15">
						<div className="card-body" >
							<div className="card-title">
								<h4 className="mb-0">{stateSeriaData.seriaData?.title}</h4>
							</div>
							<hr />
							<div className="shadow-none p-3 mb-3 bg-light rounded">https://api.wowcube.xxiweb.ru/panoramas/panorama/get/{stateSeriaData.seriaData?.id}/</div>
							<div className="shadow-none p-3 mb-2 bg-light rounded">{stateSeriaData.seriaData?.description}</div>	
						</div>
					</div>
					<div className="row">
						{statePanoramaData.panoramaData?.map(item =>(
							<div className="col-6 col-lg-4 col-xl-4" key={item.id}>
								<div className="card mb-3">
									<img src={`https://api.wowcube.xxiweb.ru/api/panoramas/panorama/image/thumb/${item.id}/`} className="card-img-top" alt="" />
									<div className="card-body">
										<div className="row">
											<div className="col-6 col-lg-6 col-xl-6">
												<i className="bx bx-show"></i>&nbsp;&nbsp;{item.counter_view}
											</div>
											<div className="col-6 col-lg-6 col-xl-6 text-right delete-button" onClick={() => handleShow(() => deletePanorama(item.id))}>
												<i className="bx bx-trash-alt"></i>&nbsp;&nbsp;Delete
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
						<div className="col-6 col-lg-4 col-xl-4">
							<div className="card mb-3" style={{minHeight: "190px"}}>
								<div className="card-body">
									<label className="custom-file-upload">
										<input className="hidden" type="file" accept="image/x-png,image/gif,image/jpeg" ref={ref} multiple onChange={()=> handleChange()} />
										<a className="btn btn-light btn-block">+ Add File</a>
									</label>
								</div>
								<div className="card-body">
									<a className="btn btn-light btn-block" variant="primary" onClick={() => setModalShow(true)}>+ Add by Location</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<PanoramaLocationModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				seriesid={props.id}
			/>
			<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
			
		</div>
  )
}

export default Panorama