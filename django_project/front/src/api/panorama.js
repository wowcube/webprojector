import axios from 'axios';

const endpoint = 'https://api.wowcube.xxiweb.ru/api/panoramas/panorama'

export const panoramasListApi = data => axios.get(`${endpoint}/list/${data.seriasId}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
});


export const addPanoramaFileApi = data => axios.post(`${endpoint}/files/add/${data.seriasId}/`, data.formData, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
})
export const addPanoramaLocationApi = data => axios.post(`${endpoint}/location/add/${data.seriasId}/`, {"location": data.location}, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
})


export const getPanoramaApi = data => axios.get(`${endpoint}/rud/${data.pk}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
})

export const deletePanoramaApi = data => axios.delete(`${endpoint}/rud/${data.pk}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
})