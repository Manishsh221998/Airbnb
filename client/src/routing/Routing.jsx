import React from 'react'
 import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AirbnbHeader from '../layout/header/Header'
 
const Routing = () => {
  return (
    <Router> 
<AirbnbHeader/>
        <Routes>
            <Route/>
        </Routes>

    </Router>
  )
}

export default Routing