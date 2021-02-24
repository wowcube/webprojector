import axios from 'axios';

const endpoint = 'https://api.wowcube.xxiweb.ru/api/panoramas/serias'
const endpoint2 = 'https://api.wowcube.xxiweb.ru/api/panoramas/seria'

export const seriesListApi = () => axios.get(`${endpoint}/list/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
});
export const addSeriesApi = data => axios.post(`${endpoint}/add/`, data, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
})

export const getSeriaApi = data => axios.get(`${endpoint}/rud/${data.seriasId}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
});

export const deleteSeriaApi = data => axios.delete(`${endpoint}/rud/${data.seriasId}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
});

export const seriaPreviewApi = data => axios.get(`${endpoint2}/image/thumb/${data.seriaId}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.access}`
  }
});