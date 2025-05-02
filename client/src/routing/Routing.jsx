import React from 'react'
 import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AirbnbHeader from '../layout/header/Header'
import ModalController from '../components/auth/ModalController'

 
const Routing = () => {
  return (
    <Router> 
<AirbnbHeader/>
        <Routes>
         
        </Routes>
        <ModalController/>

    </Router>
  )
}

export default Routing