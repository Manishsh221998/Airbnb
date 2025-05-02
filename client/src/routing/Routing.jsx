import React from 'react'
 import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AirbnbHeader from '../layout/header/Header'
import ModalController from '../components/auth/ModalController'
import AirbnbFooter from '../layout/footer/Footer'
import PlacesList from '../components/cards/placeList'
 
 
const Routing = () => {
  return (
    <Router> 
<AirbnbHeader/>
        <Routes>
        </Routes>
        <PlacesList/>
         <ModalController/>
<AirbnbFooter/>
    </Router>
  )
}

export default Routing