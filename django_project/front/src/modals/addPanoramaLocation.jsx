
import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { GET_PANORAMA_LIST_DATA } from '../actions/panorama';
import { addPanoramaLocationApi, panoramasListApi } from '../api/panorama';


const PanoramaLocationModal = (props) => {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setLocation(event.target.value)
  }

  const getPanoramas = () => {
    panoramasListApi({seriasId: props.seriesid}).then(response => {
      dispatch(GET_PANORAMA_LIST_DATA(response.data));
    })
  };

  const addPanorama = () => {
		addPanoramaLocationApi({seriasId: props.seriesid, location: location}).then(response => {
			getPanoramas()
      props.onHide()
    })
	}


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add panorama from location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shadow-none">
          <label htmlFor="location">Location lat,lon</label>
          <input onChange={(event)=> handleChange(event)} id="location" type="text" className="seria-input shadow-none p-3 mb-3 bg-light rounded custom-modal-input" placeholder="-22.6236077,113.943626" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addPanorama}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PanoramaLocationModal