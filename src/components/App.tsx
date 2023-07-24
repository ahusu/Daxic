import React from "react";
import { useState } from "react";
import LandingPage from './pages/LandingPage'


export default function App() {

  return (
    <div>
      <h1> This is the App</h1>
      <LandingPage />
      {/* <Modal id={useSelector(state => state.modalType.id)} type={useSelector(state => state.modalType.type)} onClose={() => dispatch(closeModal())} /> */}

    </div>
  )
}

