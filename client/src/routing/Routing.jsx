import React from 'react'
 import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AirbnbHeader from '../layout/header/Header'
import ModalController from '../components/auth/ModalController'

 
const Routing = () => {
  return (
    <Router> 
<AirbnbHeader/>
        <Routes>
            {/* <Route path='/regist' element={<RegisterModal/>} />
            <Route path='/otp-verify' element={<OTPVerifyModal/>} />
            <Route path='/login' element={<LoginModal/>} />
            <Route/> */}
        </Routes>
        <ModalController/>

    </Router>
  )
}

export default Routing