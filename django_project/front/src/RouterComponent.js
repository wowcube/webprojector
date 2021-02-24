import { Router, Link, Redirect } from "@reach/router"
import React from 'react';

const Login = React.lazy(()=> import('./pages/Login'))
const Panoramas = React.lazy(()=> import('./pages/Panoramas'))
const Panorama = React.lazy(()=> import('./pages/Panorama'))

const AddSeria = React.lazy(()=> import('./pages/AddSeria'))





class RouterComponent extends React.Component {
  render() {
    return (
      <React.Suspense fallback={<div>Loading....</div>}>
        <Router>
          {/* <Login path="/login" /> */}
          <Redirect noThrow={true} from="/" to="/panoramas" />
          <Panoramas path="/panoramas" />
          <Panorama path="/panoramas/:id" key=":id" />
          <AddSeria path="/add-seria" />
        </Router>
      </React.Suspense>
    )
  }
}

export default RouterComponent