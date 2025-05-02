import React from 'react'
 import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AirbnbHeader from '../layout/header/Header'
import RegisterModal from '../components/auth/Register'
import OTPVerifyModal from '../components/auth/OTPVerify'
import LoginModal from '../components/auth/Login'

 
const Routing = () => {
  return (
    <Router> 
<AirbnbHeader/>
        <Routes>
            <Route path='/regist' element={<RegisterModal/>} />
            <Route path='/otp-verify' element={<OTPVerifyModal/>} />
            <Route path='/login' element={<LoginModal/>} />
            <Route/>
        </Routes>

    </Router>
  )
}

export default Routing