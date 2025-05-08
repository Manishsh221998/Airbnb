import React from 'react'
 import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AirbnbHeader from '../layout/header/Header'
import ModalController from '../components/auth/ModalController'
import AirbnbFooter from '../layout/footer/Footer'
import PlacesList from '../components/cards/placeList'
import UserProfile from '../components/userProfile/UserProfile'
import Error from '../components/error/Error'
  
 
const Routing = () => {
  const token=window.localStorage.getItem("usertoken")

  return (
    <Router> 
<AirbnbHeader/>

        <Routes>

          <Route path='/profile' element={<UserProfile/>}/>

        </Routes>
        
        <PlacesList/>
         <ModalController/>
 
<AirbnbFooter/>
    </Router>
  )
}

export default Routing