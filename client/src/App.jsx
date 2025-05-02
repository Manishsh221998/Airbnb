import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routing from './routing/Routing'
import PlacesList from './components/cards/placeList'
import Register from './components/auth/Register'

function App() {
  return (
    <>
     <Routing/>
     <PlacesList/>
    </>
  )
}

export default App;
